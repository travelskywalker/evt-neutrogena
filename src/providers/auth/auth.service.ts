// src/app/auth/auth.service.ts
import { Config } from '../../config/environment.dev';
import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
// import { HomePage } from '../../pages/home/home';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var Auth0Lock;

@Injectable()
@Injectable()
export class AuthService {
  clientDefId:string = "ZQzpUoZgrpMC4pKn3ipIfgSudQ9J_uE1";
  clientDefSecret:string = "1omoA1OU8WmxdLpiCXvaTcsgLDRXsOUCbrmQ1U3BTtLg_P0MinVMqDRoYmQFcJxG";
  projectId : string;
  /* main auth0 variable. */
  webAuth = new auth0.WebAuth({
    clientID: Config.auth0.clientID,
    domain: Config.auth0.domain,
    responseType: Config.auth0.responseType,
    audience: Config.auth0.audience,
    redirectUri: Config.auth0.redirectUri,
    scope: 'openid'
  });

  lock = new Auth0Lock(Config.auth0.clientID,Config.auth0.domain);
  userInfo : any;

  constructor(private http: Http) {
    this.projectId = Config.projectId;
  }

  /* Check if a user is logged in. */
  loggedIn() : boolean{
    if(localStorage.getItem('access_token') && localStorage.getItem('access_token') != ""){
      return true;
    }
    else{
      return false;
    }
  }

  /* Sign up for email-based account. First name *
   * and last name is included in the            *
   * user_metadata so that we can track it       *
   * Not needed for FB based signup              */
  public signup(usr:{email:string,pass:string},fName='',lName='') {
    return new Promise((resolve,reject)=>{
      this.webAuth.signup({
        connection: 'Username-Password-Authentication',
        email: usr.email,
        password: usr.pass,
        user_metadata: {
          firstName: fName,
          lastName: lName
        }
      }, function(err,response){
        if(err){
          reject(err);
        }else{
          resolve({msg:"Signup successfull",data: response});
        }
      })
    });
  }

  /* Login/Signup for fb-based account */
  public fbAuth(): void{
    this.webAuth.authorize({
      connection: 'facebook',
      scope:'openid profile email phone user_metadata'
    });
  }

