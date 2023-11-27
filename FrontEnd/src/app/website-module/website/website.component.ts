import { Component, OnInit,ViewChild } from '@angular/core';
import { IonContent, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {
  @ViewChild(IonContent ) content: IonContent ;
  scrollTo(_id: string) {
    let y = document.getElementById(_id).offsetTop;
    this.content.scrollToPoint(0, y);
  }
  constructor(
    public menuCtrl: MenuController,
  ) { }

  ngOnInit(): void {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }


}
