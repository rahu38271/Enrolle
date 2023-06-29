import { Component, OnInit } from '@angular/core';
import {AlertController, ToastController, LoadingController } from '@ionic/angular';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-general-enquiry',
  templateUrl: './general-enquiry.component.html',
  styleUrls: ['./general-enquiry.component.css']
})
export class GeneralEnquiryComponent implements OnInit {

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

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
        return true
    }
    else {
        return false
    }
}

  UserId:any;
  RoleId:any;
  SearchText:any;
  NoofRow:any=5;
  PageNo:any=1;
  enquiryList:any;
  totalItems:any;
  workList:any;
  areaList:any;
  formsList:any;
  complaintList:any;
  searchEnqList:any;
  isE=true;
  isShowEnq=false;
  searchModal:any={
    TypeofWork:'',
    FullName:'',
    MobileNo:'',
    Society_BuildingName:'',
    Area:'',
    AaddharCardNumber:'',
    Reference:'',
    TypeofForm:'',
    TypeofComplaints:'',
    PersonEnteringData:'',
    UserId:'',
    RoleId:'',
    PageNo:'',
    NoofRow:''
  }

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController, 
    public alertController: AlertController,
    private enquiry:EnquiryService,
    private toast:IonicToastService,
    private router:Router,
    private loader:LoaderService,
    private excel:ExcelService,
    private csv:CsvService
  ) { }

  ngOnInit(): void {
    this.UserId = localStorage.getItem('loginId');
    this.RoleId = localStorage.getItem('userType');
    if(this.SearchText == undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
  }

  selectedWork(event){
    //this.enquiryModal.TypeofWork = event.target.value;
  }

  ionViewWillEnter(){
    this.getAllWork();
    this.getAllArea();
    this.getAllForms();
    this.getAllComplaint();
    this.allEnquiry(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText);
  }

  event(event){
    this.PageNo=event;
    this.allEnquiry(this.UserId,this.RoleId,event,this.NoofRow,this.SearchText);
  }

  event1(event:any){
    this.PageNo = event;
    this.searchData();
  }

  onSearchChange(SearchText:any){
    if(this.SearchText==''){
      this.PageNo=1;
      this.NoofRow=this.totalItems;
      this.SearchText=SearchText;
      this.allEnquiry(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText);
    }
    else{
      this.PageNo=1;
      this.NoofRow=10;
      this.SearchText=SearchText;
      this.enquiry.getAllEnquiry(this.UserId,this.RoleId,this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
        if(data){
          this.enquiryList = data;
          this.totalItems = data[0].totalCount;
          this.enquiryList.forEach(e => {
            e.birthDate = e.birthDate.split('T')[0];
            e.anniversary = e.anniversary.split('T')[0];
          });
        }
        else{
  
        }
      });
    }
  }

  keyPress(SearchText:any){
    if(this.SearchText==''){
      this.PageNo=1;
      this.NoofRow=this.totalItems;
      this.SearchText=SearchText;
      this.allEnquiry(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText);
    }
    else{
      this.PageNo=1;
      this.NoofRow=10;
      this.SearchText=SearchText;
      this.enquiry.getAllEnquiry(this.UserId,this.RoleId,this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
        if(data){
          this.enquiryList = data;
          this.totalItems = data[0].totalCount;
          this.enquiryList.forEach(e => {
            e.birthDate = e.birthDate.split('T')[0];
            e.anniversary = e.anniversary.split('T')[0];
          });
        }
        else{
  
        }
      });
    }
  }

  allEnquiry(UserId:any,RoleId:any,PageNo:any,NoofRow:any,SearchText:any){
    this.enquiry.getAllEnquiry(UserId,RoleId,PageNo,NoofRow,SearchText).subscribe(data=>{
      if(data){
        this.enquiryList = data;
        this.totalItems = data[0].totalCount;
        this.enquiryList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
          e.anniversary = e.anniversary.split('T')[0];
        });
      }
      else{

      }
    },(err)=>{

    })
  }

  searchData(){
    this.loader.showLoading();
    this.isE=false;
    this.isShowEnq=true;
    this.PageNo=1;
    //this.NoofRow=5;
    this.searchModal.UserId=Number(this.UserId);
    this.searchModal.RoleId=Number(this.RoleId);
    if(this.searchModal.TypeofWork==''){
      this.searchModal.TypeofWork=null
    }
    else{
      this.searchModal.TypeofWork = this.searchModal.TypeofWork
    }
    if(this.searchModal.FullName==''){
      this.searchModal.FullName =null
    }
    else{
      this.searchModal.FullName = this.searchModal.FullName
    }
    if(this.searchModal.MobileNo == ''){
      this.searchModal.MobileNo =null
    }
    else{
      this.searchModal.MobileNo = this.searchModal.MobileNo
    }
    if(this.searchModal.Society_BuildingName == ''){
      this.searchModal.Society_BuildingName =null
    }
    else{
      this.searchModal.Society_BuildingName = this.searchModal.Society_BuildingName
    }
    if(this.searchModal.Area == ''){
      this.searchModal.Area =null
    }
    else{
      this.searchModal.Area = this.searchModal.Area
    }
    if(this.searchModal.AaddharCardNumber == ''){
      this.searchModal.AaddharCardNumber =null
    }
    else{
      this.searchModal.AaddharCardNumber = this.searchModal.AaddharCardNumber
    }
    if(this.searchModal.Reference == ''){
      this.searchModal.Reference =null
    }
    else{
      this.searchModal.Reference = this.searchModal.Reference
    }
    if(this.searchModal.TypeofForm == ''){
      this.searchModal.TypeofForm =null
    }
    else{
      this.searchModal.TypeofForm = this.searchModal.TypeofForm
    }
    if(this.searchModal.TypeofComplaints == ''){
      this.searchModal.TypeofComplaints =null
    }
    else{
      this.searchModal.TypeofComplaints = this.searchModal.TypeofComplaints
    }
    if(this.searchModal.PersonEnteringData == ''){
      this.searchModal.PersonEnteringData =null
    }
    else{
      this.searchModal.PersonEnteringData = this.searchModal.PersonEnteringData
    }
    this.searchModal.PageNo=this.PageNo;
    this.searchModal.NoofRow=this.NoofRow;
    this.enquiry.searchEnquiry(this.searchModal).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.searchEnqList = data;
        this.totalItems = data[0].totalCount;
        this.toast.presentToast("Searched successfully!", "success", 'checkmark-circle-sharp');
        this.searchEnqList.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  editEnq(data:any){
    this.router.navigateByUrl('/general-enquiry/edit-enquiry',{state:data})
  }

  getAllWork(){
    this.enquiry.getWork().subscribe(data=>{
      this.workList = data;
    },(err)=>{

    })
  }

  getAllArea(){
    this.enquiry.getArea().subscribe(data=>{
      this.areaList = data;
    })
  }

  getAllForms(){
    this.enquiry.getForms().subscribe(data=>{
      this.formsList = data
    })
  }

  getAllComplaint(){
    this.enquiry.getComplaints().subscribe(data=>{
      this.complaintList = data
    },(err)=>{

    })
  }


  async deleteEnq(id:any) {
    const alert = await this.alertController.create({
      header: 'Delete enquiry',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this enquiry',
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
            this.loader.showLoading();
            this.enquiry.deleteEnq(id).subscribe(data=>{
              this.loader.hideLoader();
              this.ionViewWillEnter();
              this.toast.presentToast("Enquiry deleted Succesfully!", "success", 'checkmark-circle-sharp');
            },(err)=>{
              this.loader.hideLoader();
            })
          }
        }
      ],
    });

    await alert.present();
  }

  exportExcel():void {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.enquiry.getAllEnquiry(this.UserId,this.RoleId,this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
      if(data!= 0){
        this.loader.hideLoader();
        this.enquiryList = data;
        this.totalItems = data[0].totalCount;
        
        this.excel.exportAsExcelFile(this.enquiryList, 'Enquiry');
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

  searchedExcel():void {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.enquiry.getAllEnquiry(this.UserId,this.RoleId,this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
      if(data!= 0){
        this.loader.hideLoader();
        this.searchEnqList = data;
        this.totalItems = data[0].totalCount;
        
        this.excel.exportAsExcelFile(this.searchEnqList, 'Enquiry');
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

  exportToCSV() {
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.enquiry.getAllEnquiry(this.UserId,this.RoleId,this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
      if(data!= 0){
        this.loader.hideLoader();
        this.enquiryList = data;
        this.totalItems = data[0].totalCount;
        
        this.csv.exportToCsv(this.enquiryList, 'Enquiry');
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

  searchedToCSV(){
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.enquiry.getAllEnquiry(this.UserId,this.RoleId,this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
      if(data!= 0){
        this.loader.hideLoader();
        this.searchEnqList = data;
        this.totalItems = data[0].totalCount;
        
        this.csv.exportToCsv(this.searchEnqList, 'Enquiry');
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

}
