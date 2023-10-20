import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import {Route, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CsvService } from 'src/app/services/csv.service';
import { ExcelService } from 'src/app/services/excel.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';

@Component({
  selector: 'app-votedvoter',
  templateUrl: './votedvoter.component.html',
  styleUrls: ['./votedvoter.component.css']
})
export class VotedvoterComponent implements OnInit {
  id:any;
  isShow = false;
  Language:any;
  SearchText:any;
  userId:any;
  roleID:any;
  roleId:any;
  isVoted:any;
  PageNo:any=1;
  NoofRow:any=25;
  votedvoterList:any;
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
    private location:Location,
    private csv:CsvService,
    private excel:ExcelService,
    private toast:IonicToastService
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
    this.votedList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText)
  }

  event(event){
    this.PageNo=event;
    this.votedList(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }

  // data with state
  // voterDetails(item:any){
  //   this.router.navigate(['voterdata-management/voter-details'], { state: item })
  //  }

     // data with id
  voterDetails(data) {
    this.id = data.id;
    this.router.navigate(['/voterdata-management/voter-details', this.id])
  }

  votedList(userId:any,roleId:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
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
    this.voter.getvoterVoted(userId,roleId,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        this.votedvoterList=data;
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
      this.votedList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText)
    }
    else {
      this.PageNo = 1;
      this.SearchText = SearchText
      this.NoofRow = 25;
      this.voter.getvoterVoted(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data=>{
        if(data.length != 0){
          this.votedvoterList=data;
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
      this.votedList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText)
    }
    else {
      this.PageNo = 1;
      this.SearchText = SearchText
      this.NoofRow = 25;
      this.voter.getvoterVoted(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data=>{
        if(data.length != 0){
          this.votedvoterList=data;
          this.totalItems=data[0].totalCount;
        }
        else{
  
        }
      })
    }
  }

  exportExcel():void {
    this.PageNo=1;
    this.roleId = this.roleID;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.voter.getvoterVoted(this.userId,this.roleId,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.votedvoterList = data;
        this.votedvoterList.forEach(e => {
          delete e.totalCount;
        });
        this.excel.exportAsExcelFile(this.votedvoterList, 'voted Voter');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  exportToCSV() {
    this.PageNo=1;
    this.roleId = this.roleID;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.voter.getvoterVoted(this.userId,this.roleId,this.PageNo,this.NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.votedvoterList = data;
        this.votedvoterList.forEach(e => {
          delete e.id;
          delete e.totalCount;
        });
        this.csv.exportToCsv(this.votedvoterList, 'voted Voter');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  EditVoter(data:any){
    this.router.navigateByUrl('/voterdata-management/edit-voterdata',{state: data})
  }

  goBack(){
    this.location.back();
  }

}
