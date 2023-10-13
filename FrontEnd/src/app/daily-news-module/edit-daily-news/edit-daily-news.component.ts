import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-daily-news',
  templateUrl: './edit-daily-news.component.html',
  styleUrls: ['./edit-daily-news.component.scss'],
})
export class EditDailyNewsComponent implements OnInit {
  progress = 0;
  uploading=false;
  dailynews:any={ }
  file:any;
  @ViewChild('file', { static : false}) fileInput : ElementRef; //declaration

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
  date:any;
  medium:any;
  fileSize:any;
  fileType:any;
  disabled: boolean = true;
  selectedFile:any;

  constructor(
    private news:NewsService,
    private toast:IonicToastService,
    private loader:LoaderService,
    private router:Router
  ) { 
    this.dailynews.fileName = this.dailynews.fileName;
    this.dailynews = this.router.getCurrentNavigation().extras.state;
    fetch(this.dailynews.fileName, { mode: 'no-cors'})
      .then(res => res.blob())
      .then(blob => {
        const data = new ClipboardEvent('').clipboardData || new DataTransfer();
        data.items.add(new File([blob], this.dailynews.fileName));
        this.fileInput.nativeElement.files = data.files;
        this.fileInput.nativeElement.value = data.files[0];
    });

    this.news.getFile(this.dailynews.id).subscribe((data : Blob) => {
      this.dailynews.file=data;
      this.fileSize = data.size;
      this.selectedFile = data;
      this.selectedFile = this.selectedFile;
      this.fileSize = this.selectedFile.size;
      this.fileType = this.selectedFile.type;
      this.dailynews.fileName = this.dailynews.fileName
      if(data.size != 0){
        if(this.fileSize < 1000000){
          this.fileSize = Math.round(this.fileSize/1024).toFixed(2) + " KB";
        }
        else{
          this.fileSize = (this.fileSize / 1048576).toFixed(2) + " MB";
        }
      }
    })
  }

  saveFile(imageData: Blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(imageData);
    // link.download = 'image.jpg';
    link.download = '';
    link.click();
  }

  ngOnInit() {
    this.UserId = localStorage.getItem("loginId");
    this.adminId = localStorage.getItem("adminId");
  }

  resetForm(){
    this.myForm.reset();
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

  type(event){
    this.medium=event.target.value;
  }

  save(){
    debugger;
    this.loader.showLoading();
    this.dailynews.userid=Number(this.UserId);
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
        this.dailynews={}
        this.router.navigate(['/daily-news'])
        this.toast.presentToast("News updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("News not updated", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

}
