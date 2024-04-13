import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-by-slip',
  templateUrl: './by-slip.component.html',
  styleUrls: ['./by-slip.component.css']
})
export class BySlipComponent implements OnInit {

  Language:any;
  isShow = false;
  partData: any;
  searchMob:string;
  id:any;
  roleId:any;
  slipList:any;
  columnName: string;


  constructor(
    private voter: VoterService, 
    private router:Router,
    private loader:LoaderService,
    private translateConfigService: TranslateConfigService,
    private location:Location
  ) {
    this.Language = this.translateConfigService.getCurrentLang();
   }

  search(){
    this.isShow = !this.isShow
  }

  ngOnInit() {
    this.id = localStorage.getItem("loginId");
    this.roleId = localStorage.getItem("userType");
    this.allSlipData();
    
  }

   allSlipData() {
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
      ColumnName: "PrintSlip",
      UserId : Number(this.id),
      roleID: Number(this.roleId),
      Language: this.Language
    }).subscribe(data => {
      if(data != 0){
        this.loader.hideLoader();
        this.slipList = data;
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  slip(columnName:any){
    if(columnName=="Y"){
      this.router.navigate(['/list/slipprinted',  {slip :columnName} ])
    }
  }

  trimInput(event:CustomEvent){
    if(event.detail.value){
      this.searchMob = event.detail.value.trim();
    }
  }

  goBack(){
    this.location.back();
  }

}
