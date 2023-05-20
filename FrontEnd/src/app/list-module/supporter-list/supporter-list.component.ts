import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { VoterService } from 'src/app/services/voter.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';

@Component({
  selector: 'app-supporter-list',
  templateUrl: './supporter-list.component.html',
  styleUrls: ['./supporter-list.component.css']
})
export class SupporterListComponent implements OnInit {
  Language: any;
  userId:any;
  roleID:any;
  supportVoter: any;
  isShow = false;
  PageNo:any=1;
  NoofRow:any=10;
  searchMob:string;
  totalItems:any;
  SearchText:any;

  constructor(
    private router:Router,
    private loader:LoaderService,
    private voter:VoterService,
    private translateConfigService: TranslateConfigService,
    private toast:IonicToastService
  ) {
    this.Language = this.translateConfigService.getCurrentLang();
   }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    this.roleID = localStorage.getItem('userType');
    if(this.SearchText==undefined){
      this.SearchText =''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.supporterList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }

  event(event:any){
    this.PageNo = event;
    this.supporterList(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

  supporterList(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
    //this.loader.showLoading();
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
    this.voter.supporter(userId,roleID,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        //this.loader.hideLoader();
        this.supportVoter = data;
        this.totalItems = data[0].totalCount
      }
      else{
        //this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{
      //this.loader.hideLoader();
    })
  }
  search(){
    this.isShow = !this.isShow
  }

  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.supporterList(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 10;
      this.SearchText = SearchText;
      this.voter.supporter(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
        if (data.length != 0) {
          //this.loader.hideLoader();
          this.supportVoter = data;
          this.totalItems = data[0].totalCount
        }
      })
    }
  }

  keyPress(SearchText:any){
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.supporterList(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 10;
      this.SearchText = SearchText;
      this.voter.supporter(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
        if (data.length != 0) {
          //this.loader.hideLoader();
          this.supportVoter = data;
          this.totalItems = data[0].totalCount
        }
      })
    }
  }

}
