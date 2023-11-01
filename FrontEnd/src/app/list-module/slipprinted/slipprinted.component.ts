import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { VoterService } from 'src/app/services/voter.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-slipprinted',
  templateUrl: './slipprinted.component.html',
  styleUrls: ['./slipprinted.component.css']
})
export class SlipprintedComponent implements OnInit {


  UserId:any;
  RoleId:any;
  PageNo:any=1;
  NoofRow:any=2;
  Language:any;
  ColoumnValue: any;
  ColoumnName: any;
  slipList:any;
  totalItems:any;

  constructor(
    private loader:LoaderService,
    private voter:VoterService,
    private translateConfigService: TranslateConfigService,
    private location:Location
  ) {
    this.Language = this.translateConfigService.getCurrentLang();
   }

  ngOnInit(): void {
    this.UserId = localStorage.getItem("loginId");
    this.RoleId = localStorage.getItem("userType");
    
  }

  ionViewWillEnter(){
    this.printSlipList();
  }

  event(event:any){
    this.PageNo = event;
    this.printSlipList();
  }

  printSlipList(){
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
    this.loader.showLoading();
    this.voter.getSlipData(
      this.ColoumnName="PrintSlip",
      this.ColoumnValue="Y",
      this.UserId,
      this.RoleId,
      this.PageNo,
      this.NoofRow,
      this.Language
      
    ).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.slipList = data;
        this.totalItems = data[0].totalCount
      }else{
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
