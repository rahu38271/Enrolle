import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  constructor(
    public menuCtrl: MenuController,
    private location:Location
  ) { }

  ngOnInit(): void {
    
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  goBack(){
    this.location.back();
  }

}
