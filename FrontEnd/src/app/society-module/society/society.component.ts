import { Component, OnInit, ViewChild, ElementRef,ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SuperadminService } from 'src/app/services/superadmin.service'
import { LoaderService } from 'src/app/services/loader.service'
import { Router, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { SocietyService } from 'src/app/services/society.service'
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-society',
  templateUrl: './society.component.html',
  styleUrls: ['./society.component.css']
})
export class SocietyComponent implements OnInit {

  getSocietyList:any;

  isShow = false;
  searchWeb: string;
  getAdminList: any;

  currentDate = new Date();
  roleId: any;
  superId:any;
  adminid:any;
  id:any;
  roleName: string;
  PageNo:any=1;
  NoofRow:any=10;
  SearchText:any;
  totalItems:any;
 
  search() {
    this.isShow = !this.isShow
  }

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  constructor
    (
      public alertController: AlertController,
      private sadmin: SuperadminService,
      private loader: LoaderService,
      private router: Router,
      private location: Location,
      private toast: IonicToastService,
       private route: ActivatedRoute,
       private changeDetection: ChangeDetectorRef,
       private society:SocietyService,
       private excel:ExcelService,
       private csv:CsvService
    ) {
      
  }

  ngOnInit() {
    if(this.SearchText == undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
  }

  ionViewWillEnter(){
    this.roleId = Number(this.roleId)
    this.id = localStorage.getItem("loginId");
    this.societyList(this.PageNo,this.NoofRow,this.SearchText);
    
  }

  societyList(PageNo:any,NoofRow:any,SearchText:any){
    //this.loader.showLoading();
    this.society.getAllSociety(PageNo,NoofRow,SearchText).subscribe(data=>{
      if(data.length != 0){
        //this.loader.hideLoader();
        this.getSocietyList = data;
        this.totalItems = data[0].totalcount
      }
      else{
        //this.loader.hideLoader();
      }
    },(err)=>{
      //this.loader.hideLoader();
    })
  }

  event(event:any){
    this.PageNo=event;
    this.societyList(event,this.NoofRow,this.SearchText);
  }

  societyDetails(item:any){
    this.router.navigateByUrl('/society/society-details', {state:item})
  }

  EditSociety(data: any) {
    this.router.navigateByUrl('/society/edit-society', { state: data })
  }

  onSearchChange(SearchText:any){
    if(this.SearchText==""){
      this.PageNo=1;
      this.NoofRow=this.totalItems;
      this.SearchText=SearchText;
      this.societyList(this.PageNo,this.NoofRow,this.SearchText);
    }
    else{
      this.PageNo=1
      this.NoofRow=10;
      this.SearchText=SearchText;
      this.society.getAllSociety(this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
        if(data){
          this.getSocietyList = data;
          this.totalItems = data[0].totalcount
        }
      })
    }
    
  }
  
  keyPress(SearchText:any){
    if(this.SearchText==""){
      this.PageNo=1;
      this.NoofRow=this.totalItems;
      this.SearchText=SearchText;
      this.societyList(this.PageNo,this.NoofRow,this.SearchText);
    }
    else{
      this.PageNo=1
      this.NoofRow=10;
      this.SearchText=SearchText;
      this.society.getAllSociety(this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
        if(data){
          this.getSocietyList = data;
          this.totalItems = data[0].totalcount
        }
      })
    }
  }

  goBack() {
    this.location.back();
  }

  async deleteSociety(id:any) {
    const alert = await this.alertController.create({
      header: ' Delete Society ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this Society',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'no',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Delete',
          cssClass: 'yes',
          handler: () => {
            this.society.deleteSociety(id).subscribe(data=>{
              this.ionViewWillEnter();
              
              this.toast.presentToast("Society deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }

  exportExcel():void {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = ''
    this.loader.showLoading();
    this.society.getAllSociety(this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.getSocietyList = data;
        this.totalItems = data[0].totalcount;
        this.excel.exportAsExcelFile(this.getSocietyList, 'Society');
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
    
  }

  exportToCSV() {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = ''
    this.loader.showLoading();
    this.society.getAllSociety(this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.getSocietyList = data;
        this.totalItems = data[0].totalcount;
        this.csv.exportToCsv(this.getSocietyList, 'Society');
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
    
  }

}
