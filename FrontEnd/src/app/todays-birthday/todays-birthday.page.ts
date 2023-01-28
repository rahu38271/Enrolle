import { Component, OnInit} from '@angular/core';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { BirthdayService } from '../services/birthday.service';
import { LoaderService } from '../services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { ToastController } from '@ionic/angular';
import { ExcelService } from '../services/excel.service';
import { CsvService } from '../services/csv.service';

@Component({
  selector: 'app-todays-birthday',
  templateUrl: './todays-birthday.page.html',
  styleUrls: ['./todays-birthday.page.scss'],
  animations: [
    trigger('slide_in_out', [
      state('slide_in', style({
        width: '400px',
        // css styles when the element is in slide_in
      })),
      state('slide_out', style({
        width: '0px'
        // css styles when the element is in slide_out
      })),
      // animation effect when transitioning from one state to another
      transition('slide_in <=> slide_out', animate(300))
    ]),
  ]
})
export class TodaysBirthdayPage implements OnInit {

  Template = '';
  Content = '';
  NormalMsg = '';
  whatsappMsg = '';
  isShow = false;
  getBirthdays:any;
  searchMob: string;
  searchWeb: string;
  cp: number = 1;
  
  slider_state:string = "slide_out";
  toggleSlider(): void{
    // do something to change the animation_state variable
    this.slider_state = this.slider_state === 'slide_out' ? 'slide_in' : 'slide_out';
  }
  toggleSlider1(): void{
    // do something to change the animation_state variable
    this.slider_state = this.slider_state === 'slide_in' ? 'slide_out' : 'slide_in';
  }
  
  
  TemplateHeader:any = {
    header: 'Select Template'
  }

  currentDate = new Date();

  constructor
  (
    private birthday:BirthdayService, 
    private loader:LoaderService, 
    private toast:IonicToastService, 
    private toastController: ToastController,
    private excel:ExcelService,
    private csv:CsvService
  ) {
    
   }

   search(){
     this.isShow = !this.isShow
   }

  ngOnInit() {
    this.birthDateList();
  }

  birthDateList(){
    this.loader.showLoading();
    this.birthday.getBirthdays().subscribe(data=>{
      this.loader.hideLoader();
      if(data != 0){
        this.getBirthdays = data;
        this.getBirthdays.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
        }
        else{
          this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
        }
      })
  }

  exportExcel(){
    this.getBirthdays.forEach(e=> {
      e.birthDate = e.birthDate.split('T')[0];
    });
    this.excel.exportAsExcelFile(this.getBirthdays, 'contact');
  }

  exportToCSV() {
    this.getBirthdays.forEach(e =>{
      e.birthDate = e.birthDate.split('T')[0];
      e.anniversary = e.anniversary.split('T')[0] == '1900-01-01' ? '': e.anniversary.split('T')[0];
    })
    this.csv.exportToCsv(this.getBirthdays, 'contact');
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


  pdf() {
    var element = document.getElementById('table');
    
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
