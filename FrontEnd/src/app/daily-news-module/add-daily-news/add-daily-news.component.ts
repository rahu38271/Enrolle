import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-daily-news',
  templateUrl: './add-daily-news.component.html',
  styleUrls: ['./add-daily-news.component.scss'],
})
export class AddDailyNewsComponent implements OnInit {
  progress = 0;
  uploading=false;
  dailynews:any={ }
  file:any;
  currentDatetime: string;
 year : number = new Date().getFullYear();

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

onKeyPress(event) {
  if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
      return true
  }
  else {
      return false
  }
}

  myForm;
  
  subject = '';
  link = '';
  reporter = '';
  modeType = '';
  mode = '';
  adminId:any;
  UserId:any;
  roleID:any;
  superAdminId:any;
  Medium:any;
  fileSize:any;
  fileType:any;
  fileName:any;
  disabled: boolean = true;

  constructor(
    private news:NewsService,
    private toast:IonicToastService,
    private loader:LoaderService,
    private router:Router,
    public datepipe: DatePipe
  ) {
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    this.currentDatetime = currentDateTime;
   }

  ngOnInit() {
    this.UserId = localStorage.getItem("loginId");
    this.adminId = localStorage.getItem("adminId");
  }

  resetForm(){
    this.myForm.reset();
  }

  type(event){
    this.Medium = event.target.value;
  }

  onFileSelected(event:any){
    const file: File = event.target.files[0];
    this.file = file;
    this.fileSize = file.size;
    this.fileType = file.type;
    this.fileName = file.name +'-'+ this.currentDatetime;;
     
    if (this.fileSize >= 10000000) {
      this.toast.presentToast("Maximum file size is 10 MB", "danger", 'checkmark-circle-sharp');
      this.disabled = true;
    }
    else if(
      this.fileType == "image/jpg" ||
      this.fileType == "image/jpeg" ||
      this.fileType == "image/png" ||
      this.fileType == "video/mp4" ||
      this.fileType == "video/3gp" ||
      this.fileType == "video/mkv" ||
      this.fileType == "video/webm" ||
      this.fileType == "video/flv" ||
      this.fileType == "video/mov" ||
      this.fileType == "application/pdf" &&
      this.fileSize < 10000000
    ){
      this.uploading=true;
    //Simulate file upload progress (for demonstration purposes)
    const interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        clearInterval(interval);
        this.progress = 100;
        this.uploading=false;
        this.toast.presentToast("File added successfully!", "success", 'checkmark-circle-sharp');
      }
    }, 100);
    }
   
    else {
      this.disabled = true;
      this.toast.presentToast("This file format is not allowed.", "danger", 'alert-circle-sharp');
    }
    if (this.fileSize < 1000000) {
      this.fileSize = Math.round(this.fileSize / 1024).toFixed(2) + " KB";
    }
    else {
      this.fileSize = (this.fileSize / 1048576).toFixed(2) + " MB";
      console.log(this.fileSize)
    }
  }

  addNews(){
    debugger;
    this.loader.showLoading();
    this.dailynews.Userid=Number(this.UserId);
    this.dailynews.adminId = Number(this.UserId);
    this.dailynews=JSON.stringify(this.dailynews);
    if(this.file==undefined){
      this.file = ''
    }
    else{
      this.file = this.file;
    }
    this.news.addSingleNews(this.file,this.dailynews).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.dailynews={};
        this.router.navigate(['/daily-news'])
        this.toast.presentToast("News added successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("News not saved", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }
}
