import { Component } from '@angular/core';
import {Slides} from 'ionic-angular';

/**
 * Generated class for the ImageTrackerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'image-tracker',
  templateUrl: 'image-tracker.html'
})
export class ImageTrackerComponent {

  text: string;

  constructor() {
    console.log('Hello ImageTrackerComponent Component');
    this.text = 'Hello World';
  }

}
