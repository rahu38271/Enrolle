import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service'
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import html2pdf from 'html2pdf.js'
import { LoaderService  } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resolved',
  templateUrl: './resolved.component.html',
  styleUrls: ['./resolved.component.css']
})
export class ResolvedComponent implements OnInit {

  resolvedList:any;
  Status:any;
  cp:number=1;
  Id:any;
  complaintStatusModal:any={}
  constructor(
    private complaint:ComplaintService,
    private excel:ExcelService,
    private csv:CsvService,
    private loader:LoaderService,
    private toast:IonicToastService,
    private location: Location,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.allResolvedComplaints();
  }

  allResolvedComplaints(){
    this.Status = "Resolved"
    this.complaint.getComplaintByStatus(this.Status).subscribe(data=>{
      if(data.length != 0){
        this.resolvedList = data;
        this.resolvedList.forEach(e => {
          e.fromDate = e.fromDate.split('T')[0];
          e.toDate = e.toDate.split('T')[0];
        });
      }
      else{

      }
    },(err)=>{

    })
  }

  changeStatus(event){
    debugger;
    this.Id = event.target.id
    this.complaintStatusModal.Id = Number(this.Id);
    this.complaintStatusModal.Status = this.complaintStatusModal.Status;
    this.complaint.updateComplaintStatus(
      this.complaintStatusModal.Id,
      this.complaintStatusModal.Status
      ).subscribe(data=>{
      if (this.complaintStatusModal.Status == "Pending"){
        this.complaintStatusModal={};
        this.router.navigate(['/complaint-book/pending-complaint']);
        this.toast.presentToast("Complaint is pending!", "success", 'checkmark-circle-sharp');
      }
    })
  }

  goBack() {
    this.location.back();
  }

  exportExcel():void {
    this.loader.showLoading()
    if(this.resolvedList.length != 0){
      this.loader.hideLoader();
      this.excel.exportAsExcelFile(this.resolvedList, 'Resolved Complaints');
      this.toast.presentToast("Downloaded successfully!", "success", 'checkmark-circle-sharp');
    }
    else{
      this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
    }
     
  }

  exportToCSV() {
    this.loader.showLoading()
    if(this.resolvedList.length != 0){
      this.loader.hideLoader();
      this.csv.exportToCsv(this.resolvedList, 'Resolved Complaints');
      this.toast.presentToast("Downloaded successfully!", "success", 'checkmark-circle-sharp');
    }
    else{
      this.loader.hideLoader();
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
    html2pdf().set(opt).from(element).save();{};

    // Old monolithic-style usage:
    html2pdf(element, opt);
  }

}
