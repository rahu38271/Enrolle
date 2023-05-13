import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service'; 

@Component({
  selector: 'app-boothwise-list',
  templateUrl: './boothwise-list.component.html',
  styleUrls: ['./boothwise-list.component.scss'],
})
export class BoothwiseListComponent implements OnInit {
  Language:any;
  isShow = false;
  partNumber: any;
  partWiseVoter: any;
  userId:any;
  searchMob:string;
  roleID:any;
  PageNo:any=1;
  NoofRow:any=25;
  totalItems:any;
  SearchText:any;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor(
    private router:Router, 
    private voter:VoterService, 
    private route:ActivatedRoute,
    private loader:LoaderService,
    private translateConfigService: TranslateConfigService,
    private toast:IonicToastService
    ) { 
      this.Language = this.translateConfigService.getCurrentLang();
    }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType")
    this.partNumber = this.route.snapshot.paramMap.get('partNumber');
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.partNoWiseVoter(this.userId, this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
    
  }

   event(event:any){
    this.PageNo = event;
    this.partNoWiseVoter(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }

  partNoWiseVoter(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
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
    this.voter.voterByPart(this.partNumber,userId,roleID,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        this.partWiseVoter = data;
        this.totalItems = data[0].totalCount
      }
      else{
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{

    })
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

   onSearchChange(SearchText:any){
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    this.SearchText=SearchText;
    this.partNoWiseVoter(this.userId, this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
   }

   keyPress(SearchText:any){
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    this.SearchText=SearchText;
    this.partNoWiseVoter(this.userId, this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
   }

}
