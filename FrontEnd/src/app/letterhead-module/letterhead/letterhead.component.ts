import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import html2pdf from 'html2pdf.js'
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-letterhead',
  templateUrl: './letterhead.component.html',
  styleUrls: ['./letterhead.component.scss'],
})
export class LetterheadComponent implements OnInit {

  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  myForm1: any;
  Bdate = '';
  area = '';
  Bgroup = '';
  mobile = '';

  letterModel: any = {};

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
 
  @ViewChild('autofocus', { static: false }) input: IonInput;

  constructor(public alertController: AlertController,public loadingController: LoadingController,public toastController: ToastController) { }

  resetForm(){
    this.myForm1.reset();
  }

  ionViewWillEnter() {
    setTimeout(() => this.input.setFocus(), 300);
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25)+"px";
  }

  ngOnInit() { 
    
  }

  onSubmit(){
    if(this.letterModel.invalid){
      return;
    }
  }
 



  pdf() {
    var element = document.getElementById('table6');
    
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
