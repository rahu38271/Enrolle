import { Component, OnInit,ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-datewise-report',
  templateUrl: './datewise-report.component.html',
  styleUrls: ['./datewise-report.component.css']
})
export class DatewiseReportComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  isModalOpen = false;
  searchWeb:string;
  year : number = new Date().getFullYear();
  myForm1: any;
  searchModal:any={
    Type:'',
    Date:'',
    PageNo:'',
    NoofRow:'',
    SearchText:''
   }
  userId:any;
  roleId:any;
  isShow = false;
  PageNo:any=1;
  NoofRow:any=25;
  maxDate:String = new Date().toISOString();
  SearchText:any;
  getReport:any;
  totalItems:any;
  constructor(
    private contact:ContactService,
    private loader:LoaderService,
    private toast:IonicToastService,
    private excel:ExcelService,
    private csv:CsvService
  ) { }

  ngOnInit(): void {
    if(this.SearchText==undefined){
      this.SearchText=''
    }
    else{
      this.SearchText = this.SearchText;
    }
  }

  DatewiseReport(){
    this.isShow=true;
    this.loader.showLoading();
    this.contact.reportByDate(this.searchModal.Type,this.searchModal.Date,this.searchModal.PageNo=this.PageNo,this.searchModal.NoofRow=this.NoofRow, this.searchModal.SearchText).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.toast.presentToast("Searched successfully!", "success", 'checkmark-circle-sharp');
        this.getReport = data;
        this.totalItems = data[0].totalCount;
        this.getReport.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
          e.anniversary = e.anniversary.split('T')[0];
        });
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      
    })
  }

  event(event:any){
    this.PageNo = event;
    this.DatewiseReport();
  }  

  exportExcel():void {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.contact.reportByDate(this.searchModal.Type,this.searchModal.Date,this.searchModal.PageNo=this.PageNo,this.searchModal.NoofRow=this.NoofRow, this.searchModal.SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.getReport = data;
        this.totalItems = data[0].totalCount;
        this.getReport.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0] == '1900-01-01' ? '' : e.birthDate.split('T')[0];
          e.anniversary = e.anniversary.split('T')[0] == '1900-01-01' ? '' : e.anniversary.split('T')[0]; 
          delete e.totalCount;
          delete e.loginUserId;
        });
        this.excel.exportAsExcelFile(this.getReport, 'Report');
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
    this.contact.reportByDate(this.searchModal.Type,this.searchModal.Date,this.searchModal.PageNo=this.PageNo,this.searchModal.NoofRow=this.NoofRow, this.searchModal.SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.getReport = data;
        this.totalItems = data[0].totalCount;
        this.getReport.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0] == '1900-01-01' ? '' : e.birthDate.split('T')[0];
          e.anniversary = e.anniversary.split('T')[0] == '1900-01-01' ? '' : e.anniversary.split('T')[0]; 
          delete e.totalCount;
          delete e.loginUserId;
          delete e.id;
        });
        this.csv.exportToCsv(this.getReport, 'contact');
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
