import { Component } from '@angular/core';

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})

export class CalendarComponent {

  monthNames : Array<string> = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
	];
  tday: Date = new Date();
  yr: any = this.tday.getFullYear();
  mo: any = this.tday.getUTCMonth()+1;
  moPad: any = this.pad(this.mo);
  dt: any = this.tday.getDate();
  moStr: string = this.monthNames[this.mo-1];
  wkd: any = new Date(this.yr+"-"+this.moPad+"-01").getUTCDay();
  dayArr : Array<any> = [];
  selfieData: Array<any> = [];

  constructor() {
    console.log('Hello CalendarComponent Component',this);
  }

  ngOnInit(){
  	console.log('init - calendar');
    this.buildDayArray();

  }

   pad(n){
   	return n<10 ? '0'+n : n;
   }

   nDays(n){
   	if(n==1 || n==3 || n==5 || n==7 || n==8 || n==10 || n==12){
   		return 31;
   	}
   	else if(n==2){
   		if(this.leap(this.yr)){
   			return 29;
   		}
   		else{
   			return 28;
   		}
   	}else{
   		return 30;
   	}
   }

	leap(n){

		return (n % 100 === 0) ? (n % 400 === 0) : (n % 4 === 0);
	}

	buildDayArray(){
		this.dayArr = [];
		this.selfieData = [];
		for(let c = this.wkd;c>0;c--){
			this.dayArr.push("");
		}
		for(let c=1;c<=this.nDays(this.mo);c++){
			this.dayArr.push(c);
			if(Math.random()*100 < 35) this.selfieData.push(c);
		}
	}

	prevMonth(){
		--this.mo;
		if(this.mo <= 0){
			this.mo = 12;
			--this.yr;
		}
		this.moPad = this.pad(this.mo);
  		this.moStr = this.monthNames[this.mo-1];
  		this.wkd = new Date(this.yr+"-"+this.moPad+"-01").getUTCDay();
		this.buildDayArray();
	}

	nextMonth(){
		++this.mo;
		if(this.mo >= 13){
			this.mo = 1;
			++this.yr;
		}
		this.moPad = this.pad(this.mo);
  		this.moStr = this.monthNames[this.mo-1];
  		this.wkd = new Date(this.yr+"-"+this.moPad+"-01").getUTCDay();
		this.buildDayArray();
	}

	goToday(){

	  this.yr = this.tday.getFullYear();
	  this.mo = this.tday.getUTCMonth()+1;
	  this.moPad = this.pad(this.mo);
	  this.moStr = this.monthNames[this.mo-1];
	  this.wkd = new Date(this.yr+"-"+this.moPad+"-01").getUTCDay();
	  this.buildDayArray();
	}

}
