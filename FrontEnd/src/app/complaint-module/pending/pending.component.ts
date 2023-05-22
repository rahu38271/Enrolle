import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service'
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import html2pdf from 'html2pdf.js'
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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

  search(){
    this.isShow = !this.isShow
  }

  constructor(
    private complaint: ComplaintService,
    private excel: ExcelService,
    private csv: CsvService,
    private loader: LoaderService,
    private toast: IonicToastService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.SearchText == undefined) {
      this.SearchText = ''
    }
    else {
      this.SearchText = this.SearchText
    }
    this.Status = "Pending"
  }

  ionViewWillEnter() {
    this.allResolvedComplaints(this.Status, this.PageNo, this.NoofRow, this.SearchText);
  }

  event(event: any) {
    this.PageNo = event;
    this.allResolvedComplaints(this.Status, event, this.NoofRow, this.SearchText);
  }

  allResolvedComplaints(Status: any, PageNo: any, NoofRow: any, SearchText: any) {

    this.complaint.getComplaintByStatus(Status, PageNo, NoofRow, SearchText).subscribe(data => {
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
      this.allResolvedComplaints(this.Status, this.PageNo, this.NoofRow, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 10;
      this.SearchText = SearchText;
      this.complaint.getComplaintByStatus(this.Status, this.PageNo, this.NoofRow, SearchText).subscribe(data => {
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

  keyPress(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.allResolvedComplaints(this.Status, this.PageNo, this.NoofRow, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 10;
      this.SearchText = SearchText;
      this.complaint.getComplaintByStatus(this.Status, this.PageNo, this.NoofRow, SearchText).subscribe(data => {
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
