import { Component, OnInit } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-letter-tracking',
  templateUrl: './letter-tracking.component.html',
  styleUrls: ['./letter-tracking.component.css']
})
export class LetterTrackingComponent implements OnInit {

  constructor(
    public alertController: AlertController,
  ) { }

  ngOnInit(): void {
  }

  

}
