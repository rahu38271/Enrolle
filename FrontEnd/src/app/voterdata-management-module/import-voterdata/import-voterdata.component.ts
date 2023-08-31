import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { VoterService } from 'src/app/services/voter.service';
import * as  XLSX from 'xlsx';
import { Router } from '@angular/router'
import { Location } from '@angular/common'

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
  assemblyName:any;

  constructor
    (
      public loadingController: LoadingController,
      private toast: IonicToastService,
      private loader: LoaderService,
      private voter: VoterService,
      private router:Router,
      private location: Location
    ) {

  }

  ngOnInit() {
    this.UserId = localStorage.getItem("loginId");
    this.AdminId = localStorage.getItem("adminId");
    this.roleId = localStorage.getItem("userType");
    this.superAdminId = localStorage.getItem("superAdminId");
    this.name = localStorage.getItem("loginUser");
    this.assemblyName = localStorage.getItem("loginAssembly");
    if (this.roleId == 2) {
      this.AdminId = this.UserId
    }
    else {
      this.AdminId = this.superAdminId
    }
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
        if (Object.keys(this.obj)[0] != "AssemblyNo" && 
        (this.obj)[1] != "Assembly" && 
        (this.obj)[2] != "AssemblyName_KR" && 
        (this.obj)[3] != "AssemblyName_HN" && 
        (this.obj)[4] != "PartNo" && 
        (this.obj)[5] != "Name" && 
        (this.obj)[6] != "Name_KR" && 
        (this.obj)[7] != "Name_HN"  && 
        (this.obj)[8] != "Gender" && 
        (this.obj)[9] != "Age" && 
        (this.obj)[10] != "Village" &&
        (this.obj)[11] != "Village_KR" &&
        (this.obj)[12] != "Village_HN" &&
        (this.obj)[13] != "VoterId" && 
        (this.obj)[14] != "Address" && 
        (this.obj)[15] != "Address_KR" && 
        (this.obj)[16] != "Address_HN" && 
        (this.obj)[17] != "Mobile" && 
        (this.obj)[18] != "BirthDate" && 
        (this.obj)[19] != "PinCode") {
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
          if(this.arraylist[i].Mobile == undefined){
            this.arraylist[i].Mobile = '';
          }
          else{
            this.arraylist[i].Mobile = this.arraylist[i].Mobile.toString();
            // var mobLength = this.arraylist[i].Mobile.length;
            // if(mobLength !== 10){
            //   this.arraylist[i].Mobile = ''
            // }
            // else{
            //   this.arraylist[i].Mobile = this.arraylist[i].Mobile.toString();
            // }
          }
          // for pincode if excel column is empty
          if(this.arraylist[i].PinCode == undefined){
            this.arraylist[i].PinCode = null;
          }
          else{
            this.arraylist[i].PinCode = this.arraylist[i].PinCode;
          }

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
            AssemblyNo:this.arraylist[i].AssemblyNo,
            Assembly:this.arraylist[i].Assembly,
            AssemblyName_HN:this.arraylist[i].AssemblyName_HN,
            AssemblyName_KR:this.arraylist[i].AssemblyName_MR,
            PartNo: this.arraylist[i].PartNo,
            FullName: this.arraylist[i].Name,
            FullName_KR: this.arraylist[i].Name_MR,
            FullName_HN: this.arraylist[i].Name_HN,
            Gender: this.arraylist[i].Gender,
            Age: this.arraylist[i].Age,
            Village: this.arraylist[i].Village,
            Village_HN: this.arraylist[i].Village_MR,
            Village_KR: this.arraylist[i].Village_HN,
            VotingCardNo: this.arraylist[i].VoterID.toString(),
            Address: this.arraylist[i].Address,
            Address_HN: this.arraylist[i].Address_MR,
            Address_KR: this.arraylist[i].Address_HN,
            MobileNo: this.arraylist[i].Mobile,
            BirthDate: Dob, 
            Pincode:this.arraylist[i].PinCode
          }
          debugger;
          this.excelUploadedData.push(obj);
        }
      }
      //this.excelUploadedData = arraylist;
      console.log(this.excelUploadedData)
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
    var exceldata = [];
    this.excelUploadedData.forEach(element => {

      exceldata.push(
        {
          "Address": element.Address,
          "Address_KR": element.Address_KR,
          "Address_HN": element.Address_HN,
          "Age": element.Age,
          "FullName": element.FullName,
          "FullName_KR": element.FullName_KR,
          "FullName_HN": element.FullName_HN,
          "Gender": element.Gender,
          "PartNo": element.PartNo,
          "VotingCardNo": element.VotingCardNo,
          "Village": element.Village,
          "Village_KR": element.Village_KR,
          "Village_HN": element.Village_HN,
          "BirthDate": element.BirthDate,
          "HouseNo": "",

          "MobileNo": element.MobileNo,
          "Caste": "",
          "District": "",
          "AssemblyNo":element.AssemblyNo,
          "Assembly": element.Assembly,
          "AssemblyName_KR": element.AssemblyName_KR,
          "AssemblyName_HN": element.AssemblyName_HN,
          "Taluka": "",
          "Ward": "",
          "Booth": null,
          "Pincode": element.Pincode,
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

  goBack(){
    this.location.back();
  }

}
