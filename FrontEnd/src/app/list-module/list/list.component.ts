import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { VoterService } from 'src/app/services/voter.service';
import { LoaderService } from 'src/app/services/loader.service';

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
  totalCount:any;

  constructor(
    private location: Location,
    private voter:VoterService,
    private loader:LoaderService
  ) { }

  ngOnInit() {
    this.UserId = localStorage.getItem('loginId');
    this.RoleId = localStorage.getItem('userType');
  }

  ionViewWillEnter(){
    this.dashboardCount();
  }

  dashboardCount(){
    this.loader.showLoading();
    this.voter.getVoterDashboardCount(this.UserId,this.RoleId).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.voterCount = data;
        this.supporter = data[0].supporterCount;
        this.opposite = data[0].oppositionCount;
        this.doubtful = data[0].doubtfulCount;
        this.totalCount = this.supporter + this.opposite  + this.doubtful;
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  goBack() {
    this.location.back();
  }

}
