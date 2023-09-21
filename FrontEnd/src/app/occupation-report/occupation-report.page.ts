import { Component, OnInit } from '@angular/core';
import { IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { Location } from '@angular/common';
import { IAccTooltipRenderEventArgs, IPointEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-occupation-report',
  templateUrl: './occupation-report.page.html',
  styleUrls: ['./occupation-report.page.scss'],
})
export class OccupationReportPage implements OnInit {

  Language:any;
  isShow = false;
  partData: any;
  searchMob:string;
  id:any;
  roleId:any;
  public occuList: Object[];
  public totalDataLael: Object;
  public tooltip: Object;
  public title1: String;
  public palette1: string[];
 
  public pointClick(args: IPointEventArgs): void {
    document.getElementById("lbl").innerText = "X : " + args.point.x + "\nY : " + args.point.y;
  };

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
    this.allOccupData();
    this.totalDataLael = { visible: true };
    this.tooltip = { enable: true };
    this.title1 = 'Professionwise Data';
    // this.palette1 = ["#178ace", "#ffb8be", "#00e1a1"]
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

  goBack(){
    this.location.back();
  }

}
