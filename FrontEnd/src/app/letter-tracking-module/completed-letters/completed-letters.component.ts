import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LetterService } from 'src/app/services/letter.service';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-completed-letters',
  templateUrl: './completed-letters.component.html',
  styleUrls: ['./completed-letters.component.css']
})
export class CompletedLettersComponent implements OnInit {

  UserId:any;
  RoleId:any;
  PageNo:any=1;
  NoofRow:any=25;
  Status:any;
  lettersCompleted:any;
  totalItems:any
  isCompleted:boolean=true;
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
    this.Status = "Completed"
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.completedLetters(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.Status,this.SearchText)
  }

  completedLetters(UserId:any,RoleId:any,PageNo:any,NoofRow:any,Status:any,SearchText:any){
    this.letterService.getLetterByStatus(UserId,RoleId,PageNo,NoofRow,Status,SearchText).subscribe(data=>{
      if(data){
        this.lettersCompleted = data;
        this.totalItems = data[0].totalCount;
        this.lettersCompleted.forEach(e => {
          e.letter_Release_Date = e.letter_Release_Date.split('T')[0];
        });
      }
      else{

      }
    },(err)=>{

    })
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
        this.lettersCompleted = data;
        this.lettersCompleted.forEach(e => {
          delete e.totalCount;
          delete e.createdDate;
          delete e.roleId;
          delete e.userId;
          delete e.fileName;
        });
        this.excel.exportAsExcelFile(this.lettersCompleted, 'Completed Letters');
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
        this.lettersCompleted = data;
        this.lettersCompleted.forEach(e => {
          delete e.totalCount;
          delete e.createdDate;
          delete e.roleId;
          delete e.userId;
          delete e.fileName;
          delete e.id;
        });
        this.csv.exportToCsv(this.lettersCompleted, 'Completed Letters');
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

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.completedLetters(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.Status,SearchText)
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText;
      this.letterService.getLetterByStatus(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.Status,this.SearchText).subscribe(data => {
        if (data.length != 0) {
          this.lettersCompleted = data;
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
      this.completedLetters(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.Status,SearchText)
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText;
      this.letterService.getLetterByStatus(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.Status,this.SearchText).subscribe(data => {
        if (data.length != 0) {
          this.lettersCompleted = data;
          this.totalItems = data[0].totalCount

        }
        else {

        }
      }, (err) => {

      })
    }
  }

}
