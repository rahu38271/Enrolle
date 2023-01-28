import { Component, OnInit } from '@angular/core';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { ToastController } from '@ionic/angular';
import { AnniversaryService } from '../services/anniversary.service';
import { LoaderService } from '../services/loader.service';
import { IonicToastService } from '../services/ionic-toast.service';  
import { ExcelService } from '../services/excel.service';
import { CsvService } from '../services/csv.service';

@Component({
  selector: 'app-today-anniversary',
  templateUrl: './today-anniversary.page.html',
  styleUrls: ['./today-anniversary.page.scss'],
})
export class TodayAnniversaryPage implements OnInit {

  Template = '';
  Content = '';
  NormalMsg = '';
  whatsappMsg = ''; 
  isShow = false;
  getAnniversary:any;
  searchMob: string;
  searchWeb: string;
  cp: number = 1;
  
  TemplateHeader:any = {
    header: 'Select Template'
  }

  currentDate = new Date();

  constructor
  (
    public toastController: ToastController, 
    private anniversary:AnniversaryService, 
    private loader:LoaderService, 
    private toast:IonicToastService,
    private excel: ExcelService,
    private csv:CsvService
  ) { 
    
  }

  search(){
    this.isShow = !this.isShow
  }

  ngOnInit() {
    this.anniversaryList();
  }

  anniversaryList(){
    this.loader.showLoading();
    this.anniversary.getAnniversary().subscribe(data=>{
      this.loader.hideLoader();
      if(data != 0){
        this.getAnniversary = data;
        this.getAnniversary.forEach(e => {
          e.anniversary = e.anniversary.split('T')[0] == '1900-01-01'? '': e.anniversary.split('T')[0];
        });
      }else{
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp')
      }
    })
  }

  exportExcel() {
    this.getAnniversary.forEach(e => {
      e.anniversary = e.anniversary.split('T')[0];
    });
    this.excel.exportAsExcelFile(this.getAnniversary, 'contact');
  }

  exportToCSV() {
    this.getAnniversary.forEach(e =>{
      e.birthDate = e.birthDate.split('T')[0];
      e.anniversary = e.anniversary.split('T')[0] == '1900-01-01' ? '': e.anniversary.split('T')[0];
    })
    this.csv.exportToCsv(this.getAnniversary, 'contact');
  }

  async downloadExcel() {
    const toast = await this.toastController.create({
      message: 'Request added to export.',
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    toast.present();
  }

  async downloadPDF() {
    const toast = await this.toastController.create({
      message: 'Request added to download doc.',
      duration: 2000,
      position: 'top',
      color: 'primary',
    });
    toast.present();
  }

  pdf() {
    var element = document.getElementById('AnniTable');
    
    var opt = {
      margin: 0.2,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();{};

    // Old monolithic-style usage:
    html2pdf(element, opt);
  }

}

