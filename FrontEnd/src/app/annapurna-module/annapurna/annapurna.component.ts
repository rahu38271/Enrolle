import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { AnnapurnaService } from 'src/app/services/annapurna.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router, NavigationEnd } from '@angular/router';
import { IonicToastService }  from 'src/app/services/ionic-toast.service'
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-annapurna',
  templateUrl: './annapurna.component.html',
  styleUrls: ['./annapurna.component.css']
})
export class AnnapurnaComponent implements OnInit {
  
  isModalOpen = false;
  familyModalList = false;

  year : number = new Date().getFullYear();
  searchWeb:string;
  myForm1: any;
  FamilyModal:any={}
  annapurnaFamilyData:any;
  getAnnapurna: any;
  familyData:any;
  id:any;
  Fid:any;
  anpid:any;
  anpId:any;
  anpID:any;
  checked:boolean = false;
  fullName:string;
  contactNo:string;
  altContactNo:string;
  address:string;
  checkedFamily:string[]=[];
  changedFamily:any;
  remFamModal={};
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
      return true
    }
    else {
      return false
    }
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  
  constructor(
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private loader: LoaderService,
    public toast: IonicToastService,
    private annapurna:AnnapurnaService,
    private router:Router,
    private excel:ExcelService,
    private csv:CsvService
    ) { }

    ngOnInit() {
      
    }

    ionViewWillEnter(){
      this.annapurnaList();
        this.familyList();
    }

    family(event){
      this.isModalOpen = true;
      this.anpId = Number(event.target.id)
    }

    seeFamily(event){
      this.familyModalList = true;
      this.anpId = Number(event.target.id);
      this.familyList();
    }

    changeFamily(item:any){
     if(item.checked){
      this.checkedFamily.push(item);
     }
    }

    newFamily(){
      debugger;
      this.remFamModal = this.checkedFamily;
      this.annapurna.removeFamily(this.remFamModal).subscribe(data=>{
        if(data==1){
          this.remFamModal={};
          this.familyModalList = false;
          this.annapurnaList();
          this.toast.presentToast("Created new family successfully!", "success", 'checkmark-circle-sharp');
        }
        else{
          this.familyModalList = true;
          this.toast.presentToast("Select family member", "danger", 'alert-circle-sharp');
        }
      })
    }

    closeFamily(){
      this.isModalOpen = false;
    }

    closeFamilyList(){
      this.familyModalList = false;
    }

   
  annapurnaList(){
    //this.loader.showLoading();
    this.annapurna.getAnnapurnaList().subscribe(data=>{
      if(data != 0){
        //this.loader.hideLoader();
        this.getAnnapurna = data
        this.anpID = data[0].id;
        
        if(this.getAnnapurna.cardDone == "Y"){
          this.checked = true;
        }
        else{
          this.checked = false;
        }
        this.getAnnapurna.forEach(e => {
          if(e.tokenDate==null){
            e.tokenDate = ''
          }
          else{
            e.tokenDate = e.tokenDate.split('T')[0];
          }
        });
      }
      else{
        //this.loader.hideLoader();
      }
    },(err)=>{
      //this.loader.hideLoader();
    })
  }

  addFamily(){
    debugger;
    this.FamilyModal.ANPId = this.anpId;
    this.FamilyModal.ANPId = Number(this.FamilyModal.ANPId)
    this.annapurna.addAnnapurnaFamily(this.FamilyModal).subscribe(data=>{
      if(data){
        this.FamilyModal = {};
        this.isModalOpen = false;
        this.toast.presentToast("Family added successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.toast.presentToast("Family not saved", "danger", 'alert-circle-sharp');
      }
    },(err)=>{

    })
  }

  familyList(){
    this.anpid = this.anpId;
    this.annapurna.getFamilyList(this.anpid).subscribe(data=>{
      this.familyData = data;
    })
  }


  editAnnapurna(data:any){
    this.router.navigateByUrl('/annapurna/edit-annapurna', {state:data})
  }

  resetForm(){
    this.myForm1.reset();
  }

  async deleteAnp(id:any) {
    const alert = await this.alertController.create({
      header: 'Delete Annapurna',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this Annapurna',
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
            this.annapurna.deleteAnnapurna(id).subscribe(data=>{
              this.ionViewWillEnter();
              this.toast.presentToast("Annapurna deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }


  exportExcel():void {
    this.excel.exportAsExcelFile(this.getAnnapurna, 'Annapurna');
  }

  exportToCSV() {
    this.csv.exportToCsv(this.getAnnapurna, 'Annapurna');
  }

  pdf() {
    var element = document.getElementById('table13');
    
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
