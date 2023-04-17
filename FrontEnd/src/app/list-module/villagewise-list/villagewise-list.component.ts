import { Component, OnInit } from '@angular/core';
import {VoterService } from 'src/app/services/voter.service'
import { Route, Router, ActivatedRoute } from '@angular/router'
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-villagewise-list',
  templateUrl: './villagewise-list.component.html',
  styleUrls: ['./villagewise-list.component.scss'],
})
export class VillagewiseListComponent implements OnInit {
  Language:any;
  isShow = false;
  villageName: any;
  villageWiseVoter: any[] = [];
  //villageWiseVoter: any = {};
  searchMob:string;
  userId: any;
  roleID:any;
  id:any;
  PageNo:any=1;
  NoofRow:any=25;
  totalItems:any;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor(private voter:VoterService, private route:ActivatedRoute, private router:Router,private translateConfigService: TranslateConfigService, ) {
    this.Language = this.translateConfigService.getCurrentLang();
   }

   ngOnInit(): void {
    this.userId = localStorage.getItem("loginId");
    this.id = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.villageName = this.route.snapshot.paramMap.get('villageName');
    //this.village = this.route.snapshot.paramMap.get('village');
    this.villageWiseVoterList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language);
  }

   event(event:any){
    this.PageNo = event;
    this.villageWiseVoterList(this.userId,this.roleID,event,this.NoofRow,this.Language)
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

  villageWiseVoterList(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any){
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
    this.voter.voterByVillage(this.villageName,userId,roleID,PageNo,NoofRow,this.Language).subscribe(data=>{
      if(data){
        this.villageWiseVoter = data;
        this.totalItems = data[0].totalCount
      }
    })
  }

}




