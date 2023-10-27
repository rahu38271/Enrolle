import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { ExcelService } from 'src/app/services/excel.service';
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-voter-summary',
  templateUrl: './voter-summary.component.html',
  styleUrls: ['./voter-summary.component.scss'],
})
export class VoterSummaryComponent implements OnInit {
  Language:any;
  assemblyNo:any;
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  voterCount: any[]=[];
  userID: any;
  roleID:any;
  assemblyName:any;
  district:any;
  village:any;
  searchWeb:string;
  isAssembly=true;
  isVillage=true;
  assemblyNameByLang:any;
  nonEngAssembly=false;
  engAssembly=false;
  constructor(
    public alertController: AlertController, 
    private voter:VoterService, 
    private router:Router,
    public translate: TranslateService,
    private excel: ExcelService,
    private csv:CsvService,
    private translateConfigService: TranslateConfigService,
    ) {
    this.Language = this.translateConfigService.getCurrentLang();
    
    if(this.Language == 'en'){
      this.engAssembly = true;
    }
    else{
      this.nonEngAssembly = true;
    }
    if (this.Language == "kn") {
      this.Language = "Kannada"
    }
    else if (this.Language == "mr") {
      this.Language = "Marathi"
    }
    else if (this.Language == "hi") {
      this.Language = "Hindi"
    }
    else {
      this.Language = "English"
    }
   }

  ngOnInit() { 
    this.userID = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.assemblyName = localStorage.getItem("loginAssembly");
    this.district = localStorage.getItem("loginDistrict");
    this.village = localStorage.getItem("loginVillage");
   
    // if(this.assemblyName=="null"){
    //   this.isAssembly=!this.isAssembly;
    // }
    // else{
    //   this.isAssembly=this.isAssembly;
    // }
    // if(this.village=="null"){
    //   this.isVillage=!this.isVillage;
    // }
    // else{
    //   this.isVillage=this.isVillage;
    // }
    
  }

  ionViewWillEnter(){
    this.voterByBooth();
    this.assemblyNameLang();
  }

  partNo(partNo:any){
    this.router.navigate(['/voterdata-management',{partNo:partNo}])
   }

  voterByBooth(){
    this.voter.boothWiseVoterCount(this.userID,this.roleID).subscribe(data=>{
      this.voterCount = data;
    })
  }

  assemblyNameLang(){
    this.voter.getAssemblyName(this.assemblyName).subscribe(data=>{
      this.assemblyNameByLang = data;
    })
  }

  exportExcel() {
    this.excel.exportAsExcelFile(this.voterCount, 'voter summary');
  }

  exportToCSV() {
    this.csv.exportToCsv(this.voterCount, 'voter summary');
  }

  pdf() {
    var element = document.getElementById('table19');
    
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
