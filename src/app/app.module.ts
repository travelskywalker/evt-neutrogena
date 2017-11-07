import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/* Pages */
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { AuthPage } from '../pages/auth/auth';
import { LoginPage } from '../pages/login/login';
import { MyAccountPage } from '../pages/my-account/my-account';
import { DeleteAccountPage } from '../pages/delete-account/delete-account';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { AgeGatePage } from '../pages/age-gate/age-gate';
import { AuraContentPage } from '../pages/aura-content/aura-content';
import { AuraMainPage } from '../pages/aura-main/aura-main';

/* Providers */
import { EvtProvider } from '../providers/evt/evt';
import { AppProvider } from '../providers/app/app';
import { AuthService } from '../providers/auth/auth.service';
import { ScriptService } from '../providers/app/script.service';

/* Custom Modules */
import { ComponentsModule } from '../components/components.module';

import {ComponentsModule} from '../components/components.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SignUpPage,
    AuthPage,
    LoginPage,
    MyAccountPage,
    DeleteAccountPage,
    ForgotPasswordPage,
    AgeGatePage,
    ResetPasswordPage,
    AuraContentPage,
    AuraMainPage
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
        { component: DeleteAccountPage, name: 'DeleteAccountPage', segment: 'delete-account' },
        { component: ForgotPasswordPage, name: 'ForgotPasswordPage', segment: 'forgot-password' },
        { component: AgeGatePage, name: 'AgeGatePage', segment: 'age-gate' },
        { component: ResetPasswordPage, name: 'ResetPasswordPage', segment: 'reset-password' },
        { component: AuraContentPage, name: 'AuraContentPage', segment: 'aura-content' },
        { component: AuraMainPage, name: 'AuraMainPage', segment: 'aura' },
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
    DeleteAccountPage,
    ForgotPasswordPage,
    AgeGatePage,
    ResetPasswordPage,
    AuraContentPage,
    AuraMainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EvtProvider,
    AppProvider,
    AuthService,
    ScriptService
  ]
})
export class AppModule {}
