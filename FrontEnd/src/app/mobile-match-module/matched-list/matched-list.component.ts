import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service';

@Component({
  selector: 'app-matched-list',
  templateUrl: './matched-list.component.html',
  styleUrls: ['./matched-list.component.css']
})
export class MatchedListComponent implements OnInit {

  PageNo:any=1;
  NoofRow:any=25;
  userId:any;
  RoleId:any;
  matchedList:any;

  constructor(
    private voter:VoterService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    this.RoleId = localStorage.getItem('userType')
    this.mobileMatchedList(this.userId,this.RoleId,this.PageNo,this.NoofRow);
  }

  mobileMatchedList(userId:any,RoleId:any,PageNo:any,NoofRow:any){
    this.voter.getMobileMatchedList(userId,RoleId,PageNo,NoofRow).subscribe(data=>{
      if(data){
        console.log(data);
        this.matchedList=data;
      }
      else{

      }
    },(err)=>{

    })
  }

}
