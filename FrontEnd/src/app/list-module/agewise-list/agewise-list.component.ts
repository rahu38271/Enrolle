import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'
import { Router} from '@angular/router'
import { IonicToastService} from 'src/app/services/ionic-toast.service'

@Component({
  selector: 'app-agewise-list',
  templateUrl: './agewise-list.component.html',
  styleUrls: ['./agewise-list.component.scss'],
})
export class AgewiseListComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  myForm1;
  gender:string;
  ageModal:any = {
    age1:'',
    age2:'',
    gender: ''
  };
  ageList: any[] = [];
  userId: any;
  roleID:any;
  searchMob:string;
  isShow = false;
  
  constructor(
    private toast:IonicToastService, 
    private router: Router,
    private loader:LoaderService, 
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController, 
    private voter:VoterService
    ) { }

  ngOnInit() {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.agewiseSearch();
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

   agewiseSearch() {
    this.voter.voterBetweenAge(this.ageModal.age1, this.ageModal.age2, this.ageModal.gender, this.userId, this.roleID).subscribe(data => {
      this.loader.showLoading();
      if (data.length > 0) {
        this.loader.hideLoader();
        this.ageList = data;
        this.toast.presentToast("searched successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
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
