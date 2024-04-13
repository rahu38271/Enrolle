import { Component, OnInit } from '@angular/core';
import { VoterService  } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'
import { Router } from '@angular/router'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service'; 
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-doubtful-list',
  templateUrl: './doubtful-list.component.html',
  styleUrls: ['./doubtful-list.component.css']
})
export class DoubtfulListComponent implements OnInit {
  id:any;
  Language:any;
  userId: any;
  roleID:any;
  doubtfulVoter: any;
  searchMob:string;
  isShow = false;
  PageNo:any=1;
  NoofRow:any=25;
  totalItems:any;
  SearchText:any;

  constructor(
    private voter:VoterService,
    private loader:LoaderService,
    private router:Router,
    private translateConfigService: TranslateConfigService,
    private toast:IonicToastService,
    private excel:ExcelService,
    private csv:CsvService,
    private location:Location
  ) {
    this.Language = this.translateConfigService.getCurrentLang();
   }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    this.roleID = localStorage.getItem('userType');
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.doubtfulList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }

  // data with state
  // voterDetails(item:any){
  //   this.router.navigate(['voterdata-management/voter-details'], { state: item })
  //  }

    // data with id
  voterDetails(data) {
    this.id = data.id;
    this.router.navigate(['/voterdata-management/voter-details', this.id])
  }

   event(event:any){
    this.PageNo = event;
    this.doubtfulList(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }

  doubtfulList(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any,SearchText:any){
    //this.loader.showLoading();
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
    this.voter.doubtful(userId,roleID,PageNo,NoofRow,this.Language,this.SearchText).subscribe(data=>{
      if(data.length != 0){
        //this.loader.hideLoader();
        this.doubtfulVoter = data;
        this.totalItems = data[0].totalCount;
      }
      else{
        //this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{
      //this.loader.hideLoader();
    })
  }

  search(){
    this.isShow = !this.isShow
  }

  EditVoter(data:any){
    this.router.navigateByUrl('/voterdata-management/edit-voterdata',{state: data})
  }

  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.doubtfulList(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow =25;
      this.SearchText = SearchText.trim();
      this.voter.doubtful(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
        if (data) {
          this.doubtfulVoter = data;
          this.totalItems = data[0].totalCount;
        }
      })
    }
  }

  exportExcel():void {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.voter.doubtful(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.doubtfulVoter = data;
        this.totalItems = data[0].totalCount;
        this.doubtfulVoter.forEach(e=>{
          delete e.totalCount;
          delete e.isVoted;
          delete e.isAlive;
        })
        this.excel.exportAsExcelFile(this.doubtfulVoter, 'Doubtful Voter');
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
    this.voter.doubtful(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.doubtfulVoter = data;
        this.totalItems = data[0].totalCount;
        this.doubtfulVoter.forEach(e=>{
          delete e.totalCount;
          delete e.isVoted;
          delete e.isAlive;
        })
        this.csv.exportToCsv(this.doubtfulVoter, 'Doubtful Voter');
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
