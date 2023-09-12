import { Component, OnInit } from '@angular/core';
import { LetterService } from 'src/app/services/letter.service';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Location } from '@angular/common';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-letter-by-date',
  templateUrl: './letter-by-date.component.html',
  styleUrls: ['./letter-by-date.component.css']
})
export class LetterByDateComponent implements OnInit {

  UserId:any;
  RoleId:any;
  PageNo:any=1;
  NoofRow:any=25;
  Status:any;
  SearchText:any;
  letterByDate:any;
  totalItems:any;
  EndDate:any;
  StartDate:any;
  isPending:boolean=false;
  isCompleted:boolean=false;
  value:any;

  searchModal:any={
    UserId:'',
    RoleId:'',
    PageNo:'',
    NoofRow:'',
    Status:'',
    SearchText:''
  }

  constructor(
    private letterService:LetterService,
    private loader:LoaderService,
    private toast:IonicToastService,
    private location:Location,
    private excel: ExcelService,
    private csv: CsvService,
  ) { }

  ngOnInit(): void {
    this.UserId = localStorage.getItem('loginId');
    this.RoleId = localStorage.getItem('userType');
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText;
    }
    
  }

  event(event:any){
    this.PageNo=event;
    this.datewiseLetter();
  }

  datewiseLetter(){
    debugger;
    this.loader.showLoading();
    if(this.searchModal.EndDate==undefined){
      this.searchModal.EndDate = ''
    }
    this.searchModal.UserId = Number(this.UserId);
    this.searchModal.RoleId = Number(this.RoleId);
    this.searchModal.PageNo = this.PageNo;
    this.searchModal.NoofRow = this.NoofRow,
    this.searchModal.SearchText = this.SearchText;
    this.letterService.getLetterByDate(
      this.searchModal.UserId,
      this.searchModal.RoleId,
      this.searchModal.PageNo = this.searchModal.PageNo,
      this.searchModal.NoofRow = this.searchModal.NoofRow,
      this.searchModal.Status = this.searchModal.Status,
      this.searchModal.StartDate = this.searchModal.StartDate,
      this.searchModal.EndDate = this.searchModal.EndDate,
      this.searchModal.SearchText
      ).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.letterByDate = data;
        this.totalItems = data[0].totalCount;
        this.letterByDate.forEach(e => {
          e.status = e.status;
          // if(e.status=="Pending"){
          //   this.isPending=true;
          //   this.isCompleted=false;
          // }
          // else if(e.status=="Completed"){
          //   this.isPending=false;
          //   this.isCompleted=true;
          // }
        });
        
        this.toast.presentToast("Searched successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Not Searched", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  goBack(){
    this.location.back();
  }

  exportExcel(): void {
    this.PageNo = 1;
    this.NoofRow = this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.letterService.getLetterByDate(
      this.searchModal.UserId,
      this.searchModal.RoleId,
      this.searchModal.PageNo = this.searchModal.PageNo,
      this.searchModal.NoofRow = this.searchModal.NoofRow,
      this.searchModal.Status = this.searchModal.Status,
      this.searchModal.StartDate = this.searchModal.StartDate,
      this.searchModal.EndDate = this.searchModal.EndDate,
      this.searchModal.SearchText
      ).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.letterByDate = data;
        this.letterByDate.forEach(e => {
          delete e.totalCount;
          delete e.createdDate;
          delete e.roleId;
          delete e.userId;
          delete e.fileName;
        });
        this.excel.exportAsExcelFile(this.letterByDate, 'Letters By Date');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();
    })
  }


  exportToCSV() {
    this.PageNo = 1;
    this.NoofRow = this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.letterService.getLetterByDate(
      this.searchModal.UserId,
      this.searchModal.RoleId,
      this.searchModal.PageNo = this.searchModal.PageNo,
      this.searchModal.NoofRow = this.searchModal.NoofRow,
      this.searchModal.Status = this.searchModal.Status,
      this.searchModal.StartDate = this.searchModal.StartDate,
      this.searchModal.EndDate = this.searchModal.EndDate,
      this.searchModal.SearchText
      ).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.letterByDate = data;
        this.letterByDate.forEach(e => {
          delete e.totalCount;
          delete e.createdDate;
          delete e.roleId;
          delete e.userId;
          delete e.fileName;
          delete e.id;
        });
        this.csv.exportToCsv(this.letterByDate, 'Letters By Date');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();
    })
  }

}
