import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { VoterService } from 'src/app/services/voter.service'
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-by-death',
  templateUrl: './by-death.component.html',
  styleUrls: ['./by-death.component.css']
})
export class ByDeathComponent implements OnInit {

  isShow = false;
  UserId:any;
  RoleId:any;
  IsVoted:any;
  Coloumn: any;
  voterDead:any;
  columnName:any;

  constructor(
    private loader:LoaderService,
    private voter:VoterService,
    private router:Router,
    private route:ActivatedRoute,
    private location:Location
    ) { }

  search(){
    this.isShow = !this.isShow
  }

  ngOnInit() {
    this.UserId = localStorage.getItem("loginId");
    this.RoleId = localStorage.getItem("userType")
    this.votedList();
  }

  votedList(){
    this.loader.showLoading();
    this.voter.getIsAlive(this.UserId,this.RoleId,this.Coloumn = 'IsAlive').subscribe(data=>{
      if(data != 0){
        this.loader.hideLoader();
        this.voterDead = data
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  isDead(columnName:any){
    if(columnName=="ALive"){
      this.router.navigateByUrl('/list/alive')
    }
    else if(columnName=="Dead"){
      this.router.navigateByUrl('/list/dead')
    }
  }

  goBack(){
    this.location.back();
  }

}
