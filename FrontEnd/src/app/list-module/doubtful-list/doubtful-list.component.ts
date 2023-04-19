import { Component, OnInit } from '@angular/core';
import { VoterService  } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'
import { Router } from '@angular/router'
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-doubtful-list',
  templateUrl: './doubtful-list.component.html',
  styleUrls: ['./doubtful-list.component.css']
})
export class DoubtfulListComponent implements OnInit {
  Language:any;
  userId: any;
  roleID:any;
  doubtfulVoter: any[]=[];
  searchMob:string;
  isShow = false;
  PageNo:any=1;
  NoofRow:any=25;
  totalItems:any;

  constructor(
    private voter:VoterService,
    private loader:LoaderService,
    private router:Router,
    private translateConfigService: TranslateConfigService,
  ) {
    this.Language = this.translateConfigService.getCurrentLang();
   }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    this.roleID = localStorage.getItem('userType');
    this.doubtfulList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language);
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

   event(event:any){
    this.PageNo = event;
    this.doubtfulList(this.userId,this.roleID,event,this.NoofRow,this.Language)
  }

  doubtfulList(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any){
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
    this.voter.doubtful(userId,roleID,PageNo,NoofRow,this.Language).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.doubtfulVoter = data;
        this.totalItems = data[0].totalCount;
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
