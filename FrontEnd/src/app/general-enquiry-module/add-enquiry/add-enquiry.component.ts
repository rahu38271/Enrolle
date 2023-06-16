import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-enquiry',
  templateUrl: './add-enquiry.component.html',
  styleUrls: ['./add-enquiry.component.css']
})
export class AddEnquiryComponent implements OnInit {

  maxDate:String = new Date().toISOString();
  //minDate:number = new Date().getFullYear();
  workList:any;
  complaintList:any;
  formsList:any;
  areaList:any;
  workModal:any={};
  areaModal:any={};
  formsModal:any={};
  complaintModal:any={};
  enquiryModal:any={};
  UserId:any;
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

omit_special_char(event) {
  var k;
  k = event.charCode;  //         k = event.keyCode;  (Both can be used)
  return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
}

selectedWork(event){
  this.enquiryModal.TypeofWork = event.target.value;
  console.log(this.enquiryModal.TypeofWork);
}

  year:number = new Date().getFullYear();

  constructor(
    public popoverController: PopoverController,
    private enquiry:EnquiryService,
    private loader:LoaderService,
    private toast:IonicToastService,
    private router:Router
  ) { 
    
  }

  ngOnInit(): void {
    
  }

  ionViewWillEnter(){
    this.UserId= localStorage.getItem('loginId')
    this.getAllWork();
    this.getAllComplaint();
    this.getAllForms();
    this.getAllArea();
  }

  async DismissClick() {
    await this.popoverController.dismiss();
  }

  getAllWork(){
    this.enquiry.getWork().subscribe(data=>{
      this.workList = data;
    },(err)=>{

    })
  }

  getAllComplaint(){
    this.enquiry.getComplaints().subscribe(data=>{
      this.complaintList = data
    },(err)=>{

    })
  }

  getAllForms(){
    this.enquiry.getForms().subscribe(data=>{
      this.formsList = data
    })
  }

  getAllArea(){
    this.enquiry.getArea().subscribe(data=>{
      this.areaList = data;
    })
  }

  // add work type here
  addWork(){
    this.loader.showLoading();
    this.enquiry.addSingleWork(this.workModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.workModal={};
        this.ionViewWillEnter();
        this.toast.presentToast("Type of work added successfully!", "success", 'checkmark-circle-sharp');
        
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Type of work added not added", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("Type of work not added", "danger", 'alert-circle-sharp');
    })
  }

  //add area here
  addArea(){
    this.loader.showLoading();
    this.enquiry.addSingleArea(this.areaModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.areaModal={};
        this.ionViewWillEnter();
        this.toast.presentToast("Area added successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Area not added", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("Area not added", "danger", 'alert-circle-sharp');
    })
  }

  //add type of form here
  addForm(){
    this.loader.showLoading();
    this.enquiry.addSingleform(this.formsModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.formsModal={};
        this.ionViewWillEnter();
        this.toast.presentToast("Type of form added successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Type of form not added", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("Type of form not added", "danger", 'alert-circle-sharp');
    })
  }

  //add complaint
  addComplaint(){
    this.loader.showLoading();
    this.enquiry.addSingleComplaint(this.complaintModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.complaintModal={};
        this.ionViewWillEnter();
        this.toast.presentToast("Complaint added successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Complaint not added", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("Complaint not added", "danger", 'alert-circle-sharp');
    })
  }

  //add enquiry
  addEnquiry(){
    this.loader.showLoading();
    this.enquiryModal.UserId = Number(this.UserId);
    this.enquiry.addSingleEnquiry(this.enquiryModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.enquiryModal = {};
        this.toast.presentToast("Enquiry added successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/general-enquiry']);
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Enquiry not saved", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("Enquiry not saved", "danger", 'alert-circle-sharp');
    })
  }

}
