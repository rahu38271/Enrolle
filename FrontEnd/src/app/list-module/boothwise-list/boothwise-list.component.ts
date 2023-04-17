import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-boothwise-list',
  templateUrl: './boothwise-list.component.html',
  styleUrls: ['./boothwise-list.component.scss'],
})
export class BoothwiseListComponent implements OnInit {
  Language:any;
  isShow = false;
  partNumber: any;
  partWiseVoter: any[]=[];
  userId:any;
  searchMob:string;
  roleID:any;
  PageNo:any=1;
  NoofRow:any=25;
  totalItems:any;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor(
    private router:Router, 
    private voter:VoterService, 
    private route:ActivatedRoute,
    private loader:LoaderService,
    private translateConfigService: TranslateConfigService,
    ) { 
      this.Language = this.translateConfigService.getCurrentLang();
    }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType")
    this.partNumber = this.route.snapshot.paramMap.get('partNumber');
    this.partNoWiseVoter(this.userId, this.roleID,this.PageNo,this.NoofRow,this.Language);
  }

   event(event:any){
    this.PageNo = event;
    this.partNoWiseVoter(this.userId,this.roleID,event,this.NoofRow,this.Language)
  }

  partNoWiseVoter(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any){
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
    this.voter.voterByPart(this.partNumber,userId,roleID,PageNo,NoofRow,this.Language).subscribe(data=>{
      this.partWiseVoter = data;
      this.totalItems = data[0].totalCount
    })
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

}
