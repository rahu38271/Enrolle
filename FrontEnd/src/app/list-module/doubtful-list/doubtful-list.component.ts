import { Component, OnInit } from '@angular/core';
import { VoterService  } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'
import { Router } from '@angular/router'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service'; 

@Component({
  selector: 'app-doubtful-list',
  templateUrl: './doubtful-list.component.html',
  styleUrls: ['./doubtful-list.component.css']
})
export class DoubtfulListComponent implements OnInit {
  Language:any;
  userId: any;
  roleID:any;
  doubtfulVoter: any;
  searchMob:string;
  isShow = false;
  PageNo:any=1;
  NoofRow:any=10;
  totalItems:any;
  SearchText:any;

  constructor(
    private voter:VoterService,
    private loader:LoaderService,
    private router:Router,
    private translateConfigService: TranslateConfigService,
    private toast:IonicToastService
  ) {
    this.Language = this.translateConfigService.getCurrentLang();
   }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    this.roleID = localStorage.getItem('userType');
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.doubtfulList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

   event(event:any){
    this.PageNo = event;
    this.doubtfulList(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }

  doubtfulList(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
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
    this.voter.doubtful(userId,roleID,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        //this.loader.hideLoader();
        this.doubtfulVoter = data;
        this.totalItems = data[0].totalCount;
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

  onSearchChange(SearchText:any){
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    this.SearchText=SearchText;
    this.doubtfulList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }

  keyPress(SearchText:any){
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    this.SearchText=SearchText;
    this.doubtfulList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }

}
