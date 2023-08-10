import { Component, OnInit } from '@angular/core';
import {VoterService } from 'src/app/services/voter.service'
import { Route, Router, ActivatedRoute } from '@angular/router'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { LoaderService } from 'src/app/services/loader.service';

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
  NoofRow:any=10;
  totalItems:any;
  SearchText:any;
   
  search(){
    this.isShow = !this.isShow
  }

  constructor(
    private voter:VoterService, 
    private route:ActivatedRoute, 
    private router:Router,
    private translateConfigService: TranslateConfigService,
    private toast:IonicToastService,
    private excel:ExcelService,
    private csv:CsvService,
    private loader:LoaderService
     ) {
    this.Language = this.translateConfigService.getCurrentLang();
   }

   ngOnInit(): void {
    this.userId = localStorage.getItem("loginId");
    this.id = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.villageName = this.route.snapshot.paramMap.get('villageName');
    //this.village = this.route.snapshot.paramMap.get('village');
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.villageWiseVoterList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }

   event(event:any){
    this.PageNo = event;
    this.villageWiseVoterList(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

   EditVoter(data:any){
    this.router.navigateByUrl('/voterdata-management/edit-voterdata',{state: data})
  }

  villageWiseVoterList(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
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
    this.voter.voterByVillage(this.villageName,userId,roleID,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        this.villageWiseVoter = data;
        this.totalItems = data[0].totalCount
      }
      else{
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{

    })
  }

  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.SearchText = SearchText
      this.NoofRow = this.totalItems;
      this.villageWiseVoterList(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.SearchText = SearchText.trim();
      this.NoofRow = 10;
      this.voter.voterByVillage(this.villageName, this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
        if (data.length != 0) {
          this.villageWiseVoter = data;
          this.totalItems = data[0].totalCount
        }
      })
    }
  }

  keyPress(SearchText:any){
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.SearchText = SearchText
      this.NoofRow = this.totalItems;
      this.villageWiseVoterList(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.SearchText = SearchText.trim();
      this.NoofRow = 10;
      this.voter.voterByVillage(this.villageName, this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
        if (data.length != 0) {
          this.villageWiseVoter = data;
          this.totalItems = data[0].totalCount
        }
      })
    }
  }

  exportExcel():void {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.voter.voterByVillage(this.villageName,this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.villageWiseVoter = data;
        this.totalItems = data[0].totalCount;
        this.excel.exportAsExcelFile(this.villageWiseVoter, 'Villagewise Voter');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  exportToCSV() {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.voter.voterByVillage(this.villageName,this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.villageWiseVoter = data;
        this.totalItems = data[0].totalCount;
        this.csv.exportToCsv(this.villageWiseVoter, 'Villagewise Voter');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

}




