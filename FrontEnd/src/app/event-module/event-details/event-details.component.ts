import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import html2pdf from 'html2pdf.js'
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { th } from 'date-fns/locale';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {

  myForm1: any;
  Bdate = '';
  area = '';
  Bgroup = '';
  mobile = '';
  date = '';
  date1 = '';
  User = '';
  purpose = '';
  place = '';
  progDate = '';
  Time = '';
  program = '';

  eventModel: any = {};

  content: string;

  

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

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
 
  constructor(public alertController: AlertController,public loadingController: LoadingController,public toastController: ToastController, private pdfGenerator: PDFGenerator) {
    
   }

   

  resetForm1(){
    this.myForm1.reset();
  }

  ngOnInit() { 
    
  }

  onSubmit(detailsForm:NgForm){
    if(this.eventModel.invalid){
      return;
    }
    detailsForm.resetForm();
  }
 

  async deleteEvent() {
    const alert = await this.alertController.create({
      header: 'Delete Event ?',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this Event',
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
            console.log('Confirm Ok');
          }
        }
      ],
    });

    await alert.present();
  }


  pdf() {
    var element = document.getElementById('eventDetails');
    
    var opt = {
      margin: 0.4,
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

  downloadPDF(){
    this.content = document.getElementById('eventDetails1').innerHTML;
    let options = {
      documentSize: 'A4',
      type: 'share',
      // landscape: 'portrait',
      fileName: 'Event.pdf'
    };
    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        console.log('OK', base64);
      }).catch((error) => {
        console.log('error', error);
      });
  }

  expandInput(){
    
  }

}
