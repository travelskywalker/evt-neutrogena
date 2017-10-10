import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../config/environment.dev';

/*
  Generated class for the EvtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EvtProvider {

  constructor(public http: Http) {
    console.log('Hello EvtProvider Provider',atob(Config.evt_app));
  }

}
