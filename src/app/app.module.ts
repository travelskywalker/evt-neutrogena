import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { AuthPage } from '../pages/auth/auth';
import { LoginPage } from '../pages/login/login';
import { MyAccountPage } from '../pages/my-account/my-account';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EvtProvider } from '../providers/evt/evt';
import { AppProvider } from '../providers/app/app';
import { AuthService } from '../providers/auth/auth.service';

import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SignUpPage,
    AuthPage,
    LoginPage,
    MyAccountPage,
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{}, {
      links: [
        { component: HomePage, name: 'Home', segment: 'home' },
        { component: ListPage, name: 'listPage', segment: 'list' },
        { component: SignUpPage, name: 'SignUpPage', segment: 'sign-up' },
        { component: AuthPage, name: 'Auth0Page', segment: ':data' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: MyAccountPage, name: 'MyAccountPage', segment: 'my-account' },
      ]
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SignUpPage,
    AuthPage,
    LoginPage,
    MyAccountPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EvtProvider,
    AppProvider,
    AuthService
  ]
})
export class AppModule {}
