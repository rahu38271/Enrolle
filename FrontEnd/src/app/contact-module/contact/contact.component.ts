import { Component, OnInit  } from '@angular/core';
import {AlertController, ToastController, LoadingController } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service'
import { Router, NavigationEnd } from '@angular/router';
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
  Cid:any;
  fileName= 'Contact.xlsx';
  PageNo:any=1;
  NoofRow:any=25; 
  SearchText:any;
  currentDate = new Date();
  birthDate: any;
  totalItems:any;
  imageUrl: string;
  
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

  ngOnInit() {
    debugger;
    if(this.SearchText == undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
  }

  ionViewWillEnter(){
    this.contactList(this.PageNo,this.NoofRow,this.SearchText);
  }

  EditContact(data:any) {
    this.router.navigateByUrl('/contact/edit-contact', { state: data });
  }
  search(){
    this.isShow = !this.isShow
  }
 
 
  event(event:any){
    this.PageNo = event;
    this.contactList(event,this.NoofRow,this.SearchText)
  }  

  contactList(PageNo:any,NoofRow:any,SearchText:any){
    debugger;
    this.contact.getContacts(PageNo,NoofRow,SearchText).subscribe(data=>{
      if(data.length != 0){
        console.log(data);
        this.getContacts = data;
        this.totalItems = data[0].totalCount;
        
        this.getContacts.forEach(e => {
          if(e.birthDate==null){
            e.birthDate=""
          }else{
            e.birthDate = e.birthDate.split('T')[0];
          }
          e.birthDate = e.birthDate.split('T')[0] == '1900-01-01' ? '' : e.birthDate.split('T')[0]; 
          e.anniversary = e.anniversary.split('T')[0] == '1900-01-01' ? '' : e.anniversary.split('T')[0]; 
        });

      }
      else{
        //this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
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
              this.ionViewWillEnter();
              this.toast.presentToast("Contact deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }

  onSearchChange(SearchText:any){
    if(this.SearchText==''){
      this.PageNo=1;
      this.NoofRow=this.totalItems;
      this.SearchText=SearchText;
      this.contactList(this.PageNo,this.NoofRow,SearchText);
    }
    else{
      this.PageNo=1;
      this.NoofRow=10;
      this.SearchText=SearchText;
      this.contact.getContacts(this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
        if(data){
          this.getContacts = data;
          this.totalItems = data[0].totalCount;
          this.getContacts.forEach(e => {
            e.birthDate = e.birthDate.split('T')[0] == '1900-01-01' ? '' : e.birthDate.split('T')[0];
            e.anniversary = e.anniversary.split('T')[0] == '1900-01-01' ? '' : e.anniversary.split('T')[0]; 
          });
          
        }
      });
    }
  }

  keyPress(SearchText:any){
    if(this.SearchText==''){
      this.PageNo=1;
      this.NoofRow=this.totalItems;
      this.SearchText=SearchText;
      this.contactList(this.PageNo,this.NoofRow,this.SearchText);
    }
    else{
      this.PageNo=1;
      this.NoofRow=10;
      this.SearchText=SearchText;
      this.contact.getContacts(this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
        if(data){
          this.getContacts = data;
          this.totalItems = data[0].totalCount;
          this.getContacts.forEach(e => {
            e.birthDate = e.birthDate.split('T')[0] == '1900-01-01' ? '' : e.birthDate.split('T')[0];
            e.anniversary = e.anniversary.split('T')[0] == '1900-01-01' ? '' : e.anniversary.split('T')[0]; 
          });
          
        }
      });
    }
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  exportExcel():void {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.contact.getContacts(this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.getContacts = data;
        this.totalItems = data[0].totalCount;
        this.getContacts.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0] == '1900-01-01' ? '' : e.birthDate.split('T')[0];
          e.anniversary = e.anniversary.split('T')[0] == '1900-01-01' ? '' : e.anniversary.split('T')[0]; 
          delete e.totalCount;
          delete e.loginUserId;
        });
        this.excel.exportAsExcelFile(this.getContacts, 'contact');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  // exportToCSV() {
  //   this.PageNo=1;
  //   this.NoofRow=this.totalItems;
  //   var SearchText = "";
  //   this.loader.showLoading();
  //   this.contact.getContacts(this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
  //     if(data.length != 0){
  //       this.loader.hideLoader();
  //       this.getContacts = data;
  //       this.totalItems = data[0].totalCount;
  //       this.getContacts.forEach(e => {
  //         e.birthDate = e.birthDate.split('T')[0] == '1900-01-01' ? '' : e.birthDate.split('T')[0];
  //         e.anniversary = e.anniversary.split('T')[0] == '1900-01-01' ? '' : e.anniversary.split('T')[0]; 
  //         delete e.totalCount;
  //         delete e.loginUserId;
  //         delete e.id;
  //       });
  //       this.csv.exportToCsv(this.getContacts, 'contact');
  //       this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
  //     }
  //     else{
  //       this.loader.hideLoader();
  //       this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
  //     }
  //   },(err)=>{
  //     this.loader.hideLoader();
  //   })
  // }


  exportToCSV(){
    this.loader.showLoading();
    this.contact.getContactsFile().subscribe((data:Blob)=>{
      if(data){
        this.loader.hideLoader();
        this.getContacts.forEach(e => {
          if(e.birthDate=="1900-01-01"){
            e.birthDate = null
          }else{
            e.birthDate = e.birthDate
          } 
        });
        this.saveFile(data);
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  saveFile(imageData: Blob) {
    const blob = new Blob([imageData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    // link.download = '';
    link.download = 'contacts.csv';
    link.click();
  }

   // to download image from get api
   fetchImage(image:Blob){
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(image);
  }


}


