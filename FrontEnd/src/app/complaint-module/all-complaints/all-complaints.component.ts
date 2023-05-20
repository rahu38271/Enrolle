import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service'
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import html2pdf from 'html2pdf.js'
import { Router } from '@angular/router'
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-all-complaints',
  templateUrl: './all-complaints.component.html',
  styleUrls: ['./all-complaints.component.css']
})
export class AllComplaintsComponent implements OnInit {

  isShow = false;
  allComplaints: any;
  fromDate = '';
  ToDate = '';
  complaintCount: any;
  Id: any;
  complaintStatusModal: any = {}
  PageNo: any = 1
  NoofRow: any = 10;
  SearchText: any;
  totalItems: any;
  Status: any;
  fileName: any;

  search(){
    this.isShow = !this.isShow
  }

  constructor(
    private complaint: ComplaintService,
    private excel: ExcelService,
    private csv: CsvService,
    private router: Router,
    private toast: IonicToastService,
    public alertController: AlertController,
    private location: Location,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    if (this.SearchText == undefined) {
      this.SearchText = ''
    }
    else {
      this.SearchText = this.SearchText
    }
    if (this.Status == '' || this.Status == null) {
      this.Status = ''
    }
    else {
      this.Status = this.Status
    }

  }

  ionViewWillEnter() {
    this.complaintList(this.PageNo, this.NoofRow, this.SearchText);
  }

  event(event: any) {
    this.PageNo = event;
    this.complaintList(event, this.NoofRow, this.SearchText);
  }

  complaintList(PageNo: any, NoofRow: any, SearchText: any) {
    this.complaint.getAllComplaints(PageNo, NoofRow, SearchText).subscribe(data => {
      if (data.length != 0) {
        this.allComplaints = data;
        this.totalItems = data[0].totalCount
        this.allComplaints.forEach(e => {
          e.fromDate = e.fromDate.split('T')[0];
          e.toDate = e.toDate.split('T')[0];
        });

      }
      else {

      }
    }, (err) => {

    })
  }

  saveFile(blob:Blob){
    const fileName = 'file_name.extension';
    saveAs(blob,fileName);
  }

  downloadFile(event: any) {
    debugger;
    this.Id = Number(event.target.id);
    this.complaint.getFile(this.Id).subscribe((data : Blob) => {
      if (data) {
        this.saveFile(data);
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.toast.presentToast("File not downloaded!", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.toast.presentToast("File not downloaded!", "danger", 'alert-circle-sharp');
    })
  }

  

  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.complaintList(this.PageNo, this.NoofRow, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 10;
      this.SearchText = SearchText;
      this.complaint.getAllComplaints(this.PageNo, this.NoofRow, SearchText).subscribe(data => {
        if (data.length != 0) {
          this.allComplaints = data;
          this.totalItems = data[0].totalCount
          this.allComplaints.forEach(e => {
            e.fromDate = e.fromDate.split('T')[0];
            e.toDate = e.toDate.split('T')[0];
          });

        }
        else {

        }
      }, (err) => {

      })
    }
  }

  keyPress(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.complaintList(this.PageNo, this.NoofRow, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 10;
      this.SearchText = SearchText;
      this.complaint.getAllComplaints(this.PageNo, this.NoofRow, SearchText).subscribe(data => {
        if (data.length != 0) {
          this.allComplaints = data;
          this.totalItems = data[0].totalCount
          this.allComplaints.forEach(e => {
            e.fromDate = e.fromDate.split('T')[0];
            e.toDate = e.toDate.split('T')[0];
          });

        }
        else {

        }
      }, (err) => {

      })
    }
  }


  editCmplaint(data: any) {
    this.router.navigateByUrl('/complaint-book/edit-complaint', { state: data })
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
      else if (this.complaintStatusModal.Status == "Pending") {
        this.complaintStatusModal = {};
        this.router.navigate(['/complaint-book/pending-complaint']);
        this.toast.presentToast("Complaint is pending!", "success", 'checkmark-circle-sharp');
      }
    })
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
            this.complaint.deleteComplaint(id).subscribe(data => {
              this.ionViewWillEnter();
              this.toast.presentToast("Complaint deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }

  exportExcel(): void {
    this.PageNo = 1;
    this.NoofRow = this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.complaint.getAllComplaints(this.PageNo, this.NoofRow, SearchText).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.allComplaints = data;
        this.allComplaints.forEach(e => {
          e.fromDate = e.fromDate.split('T')[0];
          e.toDate = e.toDate.split('T')[0];
        });
        this.excel.exportAsExcelFile(this.allComplaints, 'Complaints');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();
    })
  }


  exportToCSV() {
    this.allComplaints.forEach(e => {
      e.fromDate = e.fromDate.split('T')[0];
      e.toDate = e.toDate.split('T')[0];
    });
    this.PageNo = 1;
    this.NoofRow = this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.complaint.getAllComplaints(this.PageNo, this.NoofRow, SearchText).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.allComplaints = data;
        this.allComplaints.forEach(e => {
          e.fromDate = e.fromDate.split('T')[0];
          e.toDate = e.toDate.split('T')[0];
        });
        this.csv.exportToCsv(this.allComplaints, 'Complaints');
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();
    })
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
