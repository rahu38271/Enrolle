import { Component, OnInit,ViewChild } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-by-cast',
  templateUrl: './by-cast.component.html',
  styleUrls: ['./by-cast.component.scss'],
})
export class ByCastComponent implements OnInit {

  Language:any;
  isShow = false;
  castData: any;
  searchWeb:string;
  id:any;
  roleId:any;

  

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
    this.allCastes();
    
  
  }

  allCastes() {
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
    this.voter.CastData({
      TableName: "Tbl_Voter",
      ColumnName: "Caste",
      UserId : Number(this.id),
      roleID: Number(this.roleId),
      Language: this.Language
    }).subscribe(data => {
      if(data != 0){
        this.loader.hideLoader();
        this.castData = data;
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  caste(columnName:any){
    this.router.navigate(['/list/castwise-list',  {Caste :columnName} ])
   }

   onSearchChange(event: CustomEvent) {
    if (event.detail.value) {
      this.searchWeb = event.detail.value.trim();
    }
  }

  goBack(){
    this.location.back();
  }

}
