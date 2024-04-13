import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ContactService } from 'src/app/services/contact.service';
import { VoterService } from 'src/app/services/voter.service';
import { HttpClient } from '@angular/common/http';
import * as  XLSX from 'xlsx';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  file: any;
  excel = [];
  obj: any = {};
  arraylist: any;
  excelUploadedData: any = [];
  modal: any;
  f;
  disabled:boolean= true;
  myForm: any;
  UserId: any;
  RoleId: any;


  constructor(
    private router:Router, 
    public loadingController: LoadingController, 
    private toast: IonicToastService, 
    private loader: LoaderService, 
    private contact: ContactService, 
    private http: HttpClient,
    private voter:VoterService
  ) {
    
   }

  ngOnInit(): void {
    this.UserId = localStorage.getItem("loginId");
    this.RoleId = localStorage.getItem("userType")
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.ReadExcelData();
      if (this.file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        {
          // this.myFileInput.nativeElement.value = '';
          // return this.alertify.error("This file format is not allowed.");
          this.toast.presentToast("This file format is not allowed.", "danger", 'alert-circle-sharp');
        }
        //this.ReadExcelData();
      }
    }
  }

  ReadExcelData() {
    debugger;
    var reader = new FileReader();
    var data = reader.result;
    reader.readAsBinaryString(this.file);
    reader.onload = (event) => {
      var data = reader.result;
      //var workbook = XLSX.read(data, { type: 'binary', cellDates: true });
      var workbook = XLSX.read(data, { type: 'binary' });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      //console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      this.arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      
      if (this.arraylist.length > 0) {
        // this.spinner.show(); 
        this.obj = (this.arraylist)[0];
        if (Object.keys(this.obj)[0] != "FullName" && (this.obj)[1] != "BirthDate" && (this.obj)[2] != "MobileNo" && (this.obj)[3] != "LocalAddress" && (this.obj)[4] != "PermanentAddress" && (this.obj)[5] != "AltMobileNo" && (this.obj)[6] != "Email") {
          this.toast.presentToast("Only provided template file is allowed. Please download the provided template only!", "danger", 'alert-circle-sharp')
          this.disabled = true;
        }
        else {
          this.disabled = false;
        }
      }
      else {
        this.toast.presentToast("List is Empty!", "danger", 'alert-circle-sharp')
        this.disabled = true; 
      }
      
      //arraylist = arraylist.map((u: any) => ({ value: u.vin }));
      if (this.arraylist.length > 0) {
        for (var i = 0; i < this.arraylist.length; i++) {
          if(this.arraylist[i].BirthDate != undefined){
            var rawdob = this.arraylist[i].BirthDate;
            var DB = new Date((rawdob - 25569) * 86400000);
            if(DB.toString() !== 'Invalid Date'){
              var Dob = DB.toISOString().replace(/.\d+Z$/g, "");
            }
            else{
              var Dob = '1900-01-01T00:00:00'
            }
            
          }
          else{
            var Dob = '1900-01-01T00:00:00'
          }

          

          //for birthdate if excel column is empty
          if (this.arraylist[i].BirthDate == undefined) {
            this.arraylist[i].BirthDate = '1900-01-01T00:00:00';
          }
          else {
            this.arraylist[i].BirthDate = Dob;
          }

          

          // for mobile number if excel column is empty
          if(this.arraylist[i].MobileNo == undefined){
            this.arraylist[i].MobileNo = '';
          }
          else{
            this.arraylist[i].MobileNo = this.arraylist[i].MobileNo.toString();
            var mobLength = this.arraylist[i].MobileNo.length;
            if(mobLength !== 10){
              this.arraylist[i].MobileNo = ''
            }
            else{
              this.arraylist[i].MobileNo = this.arraylist[i].MobileNo.toString();
            }
          }

          // for LocalAddress if excel column is empty
          if(this.arraylist[i].LocalAddress == undefined){
            this.arraylist[i].LocalAddress = '';
          }
          else{
            this.arraylist[i].LocalAddress = this.arraylist[i].LocalAddress;
          }

          // for PermanentAddress if excel column is empty
          if(this.arraylist[i].PermanentAddress == undefined){
            this.arraylist[i].PermanentAddress = '';
          }
          else{
            this.arraylist[i].PermanentAddress = this.arraylist[i].PermanentAddress;
          }

          // for AltMobileNo if excel column is empty
          if(this.arraylist[i].AltMobileNo == undefined){
            this.arraylist[i].AltMobileNo = '';
          }
          else{
            this.arraylist[i].AltMobileNo = this.arraylist[i].AltMobileNo.toString();
          }

          // for AltMobileNo if excel column is empty
          if(this.arraylist[i].Email == undefined){
            this.arraylist[i].Email = '';
          }
          else{
            this.arraylist[i].Email = this.arraylist[i].Email;
          }

          
         debugger;
          var obj = {
            FullName: this.arraylist[i].FullName,
            BirthDate: Dob,
            MobileNo: this.arraylist[i].MobileNo.toString(),
            LocalAddress: this.arraylist[i].LocalAddress,
            PermanentAddress: this.arraylist[i].PermanentAddress,
            AltMobileNo: this.arraylist[i].AltMobileNo.toString(),
            Email: this.arraylist[i].Email
          }
          debugger;
          console.log(this.excelUploadedData);
          this.excelUploadedData.push(obj);
       
        }
      }
      //this.excelUploadedData = arraylist;
    };
    reader.onerror = function (event) { console.error("File could not be read! Code "); };
  }

  resetForm() {
    this.myForm.reset();
  }

  onSubmit(f: NgForm) {
    f.resetForm();
  }

  upload(f: NgForm) {
    this.loader.showLoading();
    this.voter.mobileMatchExcel(this.excelUploadedData).subscribe((data) => {
      if (data) {
        this.loader.hideLoader();
        this.toast.presentToast("File uploded successfully!", "success", 'checkmark-circle-sharp');
        // this.router.navigate(['/mobile-match']);
        f.resetForm();
      }
      else {
        f.resetForm();
        this.loader.hideLoader();
        this.toast.presentToast("File not uploded", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      f.resetForm();
      this.loader.hideLoader();
      //this.toast.presentToast("File uploding failed!", "danger", 'alert-circle-sharp')
    }
    )
  }

  updateVoter(){
    this.loader.showLoading();
    return this.voter.uploadMatchedMobDoB(this.UserId,this.RoleId).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        console.log(data);
        this.toast.presentToast("Voter data updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Voter data not uploded", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

}
