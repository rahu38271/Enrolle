import { Component, OnInit,   } from '@angular/core';
import {AlertController, ToastController, LoadingController } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service'
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  Template = '';
  Content = '';
  NormalMsg = '';
  whatsappMsg = '';
  isShow = false;
  getContacts:any;
  searchMob: string;
  searchWeb: string;
  
  Cid:any;
  fileName= 'Contact.xlsx';
  PageNo:any=1;
  NoofRow:any=25; 
  SearchText:any;

  currentDate = new Date();
  birthDate: any;
  
  constructor
  (
    public toastController: ToastController,
    public loadingController: LoadingController, 
    public alertController: AlertController,
    private contact:ContactService, 
    private router:Router, 
    private loader:LoaderService, 
    private toast:IonicToastService, 
    private excel:ExcelService,
    private csv:CsvService
  ) { 
    
  }

  
  EditContact(data:any) {
    this.router.navigateByUrl('/contact/edit-contact', { state: data });
  }
  search(){
    this.isShow = !this.isShow
  }
 

  ngOnInit() {
    if(this.SearchText == undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.contactList(this.PageNo,this.NoofRow,this.SearchText);
    })
  }

  event(event:any){
    this.PageNo = event;
    this.contactList(event,this.NoofRow,this.SearchText)
  }  

  contactList(PageNo:any,NoofRow:any,SearchText:any){
    this.contact.getContacts(PageNo,NoofRow,SearchText).subscribe(data=>{
      if(data != 0){
        this.getContacts = data;
        this.getContacts.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0] == '1900-01-01' ? '' : e.birthDate.split('T')[0];
          e.anniversary = e.anniversary.split('T')[0] == '1900-01-01' ? '' : e.anniversary.split('T')[0]; 
        });
      }
      else{
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    }, (err)=>{
      //this.toast.presentToast("Something went wrong !", "danger", 'alert-circle-outline');
    });
  }

  async deleteCon(id:any) {
    const alert = await this.alertController.create({
      header: 'Delete Contact',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this Contact',
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
            this.contact.deleteContact(id).subscribe(data=>{
              this.router.events.pipe(
                filter(event => event instanceof NavigationEnd)
              ).subscribe(() => {
                this.contactList(this.PageNo,this.NoofRow,this.SearchText);
              })
              this.toast.presentToast("Contact deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }

  exportExcel():void {
    debugger;
    this.getContacts.forEach(e => {
      e.birthDate = e.birthDate.split('T')[0]; 
      e.anniversary = e.anniversary.split('T')[0] == '1900-01-01' ? '': e.anniversary.split('T')[0];
    });
    this.excel.exportAsExcelFile(this.getContacts, 'contact');
  }

  exportToCSV() {
    this.getContacts.forEach(e =>{
      e.birthDate = e.birthDate.split('T')[0];
      e.anniversary = e.anniversary.split('T')[0] == '1900-01-01' ? '': e.anniversary.split('T')[0];
    })
    this.csv.exportToCsv(this.getContacts, 'contact');
  }

  // async downloadExcel() {
  //   const toast = await this.toastController.create({
  //     message: 'Request added to export.',
  //     duration: 2000,
  //     position: 'top',
  //     color: 'success',
  //   });
  //   toast.present();
  // }

  // async downloadPDF() {
  //   const toast = await this.toastController.create({
  //     message: 'Request added to download doc.',
  //     duration: 2000,
  //     position: 'top',
  //     color: 'primary',
  //   });
  //   toast.present();
  // }

}


