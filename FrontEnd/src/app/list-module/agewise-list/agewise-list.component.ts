import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'
import { Router} from '@angular/router'
import { IonicToastService} from 'src/app/services/ionic-toast.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-agewise-list',
  templateUrl: './agewise-list.component.html',
  styleUrls: ['./agewise-list.component.scss'],
})
export class AgewiseListComponent implements OnInit {

  isShow = false;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  Language: any;
  myForm1;
  gender:string;
  ageModal:any = {
    age1:'',
    age2:'',
    gender: '',
    PageNo:'',
    NoofRow:''
  };
  ageList: any[] = [];
  userId: any;
  roleID:any;
  searchMob:string;
  PageNo:any=1;
  NoofRow:any=25
  totalItems:any;
  
  constructor(
    private toast:IonicToastService, 
    private router: Router,
    private loader:LoaderService, 
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController, 
    private voter:VoterService,
    private translateConfigService: TranslateConfigService,
    ) { 
      this.Language = this.translateConfigService.getCurrentLang();
      if(this.Language == "kn"){
        this.Language = "Kannada"
      }
      else if(this.Language == "mr"){
        this.Language = "Marathi"
      }
      else if (this.Language == "hi") {
        this.Language = "Hindi"
      }
      else{
        this.Language = "English"
      }
    }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.agewiseSearch(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language);
  }

  event(event:any){
    this.PageNo = event;
    this.agewiseSearch(this.userId,this.roleID,event,this.NoofRow,this.Language)
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

   agewiseSearch(userId:any,roleID:any,PageNo:any,NofRow:any,Language:any) {
     this.isShow = !this.isShow;
    this.ageModal.Language = this.Language
    this.voter.voterBetweenAge(
      this.ageModal.age1, 
      this.ageModal.age2, 
      this.ageModal.gender, 
      this.userId, 
      this.roleID,
      this.ageModal.PageNo=1,
      this.ageModal.NoofRow=25,
      this.ageModal.Language
      ).subscribe(data => {
      this.loader.showLoading();
      if (data.length > 0) {
        this.loader.hideLoader();
        this.ageList = data;
        this.totalItems = data[0].totalCount;
        this.toast.presentToast("searched successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  search(){
    this.isShow = !this.isShow
  }


  exportexcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  pdf() {
    var element = document.getElementById('table10');
    
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
