import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common';
import { IAccTooltipRenderEventArgs, IPointEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-voted',
  templateUrl: './voted.component.html',
  styleUrls: ['./voted.component.scss'],
})
export class VotedComponent implements OnInit {

  isShow = false;
  UserId:any;
  RoleId:any;
  IsVoted:any;
  Coloumn: any;
  columnName: string;
  public voterVoted: Object[];
  public totalDataLael: Object;
  public tooltip: Object;
  public title1: String;
  public palette1: string[];
  
  public pointClick(args: IPointEventArgs): void {
    document.getElementById("lbl").innerText = "X : " + args.point.x + "\nY : " + args.point.y;
  };

  constructor(
    private loader:LoaderService,
    private voter:VoterService,
    private router:Router,
    private location:Location
    ) { }

  search(){
    this.isShow = !this.isShow
  }

  ngOnInit() {
    this.UserId = localStorage.getItem("loginId");
    this.RoleId = localStorage.getItem("userType")
    this.votedList();
    this.totalDataLael = { visible: true };
    this.tooltip = { enable: true };
    this.title1 = 'Voted not-voted data';
  }

  votedList(){
    this.loader.showLoading();
    this.voter.getIsVoted(this.UserId,this.RoleId,this.Coloumn = 'IsVoted').subscribe(data=>{
      if(data != 0){
        this.loader.hideLoader();
        this.voterVoted = data
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  isVotedOrNot(columnName:any){
    if(columnName == "Voted"){
      this.router.navigateByUrl('/list/voted-voter')
    }
    else if(columnName == "NotVoted"){
      this.router.navigateByUrl('/list/notVoted-voter')
    }
    
  }

  goBack(){
    this.location.back();
  }

}
