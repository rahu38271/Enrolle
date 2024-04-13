import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LetterService } from 'src/app/services/letter.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-pending-letters',
  templateUrl: './pending-letters.component.html',
  styleUrls: ['./pending-letters.component.css']
})
export class PendingLettersComponent implements OnInit {

  UserId:any;
  RoleId:any;
  PageNo:any=1;
  NoofRow:any=25;
  Status:any;
  lettersPending:any;
  totalItems:any;
  isPending:boolean=true;
  SearchText:any;

  constructor(
    private location:Location,
    private letterService:LetterService,
    private router:Router,
    private loader:LoaderService,
    private toast:IonicToastService,
    private excel: ExcelService,
    private csv: CsvService,
  ) { }

  ngOnInit(): void {
    this.UserId = localStorage.getItem('loginId');
    this.RoleId = localStorage.getItem('userType');
    this.Status = "Pending"
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText;
    }
    this.pendingLetters(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.Status,this.SearchText);
  }

  pendingLetters(UserId:any,RoleId:any,PageNo:any,NoofRow:any,Status:any,SearchText:any){
    this.letterService.getLetterByStatus(UserId,RoleId,PageNo,NoofRow,Status,SearchText).subscribe(data=>{
      if(data){
        this.lettersPending = data;
        this.totalItems = data[0].totalCount;
        this.lettersPending.forEach(e => {
          e.letter_Release_Date = e.letter_Release_Date.split('T')[0];
        });
      }
      else{

      }
    })
  }

  event(event){
    this.PageNo=event;
    this.pendingLetters(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.Status,this.SearchText);
  }

  goBack(){
    this.location.back();
  }

  subLetter(id:any){
    this.router.navigate(['letter-tracking/sub-letter', id])
  }

  exportExcel(): void {
    this.PageNo = 1;
    this.NoofRow = this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.letterService.getLetterByStatus(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.Status,this.SearchText).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.lettersPending = data;
        this.lettersPending.forEach(e => {
          delete e.totalCount;
          delete e.createdDate;
          delete e.roleId;
          delete e.userId;
          delete e.fileName;
        });
        this.excel.exportAsExcelFile(this.lettersPending, 'Pending Letters');
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
    this.letterService.getLetterByStatus(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.Status,this.SearchText).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.lettersPending = data;
        this.lettersPending.forEach(e => {
          delete e.totalCount;
          delete e.createdDate;
          delete e.roleId;
          delete e.userId;
          delete e.fileName;
          delete e.id;
        });
        this.csv.exportToCsv(this.lettersPending, 'Pending Letters');
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

  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.pendingLetters(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.Status,SearchText)
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText;
      this.letterService.getLetterByStatus(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.Status,this.SearchText).subscribe(data => {
        if (data.length != 0) {
          this.lettersPending = data;
          this.totalItems = data[0].totalCount

        }
        else {

        }
      }, (err) => {

      })
    }
  }

  keyPress(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.pendingLetters(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.Status,SearchText)
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText;
      this.letterService.getLetterByStatus(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.Status,this.SearchText).subscribe(data => {
        if (data.length != 0) {
          this.lettersPending = data;
          this.totalItems = data[0].totalCount

        }
        else {

        }
      }, (err) => {

      })
    }
  }

}
