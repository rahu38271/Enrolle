import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { LetterService } from 'src/app/services/letter.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-letter',
  templateUrl: './edit-letter.component.html',
  styleUrls: ['./edit-letter.component.css']
})
export class EditLetterComponent implements OnInit {

  @ViewChild('file', { static: false }) fileInput: ElementRef; //declaration
  progress = 0;
  uploading=false;
  districtList: any;
  talukaList: any;
  letter:any={};
  district:any;
  allOffice:any;
  allDept:any;
  file:any;
  fileSize:any;
  fileType:any;
  fileName:any;
  selectedFile: any;
  year:number=new Date().getFullYear();
  maxDate:String=new Date().toISOString();
  constructor(
    public contact: ContactService,
    private loader:LoaderService,
    private toast:IonicToastService,
    private letterService:LetterService,
    private router:Router,
    private route:ActivatedRoute
  ) {
    this.letter.fileName = this.letter.fileName;
    fetch(this.letter.fileName, { mode: 'no-cors' })
    .then(res => res.blob())
    .then(blob => {
      const data = new ClipboardEvent('').clipboardData || new DataTransfer();
      data.items.add(new File([blob], this.letter.fileName));
      this.fileInput.nativeElement.files = data.files;
      this.fileInput.nativeElement.value = data.files[0];
    });
    this.letterService.downloadLetter(this.letter.id).subscribe((data: Blob)=>{
      this.letter.file = data;
      const file: File = this.letter.file;
      this.file = file;
      this.fileSize = file.size;
      this.fileType = file.type;
      if (this.fileSize < 1000000) {
        this.fileSize = Math.round(this.fileSize / 1024).toFixed(2) + " KB";
      }
      else {
        this.fileSize = (this.fileSize / 1048576).toFixed(2) + " MB";
      }
    })
   }

  ngOnInit(): void {
    this.getDistrict();
    this.OfficeList();
    this.DeptList();
    
  }

  getDistrict() {
    this.letter =  this.router.getCurrentNavigation().extras.state;
    this.contact.getDistrictData().subscribe((data) => {
      if (data.length > 0) {
        //console.log(data);
        this.districtList = data;
      }
    }, (error) => {

    })
  }

  getTaluka(dId: any) {
    this.contact.getTalukaData(dId).subscribe((data) => {
      if (data.length > 0) {
        //console.log(data);
        this.letter.district = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    }, (error) => {

    })
  }

  OfficeList(){
    this.letterService.getAllOffice().subscribe(data=>{
      this.allOffice = data;
    })
  }

  DeptList(){
    this.letterService.getAllDept().subscribe(data=>{
      this.allDept = data;
    })
  }

  onFileSelected(event:any){
    const file: File = event.target.files[0];
    this.file = file;
    this.fileSize = file.size;
    this.fileType = file.type;
     
    if (this.fileSize >= 10000000) {
      this.toast.presentToast("Maximum file size is 10 MB", "danger", 'checkmark-circle-sharp');
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

  updateLetter(){
    debugger;
    this.letter.id = this.letter.id
    this.letter = JSON.stringify(this.letter);
    if (this.file == undefined) {
      this.file = ''
    }
    else {
      this.file = this.file;
    }
    this.loader.showLoading();
    this.letterService.addSingleLetter(this.letter,this.file).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.router.navigate(['/letter-tracking/all-letters']);
        this.toast.presentToast("Letter updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Letter not updated", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  
  

}
