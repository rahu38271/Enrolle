import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';

@Component({
  selector: 'app-matched-list',
  templateUrl: './matched-list.component.html',
  styleUrls: ['./matched-list.component.css']
})
export class MatchedListComponent implements OnInit {

  PageNo:any=1;
  NoofRow:any=25;
  userId:any;
  RoleId:any;
  matchedList:any;
  totalItems:any;

  constructor(
    private voter:VoterService,
    private excel:ExcelService,
    private csv:CsvService,
    private loader:LoaderService,
    private toast:IonicToastService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    this.RoleId = localStorage.getItem('userType')
    this.mobileMatchedList(this.userId,this.RoleId,this.PageNo,this.NoofRow);
  }

  mobileMatchedList(userId:any,RoleId:any,PageNo:any,NoofRow:any){
    this.voter.getMobileMatchedList(userId,RoleId,PageNo,NoofRow).subscribe(data=>{
      if(data){
        this.matchedList=data;
        this.totalItems = data[0].totalCount;
      }
      else{

      }
    },(err)=>{

    })
  }

  exportExcel():void {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.voter.getMobileMatchedList(this.userId,this.RoleId,this.PageNo,this.NoofRow).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.matchedList = data;
        this.totalItems = data[0].totalCount;
        this.matchedList.forEach(e => {
          delete e.totalCount;
          delete e.loginUserId;
        });
        this.excel.exportAsExcelFile(this.matchedList, 'Report');
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
    this.voter.getMobileMatchedList(this.userId,this.RoleId,this.PageNo,this.NoofRow).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.matchedList = data;
        this.totalItems = data[0].totalCount;
        this.matchedList.forEach(e => {
          delete e.totalCount;
          delete e.loginUserId;
          delete e.id;
        });
        this.csv.exportToCsv(this.matchedList, 'contact');
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
