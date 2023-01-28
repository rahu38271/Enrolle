import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { AssemblyService } from 'src/app/services/assembly.service';
import * as XLSX from 'xlsx'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-import-assembly',
  templateUrl: './import-assembly.component.html',
  styleUrls: ['./import-assembly.component.css']
})
export class ImportAssemblyComponent implements OnInit {

  file:any;
  excel=[];
  obj:any = {}
  arraylist:any;
  excelUploadedData:any= [];
  modal:any;
  f;
  myForm:any;
  disabled:boolean = true;

  constructor
    (
      private loader:LoaderService, 
      private toast:IonicToastService, 
      private assembly:AssemblyService,
      private http: HttpClient
    ) 
    {

     }

  ngOnInit(): void {
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
    var reader = new FileReader();
    reader.readAsBinaryString(this.file);
    reader.onload = (event) => {
      var data = reader.result;
      //var workbook = XLSX.read(data, { type: 'binary', cellDates: true });
      var workbook = XLSX.read(data, { type: 'binary' });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      debugger;
      this.arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      
      if (this.arraylist.length > 0) {
        // this.spinner.show(); 
        this.obj = (this.arraylist)[0];
        if (Object.keys(this.obj)[0] != "State" && (this.obj)[1] != "AssemblyName" && (this.obj)[2] != "AssemblyNumber") {
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
         
          var obj = {
            State: this.arraylist[i].State,
            AssemblyName: this.arraylist[i].Assembly,
            AssemblyNo: this.arraylist[i].AssemblyNo
          }
          //debugger;
          this.excelUploadedData.push(obj);
        }
      }
      //this.excelUploadedData = arraylist;
    };
    reader.onerror = function (event) { console.error("File could not be read! Code "); };
  }

  upload(f: NgForm) {
    debugger;
    this.loader.showLoading();
    this.assembly.uploadExcel(this.excelUploadedData).subscribe((data) => {
      debugger;
      if (data) {
        this.loader.hideLoader();
        this.toast.presentToast("File uploded successfully!", "success", 'checkmark-circle-sharp');
        f.resetForm();
      }
      else {
        this.toast.presentToast("File not uploded", "danger", 'alert-circle-sharp');
         this.loader.hideLoader();
      }
    }, (err) => {
      this.toast.presentToast("File uploding failed!", "danger", 'alert-circle-sharp');
      this.loader.hideLoader();
    }
    )
  }

  resetForm() {
    this.myForm.reset();
  }

  onSubmit(f: NgForm) {
    f.resetForm();
  }


}
