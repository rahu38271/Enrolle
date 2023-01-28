import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  ismyTextFieldType: boolean;
  togglemyPasswordFieldType(){
    this.ismyTextFieldType = !this.ismyTextFieldType;
  }


  constructor(public menuCtrl: MenuController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

}
