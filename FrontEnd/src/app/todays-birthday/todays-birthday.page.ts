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
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';

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
  language: any;
  Template = '';
  Content = '';
  NormalMsg = '';
  whatsappMsg = '';
  isShow = false;
  getBirthdays:any[]=[];
  searchMob: string;
  searchWeb: string;
  cp: number = 1;
  dataLength:any;
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
    private csv:CsvService,
    private translateConfigService: TranslateConfigService
  ) {
      this.translateConfigService.getDefaultLanguage();
      this.language = this.translateConfigService.getCurrentLang();
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
      if(data!=0){
        this.getBirthdays = data;
        this.getBirthdays.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
        }
        else{
          this.loader.hideLoader();
          this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
        }
        this.dataLength=this.dataLength;
      },(err)=>{
        this.loader.hideLoader();
      })
  }

  exportExcel(){
    this.getBirthdays.length=this.getBirthdays.length;
    this.loader.showLoading();
    if(this.getBirthdays.length!=0){
      this.loader.hideLoader();
      this.getBirthdays.forEach(e=> {
        e.birthDate = e.birthDate.split('T')[0];
        delete e.totalCount;
        delete e.loginUserId
      });
      this.excel.exportAsExcelFile(this.getBirthdays, 'birthday');
      this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
    }
    else{
      this.loader.hideLoader();
      this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
    }
  }

  exportToCSV() {
    this.getBirthdays.length=this.getBirthdays.length;
    this.loader.showLoading();
      if(this.getBirthdays.length!=0){
        this.loader.hideLoader();
        this.getBirthdays.forEach(e=>{
          e.birthDate = e.birthDate.split('T')[0];
          e.anniversary = e.anniversary.split('T')[0];
          delete e.totalCount;
          delete e.loginUserId;
          delete e.id;
        })
        this.csv.exportToCsv(this.getBirthdays, 'birthday');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      } 
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
