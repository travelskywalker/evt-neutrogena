import { Component } from '@angular/core';
import { NavParams, NavController} from 'ionic-angular';

@Component({
  selector: 'component-logo',
  templateUrl: 'logo.html'
})
export class LogoComponent {

  constructor(private navCtrl : NavController) {}

}
