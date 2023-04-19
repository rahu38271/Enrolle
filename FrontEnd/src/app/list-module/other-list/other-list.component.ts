import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-other-list',
  templateUrl: './other-list.component.html',
  styleUrls: ['./other-list.component.css']
})
export class OtherListComponent implements OnInit {
  Language:any;
  userId: any;
  roleID:any;
  otherVoter: any[]=[];
  isShow = false;
  PageNo:any=1;
  NoofRow:any=25;
  SearchMob:string;
  totalItems:any;

  constructor(
    private router:Router,
    private voter:VoterService,
    private loader:LoaderService,
    private translateConfigService: TranslateConfigService,
  ) { 
    this.Language = this.translateConfigService.getCurrentLang();
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    this.roleID = localStorage.getItem('userType');
    this.otherList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language);
  }

  event(event:any){
    this.PageNo = event;
    this.otherList(this.userId,this.roleID,event,this.NoofRow,this.Language)
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

   

  otherList(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any){
    this.loader.showLoading();
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
    this.voter.other(userId,roleID,PageNo,NoofRow,this.Language).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.otherVoter = data;
        this.totalItems = data[0].totalCount
      }
      else{
        this.loader.hideLoader();
      }
      
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  search(){
    this.isShow = !this.isShow
  }

}
