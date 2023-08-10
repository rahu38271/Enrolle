import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-by-profession',
  templateUrl: './by-profession.component.html',
  styleUrls: ['./by-profession.component.css']
})
export class ByProfessionComponent implements OnInit {

  Language:any;
  isShow = false;
  partData: any;
  searchMob:string;
  id:any;
  roleId:any;
  occuList:any;

  constructor(
    private voter: VoterService, 
    private router:Router,
    private loader:LoaderService,
    private translateConfigService: TranslateConfigService,
  ) {
    this.Language = this.translateConfigService.getCurrentLang();
   }

  search(){
    this.isShow = !this.isShow
  }

  ngOnInit() {
    this.id = localStorage.getItem("loginId");
    this.roleId = localStorage.getItem("userType");
    this.allOccupData();
  }

  occupation(columnName:any){
    this.router.navigate(['/list/professionwise-list',  {occupation :columnName} ])
   }

   allOccupData() {
    this.loader.showLoading();
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
    this.voter.occupaionData({
      TableName: "Tbl_Voter",
      ColumnName: "Occupation",
      UserId : Number(this.id),
      roleID: Number(this.roleId),
      Language: this.Language
    }).subscribe(data => {
      if(data != 0){
        this.loader.hideLoader();
        this.occuList = data;
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  trimInput(event:CustomEvent){
    if(event.detail.value){
      this.searchMob = event.detail.value.trim();
    }
  }

}
