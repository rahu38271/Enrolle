import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { VoterService } from 'src/app/services/voter.service';
import * as  XLSX from 'xlsx';
import { Router } from '@angular/router'

@Component({
  selector: 'app-import-voterdata',
  templateUrl: './import-voterdata.component.html',
  styleUrls: ['./import-voterdata.component.scss'],
})
export class ImportVoterdataComponent implements OnInit {

  disabled: boolean = true;
  myForm;
  file: any;
  excel = [];
  obj: any = {};
  arraylist: any;
  excelUploadedData: any = [];
  modal: any;
  f;
  UserId:any;
  AdminId:any;
  roleId:any;
  superAdminId:any;
  name:any;

  constructor
    (
      public loadingController: LoadingController,
      private toast: IonicToastService,
      private loader: LoaderService,
      private voter: VoterService,
      private router:Router
    ) {

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
      //console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      this.arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      if (this.arraylist.length > 0) {
        // this.spinner.show(); 
        this.obj = (this.arraylist)[0];
        if (Object.keys(this.obj)[0] != "PartNo" && (this.obj)[1] != "Name" && (this.obj)[2] != "Gender" && (this.obj)[3] != "Age" && (this.obj)[4] != "Village" && (this.obj)[5] != "VoterId" && (this.obj)[6] != "Address") {
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

          // var obj = {
          //   fullName: this.arraylist[i].fullName,
          //   birthDate: this.arraylist[i].birthDate,
          //   age: this.arraylist[i].age,
          //   gender: this.arraylist[i].gender,
          //   houseNo: this.arraylist[i].houseNo,
          //   votingCardNo: this.arraylist[i].votingCardNo,
          //   mobileNo: this.arraylist[i].mobileNo.toString(),
          //   caste: this.arraylist[i].caste,
          //   district: this.arraylist[i].district,
          //   vidhanSabha: this.arraylist[i].vidhanSabha,
          //   taluka: this.arraylist[i].taluka,
          //   ward: this.arraylist[i].ward,
          //   booth: this.arraylist[i].booth,
          //   village: this.arraylist[i].village,
          //   pincode: this.arraylist[i].pincode,
          //   address: this.arraylist[i].address,
          //   email: this.arraylist[i].email,
          //   familyHead: this.arraylist[i].familyHead,
          //   isSuspisious: this.arraylist[i].isSuspisious,
          //   isOutStation: this.arraylist[i].isOutStation,
          //   isAlive: this.arraylist[i].isAlive,
          //   occupation: this.arraylist[i].occupation,
          //   partyWorker: this.arraylist[i].partyWorker,
          //   votingInclination: this.arraylist[i].votingInclination,
          //   politicalParty: this.arraylist[i].politicalParty,
          // }

          var obj = {
            PartNo: this.arraylist[i].PartNo,
            FullName: this.arraylist[i].Name,
            Gender: this.arraylist[i].Gender,
            Age: this.arraylist[i].Age,
            Village: this.arraylist[i].Village,
            VotingCardNo: this.arraylist[i].VoterID.toString(),
            Address: this.arraylist[i].Address,
          }
          debugger;
          this.excelUploadedData.push(obj);
        }
      }
      //this.excelUploadedData = arraylist;
    };
    reader.onerror = function (event) { console.error("File could not be read! Code "); };
  }


  ngOnInit() {
    this.UserId = localStorage.getItem("loginId");
    this.AdminId = localStorage.getItem("adminId");
    this.roleId = localStorage.getItem("userType");
    this.superAdminId = localStorage.getItem("superAdminId");
    this.name = localStorage.getItem("loginUser")
    if (this.roleId == 2) {
      this.AdminId = this.UserId
    }
    else {
      this.AdminId = this.superAdminId
    }
  }

  resetForm() {
    this.myForm.reset();
  }

  onSubmit(f: NgForm) {
    f.resetForm();
  }

  upload(f: NgForm) {
    debugger
    this.loader.showLoading();
    var exceldata = [];
    this.excelUploadedData.forEach(element => {

      exceldata.push(
        {
          "Address": element.Address,
          "Age": element.Age,
          "FullName": element.FullName,
          "Gender": element.Gender,
          "PartNo": element.PartNo,
          "VotingCardNo": element.VotingCardNo,
          "Village": element.Village,
          "BirthDate": "1900-01-01T00:00:00",
          "HouseNo": "",

          "MobileNo": "",
          "Caste": "",
          "District": "",
          "Assembly": "",
          "Taluka": "",
          "Ward": "",
          "Booth": "",
         // "Pincode": 0,
          "Email": "",
          "FamilyHead": "",
          "IsSuspisious": "",
          "IsOutStation": "",
          "IsAlive": "",
          "Occupation": "",
          "PartyWorker": "",
          "VotingInclination": "",
          "PoliticalParty": "",
          "UserId": Number(this.UserId),
          "AdminId":Number(this.AdminId),
          "name":this.name,
          "CreatedDate": "1900-01-01T00:00:00"
        }
        
      )
      
    });

    this.voter.uploadExcel(exceldata).subscribe((data) => {
      debugger;
      if (data) {
        this.loader.hideLoader();
        this.toast.presentToast("File uploded successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/voter-summary'])
        f.resetForm();
      }
      else {
        f.resetForm();
        this.toast.presentToast("File not uploded", "danger", 'alert-circle-sharp');
        this.loader.hideLoader();
      }
    }, (err) => {
      f.resetForm();
      this.toast.presentToast("File not uploded", "danger", 'alert-circle-sharp');
      this.loader.hideLoader();
    })
  }

}