  /* login for email-based account */
  public login(usr:{email:string,pass:string}) {
    return new Promise((resolve, reject) => {
        this.webAuth.redirect.loginWithCredentials({
          connection: 'Username-Password-Authentication',
          username: usr.email,
          password: usr.pass,
          scope: 'openid'
        }, function(err, authResult) {
          if(err){
            reject(err);
          }
          else{
            resolve(authResult);
          }
          // Auth tokens in the result or an error
        })
      }
    );

  }
  // Parse the authentication result
  result(authResult) {
    let self = this;
    return new Promise((resolve,reject)=>{
      /* The user did not allow auth0 to access his/her data */
      if(authResult.error){
        console.log(authResult.error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('evrythngInfo');
        reject(authResult.error);
      }
      /* Proceed with authentication */
      else{
        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem('id_token', authResult.id_token);
        this.webAuth.client.userInfo(authResult.access_token,function(err, user){

          /* Successful auth */
          if (user) {
            console.log("auth result is ", authResult);
            console.log(user);
            localStorage.setItem('userInfo',JSON.stringify(user));
            self.userInfo = user;
            resolve(user);

          /* Failure at auth */
          } else if (err) {
            // Handle errors
            console.log(err);
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('userInfo');
        localStorage.removeItem('evrythngInfo');
            reject(err);
          }
        })
      }
    }
    );
  }

  /* store EVT info in the localstorage */
  setEVTInfo(){
    if( (localStorage.access_token && localStorage.id_token) && (!localStorage.evrythngInfo || localStorage.evrythngInfo === "undefined") ){
      let user = this.getUserDetailsFromStorage();
      let res = Object.keys(user).filter((a)=>{ return (a.indexOf("user_metadata") > -1) });
      localStorage.setItem('evrythngInfo',JSON.stringify(user[res[0]].evrythngUserData));
    }
  }

  /* get the user details from the auth0 platform using access_token */
  getUserDetails(){
    this.lock.getUserInfo(localStorage.getItem('access_token'), function(error, profile) {
      if (!error) {
        console.log(profile);
      }
    });
  }

  /* Get the user details from local storage */
  public getUserDetailsFromStorage() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  /* Get the user details from local storage */
  public setUserMetadata(meta) {
    let usr = this.getUserDetailsFromStorage();
    usr.user_metadata = meta;
    console.log(usr);
    localStorage.setItem('userInfo',JSON.stringify(usr));
  }

  /* Get the user metadata from local storage */
  public getUserMetadataFromStorage() {
    return JSON.parse(localStorage.getItem('userInfo'))['user_metadata'];
  }

  /* trigger logout. User should redirect to the returnTo field specified below */
  public logout():void {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('evrythngInfo');
    localStorage.removeItem('myThng');
    localStorage.removeItem('isAnon');
    this.webAuth.logout({
      returnTo: Config.auth0.redirectUri,
      clientID: Config.auth0.clientID
    });
  }

  /* Update user metadata via auth0 manage */
  public updateUser(usrMetaData) {
    let umd = this.getUserMetadataFromStorage();
    umd["firstName"] = usrMetaData.firstName;
    umd["lastName"] = usrMetaData.lastName;
    let auth0Manage = new auth0.Management({
      domain: Config.auth0.domain,
      token: localStorage.getItem('id_token')
    });

    let usrInfo = this.getUserDetailsFromStorage();
    //console.log(usrInfo);
    return new Promise((resolve,reject)=>{
        auth0Manage.patchUserMetadata(usrInfo['user_id'],
        umd,
        function(err, resp){
          if(err){
            reject(err);
          }else{
            resolve(resp);
          }
        }
       )
     }
    );

  }

  /* check if FB based account or email-based  *
   * FB accounts have the 'sub' variable. This *
   * is what we check                          */
  isFB():boolean{
    return this.getUserDetailsFromStorage()['sub'] && this.getUserDetailsFromStorage()['sub'].indexOf("facebook") > -1;
  }


  /* Delete the user account via user management client */
  deleteUser(){
    let self = this;
    let id = (self.isFB() ? this.getUserDetailsFromStorage()['sub'] : self.getUserDetailsFromStorage()['user_id']);
    let hdr = new Headers();
    hdr.append("Content-Type","application/json");
    return new Promise((resolve,reject)=>{
      this.requestMgmtToken().then(res=>{
        hdr.append("Authorization", "Bearer "+res['access_token']);
        let opts = new RequestOptions({headers:hdr});
        self.http.delete("https://"+Config.auth0.domain+"/api/v2/users/"+id,opts)
                  .toPromise()
                  .then(res=>{
                    resolve(res)
                  })
                  .catch(err=>{
                    reject(err)
                  })
      }).catch(err=>{
        console.log(err);
      })
    }
    );
  }

  /* Delete the user password via user management client */
  updatePassword(newPass : string){
    let self = this;
    let id = this.getUserDetailsFromStorage()['user_id'];
    let hdr = new Headers();
    hdr.append("Content-Type","application/json");
    let body = {"password":newPass};
    return new Promise((resolve,reject)=>{
      this.requestMgmtToken().then(res=>{
        hdr.append("Authorization", "Bearer "+res['access_token']);
        let opts = new RequestOptions({headers:hdr});
        self.http.patch("https://"+Config.auth0.domain+"/api/v2/users/"+id,body,opts)
                  .toPromise()
                  .then(res=>{
                    resolve(res)
                  })
                  .catch(err=>{
                    reject(err)
                  })
      }).catch(err=>{
        console.log(err);
      })
    }
    );

  }

  /* request oauth token via auth0 management client *
   * this will be used for management api requests   */
  requestMgmtToken(){
    let hdr = new Headers();
    hdr.append("Content-Type","application/json");
    let body = {
      grant_type: Config.auth0Mgmt.grant_type,
      client_id: Config.auth0Mgmt.client_id,
      client_secret: Config.auth0Mgmt.client_secret,
      audience: Config.auth0Mgmt.audience
    };

    let opts = new RequestOptions({headers:hdr});
    return new Promise((resolve,reject)=>{
    this.http.post('https://'+Config.auth0.domain+'/oauth/token',body,opts)
             .toPromise()
             .then(res=>{
               localStorage.setItem('managementToken',JSON.stringify(res.json()))
               resolve(res.json())
             })
             .catch(err=>{
               reject(err)
             })
           });
  }

  /* Search user by email via auth0 management client */
  searchUser(mail){
    let self = this;
    let hdr = new Headers();
    hdr.append("Content-Type","application/json");
    let body = `q=email%3A%22${encodeURIComponent(mail)}%22&search_engine=v2`;

    return new Promise((resolve,reject)=>{
      this.requestMgmtToken().then(res=>{
          hdr.append("Authorization", "Bearer "+res['access_token']);
          let opts = new RequestOptions({headers:hdr});
          self.http.get("https://"+Config.auth0.domain+"/api/v2/users?"+body,opts)
              .toPromise()
              .then(res=>{
                resolve(res.json()[0])
              })
              .catch(err=>{
                reject(err)
              })
      }).catch(err=>{
        console.log(err)
      })
    });
  }

  /* Update password */
  changePassword(mail:string){
    return new Promise((resolve,reject)=>{

      this.webAuth.changePassword({
        connection: 'Username-Password-Authentication',
        email: mail
      }, function(err,resp){
        if(err){
          reject(err.message);
        }else{
          resolve(resp);
        }

      })

    })
  }

}
