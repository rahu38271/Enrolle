import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { VoterService } from 'src/app/services/voter.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  UserId:any;
  RoleId:any;
  voterCount:any;
  supporter:any
  doubtful:any;
  opposite:any;

  constructor(
    private location: Location,
    private voter:VoterService
  ) { }

  ngOnInit() {
    this.UserId = localStorage.getItem('loginId');
    this.RoleId = localStorage.getItem('userType');
  }

  ionViewWillEnter(){
    this.dashboardCount();
  }

  dashboardCount(){
    this.voter.getVoterDashboardCount(this.UserId,this.RoleId).subscribe(data=>{
      if(data){
        console.log(data);
        this.voterCount = data;
        this.supporter = data[0].supporterCount;
        this.opposite = data[0].oppositionCount;
        this.doubtful = data[0].doubtfulCount;
      }
      else{

      }
    })
  }

  goBack() {
    this.location.back();
  }

}
