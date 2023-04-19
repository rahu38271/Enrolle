import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-subletter',
  templateUrl: './subletter.component.html',
  styleUrls: ['./subletter.component.css']
})
export class SubletterComponent implements OnInit {

  isModalOpen = false;

  constructor(
    public modalCtrl: ModalController,
  ) { }

  ngOnInit(): void {
  }

  family(){
    this.isModalOpen = true;
  }

  closeFamily(){
    this.isModalOpen = false;
  }

}
