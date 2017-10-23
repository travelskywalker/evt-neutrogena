// src/app/auth/auth.service.ts
import { Config } from '../../config/environment.dev';
import { Injectable, ViewChild } from '@angular/core';
import * as auth0 from 'auth0-js';
import { HomePage } from '../../pages/home/home';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var Auth0Lock;

@Injectable()
export class AuthService {
  
  projectId : string;
  webAuth = new auth0.WebAuth({
    clientID: 'NamR3nF2CPlOtgeF1Gsz1DXUZUYYe9JH',
    domain: 'evt-demo.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://evt-demo.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:8100',      
    scope: 'openid'
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
      scope:'openid profile email phone'
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
  result(authResult) : boolean{
    let self = this;
    if(authResult.error){
      console.log(authResult.error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('userInfo');
      return false;
    }
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('id_token', authResult.id_token);
    this.webAuth.client.userInfo(authResult.access_token,function(err, user){
      if (user) {
        console.log(user);
        localStorage.setItem('userInfo',JSON.stringify(user));
        self.userInfo = user;
        return true;
        // Save the tokens from the authResult in local storage or a cookie

      } else if (err) {
        // Handle errors
        console.log(err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('userInfo');
        return false;
      }
    });
  }

  getUserDetails(){
    this.lock.getUserInfo(localStorage.getItem('access_token'), function(error, profile) {
      if (!error) {
        console.log(profile);
      }
    });
  }

  public getUserDetailsFromStorage(): void{
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public logout():void {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    this.webAuth.logout();
  }

  customSignup(usr:{email:string,pass:string}){
    let url = "https://evt-demo.eu.auth0.com/dbconnections/signup";
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });

    let data = {
                client_id: 'NamR3nF2CPlOtgeF1Gsz1DXUZUYYe9JH',
                email: usr.email,
                password: usr.pass
              };

    return new Promise((resolve,reject)=>{
      this.http.post(url,data,options).toPromise().then(res=>{
        resolve(res);
        console.log(res)
      }).catch(err=>{
        reject(err);
        console.log(err)
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