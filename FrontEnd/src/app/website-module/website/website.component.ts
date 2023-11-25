import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  constructor(
    public menuCtrl: MenuController,
  ) { }

  ngOnInit(): void {
    debugger;
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }


}
