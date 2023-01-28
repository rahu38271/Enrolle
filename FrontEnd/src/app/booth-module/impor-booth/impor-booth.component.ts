import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { BoothService } from 'src/app/services/booth.service';
import * as XLSX from 'xlsx';
import { NgForm } from '@angular/forms';
 

@Component({
  selector: 'app-impor-booth',
  templateUrl: './impor-booth.component.html',
  styleUrls: ['./impor-booth.component.css']
})
export class ImporBoothComponent implements OnInit {

  myForm;
  file: any;
  excel = [];
  obj: any = {};
  arraylist: any;
  excelUploadedData: any = [];
  modal: any;
  f;
  disabled:boolean= true;
  
  constructor
    (
      private loader:LoaderService,
      private toast:IonicToastService,
      private booth:BoothService
    ) 
    { }

  ngOnInit() {}

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
        if (Object.keys(this.obj)[0] != "Assembly" && (this.obj)[1] != "BoothNumber" && (this.obj)[2] != "BoothName" ) {
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
          debugger;

          var obj = {
            AssemblyName: this.arraylist[i].Assembly,
            BoothNo: this.arraylist[i].BoothNumber,
            BoothName: this.arraylist[i].BoothName,
          }
          debugger;
          this.excelUploadedData.push(obj);
        }
      }
      //this.excelUploadedData = arraylist;
    };
    reader.onerror = function (event) { console.error("File could not be read! Code "); };
  }

  resetForm(){
    this.myForm.reset();
  }

  upload(f:NgForm){
    this.loader.showLoading();
    this.booth.uploadExcel(this.excelUploadedData).subscribe((data)=>{
      if(data){
        console.log(data);
        this.loader.hideLoader();
        this.toast.presentToast("File uploded successfully!", "success", 'checkmark-circle-sharp');
        f.resetForm();
      }
      else{
        this.toast.presentToast("File uploding failed!", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.toast.presentToast("File uploding failed!", "danger", 'alert-circle-sharp');
    })
  }


}
