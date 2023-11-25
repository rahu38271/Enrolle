import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { ExcelService } from 'src/app/services/excel.service';
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  searchModal:any={}
  dateWiseList:any;
  cp: number = 1;
  UserId:any;
  RoleId:any;

  constructor(
    private complaint:ComplaintService,
    private loader:LoaderService,
    private toast:IonicToastService,
    private excel:ExcelService,
    private csv:CsvService,
  ) { }

  ngOnInit(): void {
    this.UserId = localStorage.getItem("loginId");
    this.RoleId = localStorage.getItem("userType");
    this.searchModal.Status = ""
  }

  ionViewWillEnter(){
    
  }

  reportList(){
    debugger
    this.loader.showLoading();
    this.searchModal.UserId = Number(this.UserId);
    this.searchModal.RoleId = Number(this.RoleId);
    if(this.searchModal.ToDate==undefined){
      this.searchModal.ToDate = this.searchModal.FromDate
    }else{
      this.searchModal.ToDate = this.searchModal.ToDate
    }
    this.complaint.reportByDate(this.searchModal.UserId,this.searchModal.RoleId, this.searchModal.FromDate,this.searchModal.ToDate,this.searchModal.Status).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.dateWiseList = data;
        
        this.toast.presentToast("Searched successfully!", "success", 'checkmark-circle-sharp');
      }else{
        this.loader.hideLoader();
        this.toast.presentToast("not searched", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  exportExcel(){
    this.dateWiseList.length=this.dateWiseList.length;
    this.loader.showLoading();
    if(this.dateWiseList.length!=0){
      this.loader.hideLoader();
      this.excel.exportAsExcelFile(this.dateWiseList, 'complaint report');
      this.dateWiseList.forEach(e=> {
        e.birthDate = e.birthDate.split('T')[0];
        delete e.totalCount;
        delete e.createdDate;
        delete e.userId;
        delete e.roleId;
        delete e.fileName;
      });
      this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
    }
    else{
      this.loader.hideLoader();
      this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
    }
  }

  exportToCSV() {
    this.dateWiseList.length=this.dateWiseList.length;
    this.loader.showLoading();
      if(this.dateWiseList.length!=0){
        this.loader.hideLoader();
        this.csv.exportToCsv(this.dateWiseList, 'complaint report');
        this.dateWiseList.forEach(e=> {
          e.birthDate = e.birthDate.split('T')[0];
          delete e.totalCount;
          delete e.createdDate;
          delete e.userId;
          delete e.roleId;
          delete e.fileName;
        });
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      } 
  }

}
