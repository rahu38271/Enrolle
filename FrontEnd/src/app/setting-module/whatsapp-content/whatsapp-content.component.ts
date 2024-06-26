import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { PrintService } from 'src/app/services/print.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-whatsapp-content',
  templateUrl: './whatsapp-content.component.html',
  styleUrls: ['./whatsapp-content.component.css']
})
export class WhatsappContentComponent implements OnInit {

  userId:any;
  WhatUpContent:any={};
  file:any;
  imgurl:any;
  whatsText:any;
  msgText:any;


  constructor(
    private setting:SettingService,
    private toast:IonicToastService,
    private router:Router,
    private loader:LoaderService,
    private printService:PrintService,
    private translateConfigService: TranslateConfigService,
    public translate: TranslateService,
    public modalCtrl: ModalController 
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    
  }

  ionViewWillEnter(){
    this.setting.getWhatsappImage(this.userId).subscribe(data=>{
      if(data){
        this.saveFile(data);
        this.fetchImage(data);
        this.imgurl = true;
      }
    })
    this.setting.getWhatsappText(this.userId).subscribe(data=>{
      if(data){
        this.whatsText = data;
        this.msgText = data[0].messageContent;
      }
      else{

      }
    },(err)=>{

    })
  }

  onFileSelected(event){
    const file:File = event.target.files[0];
    this.file=file;
  }

  saveFile(imageData: Blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(imageData);
    
  }

  // to download image from get api
  fetchImage(image:Blob){
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imgurl = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

  addSlipContent(){
    this.loader.showLoading();
    this.WhatUpContent.userId=Number(this.userId);
    this.WhatUpContent.FileName=this.file.name;
    this.WhatUpContent.FilePath='https://matadarmaza.com/api/Image/WhatAppImage';
    this.WhatUpContent=JSON.stringify(this.WhatUpContent);
    this.setting.addSlipMessage(this.WhatUpContent,this.file).subscribe(data=>{
      if(data){
        console.log(data);
        this.loader.hideLoader();
        this.toast.presentToast("Content added successfully!", "success", 'checkmark-circle-sharp');
        this.ionViewWillEnter();
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Content not added", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("Something went wrong", "danger", 'alert-circle-sharp');
    })
  }


 

}
