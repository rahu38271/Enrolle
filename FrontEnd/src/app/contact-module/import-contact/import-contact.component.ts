import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ContactService } from 'src/app/services/contact.service';
import { HttpClient } from '@angular/common/http';
import * as  XLSX from 'xlsx';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-contact',
  templateUrl: './import-contact.component.html',
  styleUrls: ['./import-contact.component.scss'],
})
export class ImportContactComponent implements OnInit {


  file: any;
  excel = [];

  obj: any = {};
  arraylist: any;
  excelUploadedData: any = [];
  modal: any;
  f;
  disabled:boolean= true;
  myForm: any;

  constructor(private router:Router, public loadingController: LoadingController, private toast: IonicToastService, private loader: LoaderService, private contact: ContactService, private http: HttpClient) { }

  ngOnInit() {

  }


  onFileChange(event: any) {
    debugger;
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
        if (Object.keys(this.obj)[0] != "Name" && (this.obj)[1] != "VillageName" && (this.obj)[2] != "DateofBirth" && (this.obj)[3] != "AnniversaryDate" && (this.obj)[4] != "Mobile" && (this.obj)[5] != "AlternateMobile" && (this.obj)[6] != "Address" && (this.obj)[7] != "Taluka" && (this.obj)[8] != "District") {
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

          if(this.arraylist[i].DateofBirth != undefined){
            var rawdob = this.arraylist[i].DateofBirth;
            var DB = new Date((rawdob - 25569) * 86400000);

            var Dob = DB.toISOString().replace(/.\d+Z$/g, "");
          }
          else{
            var Dob = '1900-01-01T00:00:00'
          }

          if(this.arraylist[i].AnniversaryDate!=undefined)
          {
           var rawanniversay_date = this.arraylist[i].AnniversaryDate;
           var AD = new Date((rawanniversay_date - 25569) * 86400000);
           var Anniversaydate = AD.toISOString().replace(/.\d+Z$/g, "");
          }

          //for birthdate if excel column is empty
          if (this.arraylist[i].DateofBirth == undefined) {
            this.arraylist[i].DateofBirth = '1900-01-01T00:00:00';
          }
          else {
            this.arraylist[i].DateofBirth = Dob;
          }

          if(this.arraylist[i].AnniversaryDate == undefined ){
            this.arraylist[i].AnniversaryDate = '1900-01-01T00:00:00';
          }
          else{
            this.arraylist[i].AnniversaryDate = Anniversaydate;
          }

          // for mobile number if excel column is empty
          if(this.arraylist[i].Mobile == undefined){
            this.arraylist[i].Mobile = '';
          }
          else{
            this.arraylist[i].Mobile = this.arraylist[i].Mobile.toString();
          }

          // for alternate mobile number if excel column is empty
          if(this.arraylist[i].AlternateMobile == undefined){
            this.arraylist[i].AlternateMobile = '';
          }
          else{
            this.arraylist[i].AlternateMobile = this.arraylist[i].AlternateMobile.toString();
          }
         

         debugger;
          var obj = {
            VilageName: this.arraylist[i].VillageName,
            FullName: this.arraylist[i].Name,
            BirthDate: Dob,
            Anniversary: this.arraylist[i].AnniversaryDate,
            //Anniversary: this.arraylist[i].AnniversaryDate.toISOString().replace(/.\d+Z$/g, ""),
            MobileNo: this.arraylist[i].Mobile.toString(),
            AlternativeMobileNo: this.arraylist[i].AlternateMobile.toString(),
            Address: this.arraylist[i].Address,
            Taluka: this.arraylist[i].Taluka,
            District: this.arraylist[i].District
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
    debugger;
    this.loader.showLoading();
    this.contact.UploadExcel(this.excelUploadedData).subscribe((data) => {
      if (data) {
        this.loader.hideLoader();
        this.toast.presentToast("File uploded successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/contact']);
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
}


