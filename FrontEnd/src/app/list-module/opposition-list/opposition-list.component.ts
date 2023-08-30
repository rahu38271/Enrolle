import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { VoterService } from 'src/app/services/voter.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-opposition-list',
  templateUrl: './opposition-list.component.html',
  styleUrls: ['./opposition-list.component.css']
})
export class OppositionListComponent implements OnInit {
  Language: any;
  userId: any;
  roleID:any;
  oppositeVoter: any;
  searchMob: string;
  isShow = false;
  PageNo:any=1;
  NoofRow:any=25;
  totalItems:any;
  SearchText:any;

  constructor(
    private router:Router,
    private loader:LoaderService,
    private voter:VoterService,
    private translateConfigService: TranslateConfigService,
    private excel:ExcelService,
    private csv:CsvService,
    private toast:IonicToastService,
    private location:Location
  ) { 
    this.Language = this.translateConfigService.getCurrentLang();
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    this.roleID = localStorage.getItem('userType')
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.opposite(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }

  // data with state
  // voterDetails(item:any){
  //   this.router.navigate(['voterdata-management/voter-details'], { state: item })
  //  }

    // data with id
  voterDetails(id: number) {
    this.router.navigate(['/voterdata-management/voter-details', id])
  }

   event(event:any){
    this.PageNo = event;
    this.opposite(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }

  EditVoter(data:any){
    this.router.navigateByUrl('/voterdata-management/edit-voterdata',{state: data})
  }

  opposite(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
    this.Language = this.translateConfigService.getCurrentLang();
    //this.loader.showLoading();
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
    this.voter.opposition(userId,roleID,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        //this.loader.hideLoader();
        this.oppositeVoter = data;
        this.totalItems = data[0].totalCount
      }
      else{
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
        //this.loader.hideLoader();
      }
    },(err)=>{
      //this.loader.hideLoader();
    })
  }

  search(){
    this.isShow = !this.isShow
  }

  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.opposite(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText.trim();
      this.voter.opposition(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
        if (data) {
          this.oppositeVoter = data;
          this.totalItems = data[0].totalCount
        }
      })
    }
  }

  keyPress(SearchText:any){
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.opposite(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText.trim();
      this.voter.opposition(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
        if (data) {
          this.oppositeVoter = data;
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
    this.voter.opposition(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.oppositeVoter = data;
        this.totalItems = data[0].totalCount;
        this.oppositeVoter.forEach(e=>{
          delete e.totalCount;
          delete e.isVoted;
          delete e.isAlive;
        })
        this.excel.exportAsExcelFile(this.oppositeVoter, 'Opposition Voter');
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
    this.voter.opposition(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.oppositeVoter = data;
        this.totalItems = data[0].totalCount;
        this.oppositeVoter.forEach(e=>{
          delete e.totalCount;
          delete e.isVoted;
          delete e.isAlive;
          delete e.id;
        })
        this.csv.exportToCsv(this.oppositeVoter, 'Opposition Voter');
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

  goBack(){
    this.location.back();
  }

}
