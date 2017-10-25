// src/app/auth/auth.service.ts
import { Config } from '../../config/environment.dev';
import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
// import { HomePage } from '../../pages/home/home';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var Auth0Lock;

@Injectable()
export class AuthService {
  clientDefId:string = "ZQzpUoZgrpMC4pKn3ipIfgSudQ9J_uE1";
  clientDefSecret:string = "1omoA1OU8WmxdLpiCXvaTcsgLDRXsOUCbrmQ1U3BTtLg_P0MinVMqDRoYmQFcJxG";
  projectId : string;
  webAuth = new auth0.WebAuth({
    clientID: 'NamR3nF2CPlOtgeF1Gsz1DXUZUYYe9JH',
    domain: 'evt-demo.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://evt-demo.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:8100',
    scope: 'openid users:delete'
  });

  lock = new Auth0Lock('NamR3nF2CPlOtgeF1Gsz1DXUZUYYe9JH','evt-demo.eu.auth0.com');
  userInfo : any;

  constructor(private http: Http) {
    this.projectId = Config.projectId;
  }

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
      }, function(err){
        if(err){
          reject(err);
        }else{
          resolve({msg:"Signup successfull"});
        }
      })
    });
  }

  public fbAuth(): void{
    this.webAuth.authorize({
      connection: 'facebook',
      scope:'openid profile email phone user_metadata'
    });
  }

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

  setEVTInfo(){
    if( (localStorage.access_token && localStorage.id_token) && (!localStorage.evrythngInfo || localStorage.evrythngInfo === "undefined") ){
      let user = this.getUserDetailsFromStorage();
      let res = Object.keys(user).filter((a)=>{ return (a.indexOf("user_metadata") > -1) });
      console.log(user,res);
      localStorage.setItem('evrythngInfo',JSON.stringify(user[res[0]].evrythngUserData));
    }
  }

  getUserDetails(){
    this.lock.getUserInfo(localStorage.getItem('access_token'), function(error, profile) {
      if (!error) {
        console.log(profile);
      }
    });
  }

  public getUserDetailsFromStorage() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserMetadata(meta) {
    let usr = this.getUserDetailsFromStorage();
    usr.user_metadata = meta;
    console.log(usr);
    localStorage.setItem('userInfo',JSON.stringify(usr));
  }

  public getUserMetadataFromStorage() {
    return JSON.parse(localStorage.getItem('userInfo'))['user_metadata'];
  }

  public logout():void {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('evrythngInfo');
    this.webAuth.logout();
  }

  public updateUser(usrMetaData) {
    let umd = this.getUserMetadataFromStorage();
    umd["firstName"] = usrMetaData.firstName;
    umd["lastName"] = usrMetaData.lastName;
    let auth0Manage = new auth0.Management({
      domain: 'evt-demo.eu.auth0.com',
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

  isFB():boolean{
    return this.getUserDetailsFromStorage()['sub'] && this.getUserDetailsFromStorage()['sub'].indexOf("facebook") > -1;
  }

  deleteUser(){
    let self = this;
    let id = this.getUserDetailsFromStorage()['user_id'];
    let hdr = new Headers();
    hdr.append("Content-Type","application/json");
    return new Promise((resolve,reject)=>{
      this.requestMgmtToken().then(res=>{
        hdr.append("Authorization", "Bearer "+res['access_token']);
        let opts = new RequestOptions({headers:hdr});
        self.http.delete("https://evt-demo.eu.auth0.com/api/v2/users/"+id,opts)
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
        self.http.patch("https://evt-demo.eu.auth0.com/api/v2/users/"+id,body,opts)
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

  requestMgmtToken(){
    let hdr = new Headers();
    hdr.append("Content-Type","application/json");
    let body = {
      grant_type: 'client_credentials',
      client_id: 'LPon98XtIsM2H3zzW85AppjgZxM5GeZE',
      client_secret: 'ZH-rOjkdGcLjSgYBCN2oxhVCp4oJaWsfe8U_JVaMu7c-QrWHG-vTu0CB7e3q_zR4',
      audience: 'https://evt-demo.eu.auth0.com/api/v2/' 
    };

    let opts = new RequestOptions({headers:hdr});
    return new Promise((resolve,reject)=>{
    this.http.post('https://evt-demo.eu.auth0.com/oauth/token',body,opts)
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


/*
  public login(): void {
    this.auth0.authorize();
  }


 // ...
  public handleAuthentication(): void {
    let self = this;
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        self.setSession(authResult);
        self.nav.push(HomePage);
      } else if (err) {
        self.nav.push(HomePage);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.nav.push(HomePage);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }*/
}
