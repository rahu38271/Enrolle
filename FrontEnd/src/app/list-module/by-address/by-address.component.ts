import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Location } from '@angular/common';
import { IAccTooltipRenderEventArgs, IPointEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-by-address',
  templateUrl: './by-address.component.html',
  styleUrls: ['./by-address.component.scss'],
})
export class ByAddressComponent implements OnInit {
  Language:any;
  isShow = false;
  searchMob:string;
  id:any
  roleId:any;
  cp: number = 1;
  totalItems:any;
  adrsData:any;
  
  
  constructor(
    private voter:VoterService, 
    private router:Router,
    private translateConfigService: TranslateConfigService,
    private loader:LoaderService,
    private location:Location
    ) { 
      this.Language = this.translateConfigService.getCurrentLang();
    }

  ngOnInit() {
    this.id = localStorage.getItem("loginId");
    this.roleId = localStorage.getItem("userType");
    
    
  }

  ionViewWillEnter(){
    this.addressData();
  }

  search(){
    this.isShow = !this.isShow
  }
 

  address(columnName:any){
    this.router.navigate(['/list/addresswise-list',  {addressName :columnName} ])
   }

  addressData(){
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
    this.loader.showLoading();
    this.voter.addressData({
      TableName: "Tbl_Voter",
      ColumnName: "Address",
      UserId : Number(this.id),
      roleID: Number(this.roleId),
      Language: this.Language
    }).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.adrsData = data;
        this.totalItems = data[0].totalCount
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  goBack(){
    this.location.back();
  }

}
