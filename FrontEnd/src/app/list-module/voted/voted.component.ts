import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { VoterService } from 'src/app/services/voter.service'

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
  voterVoted:any;

  constructor(
    private loader:LoaderService,
    private voter:VoterService
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

}
