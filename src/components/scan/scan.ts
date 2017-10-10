import { Component } from '@angular/core';

/**
 * Generated class for the ScanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'scan',
  templateUrl: 'scan.html'
})
export class ScanComponent {

  text: string;

  constructor() {
    console.log('Hello ScanComponent Component');
    this.text = 'Hello World';
  }

}
