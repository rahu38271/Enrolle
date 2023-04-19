import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-imp-voter',
  templateUrl: './imp-voter.component.html',
  styleUrls: ['./imp-voter.component.css']
})
export class ImpVoterComponent implements OnInit {
  Language: any;
  isShow = false;
  impVoterData: any[] = [];
  userId: any;
  roleID:any;
  searchMob:string;
  PageNo:any=1;
  NoofRow:any=25;
  totalItems:any;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor( 
    private router:Router, 
    private voter:VoterService,
    private loader:LoaderService,
    private translateConfigService: TranslateConfigService,
    ) {
    this.Language = this.translateConfigService.getCurrentLang();
   }

  ngOnInit(): void {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType")
    this.impVoterList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language);
    }

    event(event:any){
      this.PageNo = event;
      this.impVoterList(this.userId,this.roleID,event,this.NoofRow,this.Language)
    }

    voterDetails(item:any){
      this.router.navigate(['voterdata-management/voter-details'], { state: item })
     }

  impVoterList(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any){
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
    this.voter.impVoter(userId,roleID,PageNo,NoofRow,this.Language).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.impVoterData = data;
        this.totalItems = data[0].totalCount
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

}
