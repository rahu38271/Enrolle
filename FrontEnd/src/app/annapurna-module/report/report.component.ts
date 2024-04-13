import { Component, OnInit } from '@angular/core';
import { AnnapurnaService } from 'src/app/services/annapurna.service';
import { PopoverController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService }  from 'src/app/services/ionic-toast.service'
import { Location } from '@angular/common';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reportModal:any={}
  maxDate:String = new Date().toISOString();
  year: number = new Date().getFullYear();
  FromDate:any;
  ToDate:any;
  annapurnaList:any;

  constructor(
    private annapurna:AnnapurnaService,
    public popoverController: PopoverController,
    private loader: LoaderService,
    public toast: IonicToastService,
    private location:Location,
    private excel:ExcelService,
    private csv:CsvService
  ) { }

  ngOnInit(): void {

  }

  ionViewWillEnter(){
    //this.datewiseAnnapurna();
  }



  datewiseAnnapurna(){
    debugger;
    this.loader.showLoading();
    if(this.reportModal.Name==undefined){
      this.reportModal.Name=''
    }else{
      this.reportModal.Name = this.reportModal.Name
    }
    if(this.reportModal.FromDate==undefined){
      this.reportModal.FromDate=''
    }else{
      this.reportModal.FromDate = this.reportModal.FromDate
    }
    if(this.reportModal.ToDate==undefined){
      this.reportModal.ToDate = this.reportModal.FromDate
    }else{
      this.reportModal.ToDate = this.reportModal.ToDate
    }
    this.annapurna.annapurnaByDate(this.reportModal.Name,this.reportModal.FromDate,this.reportModal.ToDate).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.annapurnaList = data;
        this.toast.presentToast("Searched successfully!", "success", 'checkmark-circle-sharp');
      }else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  goBack(){
    this.location.back();
  }

  exportExcel():void {
    this.excel.exportAsExcelFile(this.annapurnaList, 'Annapurna');
  }

  exportToCSV() {
    this.csv.exportToCsv(this.annapurnaList, 'Annapurna');
  }

}
