import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service'
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import html2pdf from 'html2pdf.js'
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  isShow = false;
  pendingList: any;
  cp: number = 1;
  Id: any;
  complaintStatusModal: any = {}
  Status: any;
  PageNo: any = 1;
  NoofRow: any = 10;
  SearchText: any;
  totalItems: any;
  UserId:any;
  RoleId:any;

  search(){
    this.isShow = !this.isShow
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  constructor(
    private complaint: ComplaintService,
    private excel: ExcelService,
    private csv: CsvService,
    private loader: LoaderService,
    private toast: IonicToastService,
    private location: Location,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.UserId = localStorage.getItem("loginId");
    this.RoleId = localStorage.getItem("userType");
    if (this.SearchText == undefined) {
      this.SearchText = ''
    }
    else {
      this.SearchText = this.SearchText
    }
    this.Status = "Pending"
  }

  ionViewWillEnter() {
    this.allResolvedComplaints(this.UserId,this.RoleId,this.Status, this.PageNo,this.NoofRow,this.SearchText);
  }

  editCmplaint(data: any) {
    this.router.navigateByUrl('/complaint-book/edit-complaint', { state: data })
  }

  async deleteCom(id: any) {
    const alert = await this.alertController.create({
      header: 'Delete Complaint',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this Complaint',
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
            this.complaint.deleteComplaint(id).subscribe(data => {
              this.loader.hideLoader();
              this.ionViewWillEnter();
              this.toast.presentToast("Complaint deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }

  event(event: any) {
    this.PageNo = event;
    this.allResolvedComplaints(this.UserId,this.RoleId,this.Status, event,this.NoofRow,this.SearchText);
  }

  allResolvedComplaints(UserId:any,RoleId:any, Status: any, PageNo: any, NoofRow: any,SearchText:any) {

    this.complaint.getComplaintByStatus(UserId,RoleId,Status, PageNo, NoofRow,SearchText).subscribe(data => {
      if (data.length != 0) {
        this.pendingList = data;
        this.totalItems = data[0].totalCount;
        this.pendingList.forEach(e => {
          e.fromDate = e.fromDate.split('T')[0];
          e.toDate = e.toDate.split('T')[0];
        });

      }
      else {

      }
    }, (err) => {

    })
  }

  saveFile(imageData:Blob){
    // const fileName = 'file_name.extension';
    // saveAs(blob,fileName);
    const link = document.createElement('a');
    link.href=window.URL.createObjectURL(imageData);
    // link.download = 'image.jpg';
    link.download = '';
    link.click();
  }

  downloadFile(event: any) {
    this.Id = Number(event.target.id);
    this.loader.showLoading();
    this.complaint.getFile(this.Id).subscribe((data : Blob) => {
      if (data.size!=0) {
        this.loader.hideLoader();
        this.saveFile(data);
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("File not found!", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();
      //this.toast.presentToast("File not downloaded!", "danger", 'alert-circle-sharp');
    })
  }

  goBack() {
    this.location.back();
  }

  changeStatus(event) {
    this.Id = event.target.id
    this.complaintStatusModal.Id = Number(this.Id);
    this.complaintStatusModal.Status = this.complaintStatusModal.Status;
    this.complaint.updateComplaintStatus(
      this.complaintStatusModal.Id,
      this.complaintStatusModal.Status
    ).subscribe(data => {
      if (this.complaintStatusModal.Status == "Resolved") {
        this.complaintStatusModal = {};
        this.router.navigate(['/complaint-book/resolved-complaint']);
        this.toast.presentToast("Complaint resolved successfully!", "success", 'checkmark-circle-sharp');
      }
    })
  }

  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.allResolvedComplaints(this.UserId,this.RoleId, this.Status, this.PageNo, this.NoofRow,SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 10;
      this.SearchText = SearchText;
      this.complaint.getComplaintByStatus(this.UserId,this.RoleId,this.Status, this.PageNo, this.NoofRow,SearchText).subscribe(data => {
        if (data) {
          this.pendingList = data;
          this.totalItems = data[0].totalCount;
          this.pendingList.forEach(e => {
            e.fromDate = e.fromDate.split('T')[0];
            e.toDate = e.toDate.split('T')[0];
          });
        }
      })
    }
  }



  exportExcel(): void {
    if (this.pendingList.length != 0) {
      this.pendingList.forEach(e => {
        delete e.totalCount;
        delete e.createdDate;
        delete e.roleId;
        delete e.userId;
      });
      this.excel.exportAsExcelFile(this.pendingList, 'Pending Complaints');
      this.toast.presentToast("Downloaded successfully!", "success", 'checkmark-circle-sharp');
    }
    else {
      this.excel.exportAsExcelFile(this.pendingList, 'Pending Complaints');
      this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
    }

  }

  exportToCSV() {
    if (this.pendingList.length != 0) {
      this.pendingList.forEach(e => {
        delete e.totalCount;
        delete e.createdDate;
        delete e.roleId;
        delete e.userId;
        delete e.id;
      });
      this.csv.exportToCsv(this.pendingList, 'Pending Complaints');
      this.toast.presentToast("Downloaded successfully!", "success", 'checkmark-circle-sharp');
    }
    else {
      this.csv.exportToCsv(this.pendingList, 'Pending Complaints');
      this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
    }

  }

  exportPDF() {
    var element = document.getElementById('table13');

    var opt = {
      margin: 0.2,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save(); { };

    // Old monolithic-style usage:
    html2pdf(element, opt);
  }

}
