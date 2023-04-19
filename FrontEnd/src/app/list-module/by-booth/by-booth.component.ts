import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-by-booth',
  templateUrl: './by-booth.component.html',
  styleUrls: ['./by-booth.component.scss'],
})
export class ByBoothComponent implements OnInit {
  Language:any;
  isShow = false;
  partData: any;
  searchMob:string;
  id:any;
  roleId:any;

  constructor(
    private voter: VoterService, 
    private router:Router,
    private loader:LoaderService,
    private translateConfigService: TranslateConfigService,
    ) { 
      this.Language = this.translateConfigService.getCurrentLang();
    }

  search() {
    this.isShow = !this.isShow
  }

  ngOnInit() {
    this.id = localStorage.getItem("loginId");
    this.roleId = localStorage.getItem("userType");
    this.allParts();
   }

   partNo(columnName:any){
    this.router.navigate(['/list/boothwise-list',  {partNumber :columnName} ])
   }

  allParts() {
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
    this.voter.partNoData({
      TableName: "Tbl_Voter",
      ColumnName: "PartNo",
      UserId : Number(this.id),
      roleID: Number(this.roleId),
      Language: this.Language
    }).subscribe(data => {
      if(data != 0){
        this.loader.hideLoader();
        this.partData = data;
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

}
