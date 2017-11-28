// src/app/auth/auth.service.ts
import { Config } from '../../config/environment';
import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import 'rxjs/add/operator/toPromise';

declare var Auth0Lock;

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

  constructor() {
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
      else if (typeof authResult.access_token != 'undefined'){

        this.webAuth.client.userInfo(authResult.access_token,function(err, user){

          /* Successful auth */
          let umd = self._parseUserMetadata(user);
          if (user && typeof umd.deleted == 'undefined') {

            localStorage.setItem('access_token', authResult.access_token);
            localStorage.setItem('id_token', authResult.id_token);

            console.log("auth result is ", authResult);
            console.log(user);
            localStorage.setItem('userInfo',JSON.stringify(user));
            self.userInfo = user;
            resolve(user);

          /* Failure at auth */
          } else if (err) {


            // Handle errors
            console.log(user, err);
            self._removeLocalUserData();
            reject(err);

          } else {
            resolve("deleted_user");
            // self._removeLocalUserData();
            // try {
            //   // console.log("user is ", user);
            //   // reject(umd.deleted ? "deleted user" : "");
            // } catch (err) {
            //   reject(err);
            // }
          }
        })
      }
    }
    );
  }

  /***
   * Private fn for parsing user_metadata or various namespaces - email, FB
   *
   * @param user
   * @returns {any}
   * @private
   */
  private _parseUserMetadata(user?: any) {
    if (typeof user.sub != 'undefined' && user.sub.indexOf('facebook') > -1) {
      //facebook
      return user[Config.fbUserMetadataNS + 'user_metadata'];
    } else if (typeof user.user_metadata != 'undefined') {
      return user.user_metadata
    } else {
      return {};
    }
  }

  private _removeLocalUserData(): void {

    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('evrythngInfo');
    localStorage.removeItem('courseHistory');

  }

  /* store EVT info in the localstorage */
  setEVTInfo(){
    if( (localStorage.access_token && localStorage.id_token) && (!localStorage.evrythngInfo || localStorage.evrythngInfo === "undefined") ){
      let user = this.getUserDetailsFromStorage();
      let res = Object.keys(user).filter((a)=>{ return (a.indexOf("user_metadata") > -1) });
      console.log('setEVTInfo');
      console.log(res);
      if (typeof res != 'undefined' && typeof user[res[0]].evrythngUserData != 'undefined') {
        let evrythngUserData = user[res[0]].evrythngUserData;
        localStorage.setItem('evrythngInfo', JSON.stringify(evrythngUserData));
      }


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
    if (this.isFB()) {
      //decorate the namespaced user_metadata field of FB users as well
      usr[Config.fbUserMetadataNS + 'user_metadata'] = meta;
    }
    console.log(usr);
    localStorage.setItem('userInfo',JSON.stringify(usr));
  }

  /* Get the user metadata from local storage */
  public getUserMetadataFromStorage() {
    if (this.isFB()) {
      return JSON.parse(localStorage.getItem('userInfo'))[Config.fbUserMetadataNS + 'user_metadata'];
    }
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
    localStorage.removeItem('anonUserInfo');
    localStorage.removeItem('anonEvrythngInfo');
    localStorage.removeItem('regStarted');
    localStorage.removeItem('myProduct');
    localStorage.removeItem('alive');
    this.webAuth.logout({
      returnTo: Config.auth0.redirectUri,
      clientID: Config.auth0.clientID
    });
  }

  /* Update user metadata via auth0 manage */
  public updateUser(usrMetaData) {
    let umd = this.getUserMetadataFromStorage();
    if (typeof umd == 'undefined') {
      umd = {};
    }
    umd["firstName"] = usrMetaData.firstName;
    umd["lastName"] = usrMetaData.lastName;
    if (typeof usrMetaData.deleted != 'undefined') {
      umd["deleted"] = usrMetaData.deleted;
    }
    if (typeof usrMetaData.dob != 'undefined') {
      umd["dob"] = usrMetaData.dob;
    }

    let auth0Manage = new auth0.Management({
      domain: Config.auth0.domain,
      token: localStorage.getItem('id_token')
    });

    let usrInfo = this.getUserDetailsFromStorage();
    let uid: string;

    if (this.isFB()) {
      uid = usrInfo['sub'];
    } else {
      uid = usrInfo['user_id'];
    }
    //console.log(usrInfo);
    return new Promise((resolve,reject)=>{
        auth0Manage.patchUserMetadata(uid,
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
    try {
      return this.getUserDetailsFromStorage()['sub'] && this.getUserDetailsFromStorage()['sub'].indexOf("facebook") > -1;
    } catch (err) {
      console.log(err);
      return false;
    }

  }


  /*
  * Delete the user account via user management client
  * User management should not be used. by Rex 11/17/2017
  *
  * */
  deleteUser(){

    return new Promise((resolve, reject)=> resolve(false));

  }

  /*
  * User management should not be used. by Rex 11/17/2017
  *
  * */
  updatePassword(newPass : string){

    return new Promise((resolve, reject)=> resolve(false));

  }

  /**
   *
   * Check user
   * User management should not be used. by Rex 11/17/2017
   *
   * @param mail
   * @returns {Promise<T>}
   */
  searchUser(mail){

    return new Promise((resolve, reject)=> resolve(false));

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

  parseErrCode(err?: any){

    if (typeof err.code != 'undefined') {
      return err.code
    }

  }

}
