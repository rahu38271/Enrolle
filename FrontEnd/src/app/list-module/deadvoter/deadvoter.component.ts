import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import {Route, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deadvoter',
  templateUrl: './deadvoter.component.html',
  styleUrls: ['./deadvoter.component.css']
})
export class DeadvoterComponent implements OnInit {
  id:any;
  isShow = false;
  Language:any;
  SearchText:any;
  userId:any;
  roleID:any;
  isVoted:any;
  PageNo:any=1;
  NoofRow:any=25;
  deadvoterList:any;
  totalItems:any;

  search(){
    this.isShow = !this.isShow
  }

  constructor(
    private voter:VoterService,
    private loader:LoaderService,
    private router:Router,
    private route:ActivatedRoute,
    private translateConfigService:TranslateConfigService,
    private location:Location
  ) {
    this.Language = this.translateConfigService.getCurrentLang();
   }

  ngOnInit(): void {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    //this.isVoted = this.route.snapshot.paramMap.get('isVoted');
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.deadVoterList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText)
  }

  event(event){
    this.PageNo=event;
    this.deadVoterList(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }

  // voterDetails(item:any){
  //   this.router.navigate(['voterdata-management/voter-details'], { state: item })
  //  }

    // data with id
  voterDetails(data) {
    this.id = data.id;
    this.router.navigate(['/voterdata-management/voter-details', this.id])
  }

   deadVoterList(userId:any,roleId:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
    this.Language = this.translateConfigService.getCurrentLang();
    if(this.Language == "kn"){
      this.Language = "Kannada"
    }
    else if(this.Language == "mr"){
      this.Language = "Marathi"
    }
    else if (this.Language == "hi") {
      this.Language = "Hindi"
    }
    else{
      this.Language = "English"
    }
    this.voter.getDeadVoter(userId,roleId,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        this.deadvoterList=data;
        this.totalItems=data[0].totalCount;
      }
      else{

      }
    },(err)=>{

    })
  }

  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.SearchText = SearchText
      this.NoofRow = this.totalItems;
      this.deadVoterList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText)
    }
    else {
      this.PageNo = 1;
      this.SearchText = SearchText.trim();
      this.NoofRow = 25;
      this.voter.getDeadVoter(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data=>{
        if(data.length != 0){
          this.deadvoterList=data;
          this.totalItems=data[0].totalCount;
        }
        else{
  
        }
      })
    }
  }

  keyPress(SearchText:any){
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.SearchText = SearchText
      this.NoofRow = this.totalItems;
      this.deadVoterList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText)
    }
    else {
      this.PageNo = 1;
      this.SearchText = SearchText.trim();
      this.NoofRow = 25;
      this.voter.getDeadVoter(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data=>{
        if(data.length != 0){
          this.deadvoterList=data;
          this.totalItems=data[0].totalCount;
        }
        else{
  
        }
      })
    }
  }

  EditVoter(data:any){
    this.router.navigateByUrl('/voterdata-management/edit-voterdata',{state: data})
  }

  goBack(){
    this.location.back();
  }

}
