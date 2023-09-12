import { Component, OnInit } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import { LetterService } from 'src/app/services/letter.service';

@Component({
  selector: 'app-letter-tracking',
  templateUrl: './letter-tracking.component.html',
  styleUrls: ['./letter-tracking.component.css']
})
export class LetterTrackingComponent implements OnInit {
  UserId:any;
  RoleId:any;
  allCount:any;

  constructor(
    public alertController: AlertController,
    private letterService:LetterService
  ) { }

  ngOnInit(): void {
    this.UserId = localStorage.getItem('loginId');
    this.RoleId = localStorage.getItem('userType');
    this.dashboardCount();
  }

  dashboardCount(){
    this.letterService.getDashboardCount(this.UserId,this.RoleId).subscribe(data=>{
      if(data){
        this.allCount = data;
      }
    })
  }

}
