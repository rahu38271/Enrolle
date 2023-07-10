import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { VoterService } from 'src/app/services/voter.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  file:any;
  LandingPageImage:any={};
  userId:any;
  fileSize:any;
  fileType:any;
  disabled: boolean = true;
  isImage=true;
  isStatic=false;
  imageUrl:any;

  constructor(
    private setting:SettingService,
    private toast:IonicToastService,
    private router:Router,
    private loader:LoaderService,
    private voter:VoterService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loginId');
    this.userId = Number(this.userId);
    this.setting.getLandingImage(this.userId).subscribe((data: Blob) => {
      if(data.type != 'text/plain'){
        this.saveFile(data);
        this.fetchImage(data);
        this.isStatic=false;
        
      }
      else{
        this.isStatic=true;
      }
      
    })
  }

  onFileSelected(event:any){
    const file: File = event.target.files[0];
    this.file = file;
    this.fileSize = file.size;
    this.fileType = file.type;
    if (this.fileSize >= 10000000) {
      this.toast.presentToast("Maximum file size is 10 MB", "danger", 'checkmark-circle-sharp');
      this.disabled = true;
    }
    else {
      this.toast.presentToast("File added successfully!", "success", 'checkmark-circle-sharp');
    }
    //this.fileSize = this.fileSize + Math.round(this.fileSize/1024).toFixed(2) + " KB";
    if (this.fileSize < 1000000) {
      this.fileSize = Math.round(this.fileSize / 1024).toFixed(2) + " KB";
    }
    else {
      this.fileSize = (this.fileSize / 1048576).toFixed(2) + " MB";
      console.log(this.fileSize)
    }
    if (
      this.fileType == "image/jpg" ||
      this.fileType == "image/jpeg" ||
      this.fileType == "image/png" 
    ) {
      this.fileType = this.fileType;
      this.fileSize = this.fileSize;
      this.disabled = false;
    }
    else {
      this.disabled = true;
      this.toast.presentToast("This file format is not allowed.", "danger", 'alert-circle-sharp');
    }
  }

  saveFile(imageData: Blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(imageData);
    
  }

  // to download image from get api
  fetchImage(image:Blob){
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

  addLanding(){
    this.loader.showLoading();
    //this.file=this.file;
    this.LandingPageImage.UserId = Number(this.userId);
    this.LandingPageImage.ImageName = this.file.name;
    this.LandingPageImage.ImagePath = 'http://45.249.108.42:8013/api/Image/LandingPage';
    //this.LandingPageImage.ImagePath = 'https://eaapi.test.obicas.in/api/Image/LandingPage';
    this.LandingPageImage=JSON.stringify(this.LandingPageImage);
    this.setting.addLandingImage(this.LandingPageImage,this.file).subscribe((data)=>{
      if(data==1){
        console.log(data);
        this.loader.hideLoader();
        this.LandingPageImage={};
        this.toast.presentToast("Landing image added successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/image']);
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Landing image not added", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      //this.toast.presentToast("Something went wrong", "danger", 'alert-circle-sharp');
    })
  }

}
