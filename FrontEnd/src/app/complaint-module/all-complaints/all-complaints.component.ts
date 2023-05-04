import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service'
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import html2pdf from 'html2pdf.js'
import { Router } from '@angular/router'
import { IonicToastService } from 'src/app/services/ionic-toast.service'; 
import { AlertController} from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-all-complaints',
  templateUrl: './all-complaints.component.html',
  styleUrls: ['./all-complaints.component.css']
})
export class AllComplaintsComponent implements OnInit {

  allComplaints:any;
  fromDate='';
  ToDate='';
  complaintCount:any;
  cp:number=1;
  Id:any;
  complaintStatusModal:any={}

  constructor(
    private complaint:ComplaintService,
    private excel:ExcelService,
    private csv:CsvService,
    private router:Router,
    private toast:IonicToastService,
    public alertController: AlertController,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  ionViewWillEnter(){
   
    this.complaintList();
  }

  complaintList(){
    this.complaint.getAllComplaints().subscribe(data=>{
      if(data.length != 0){
        this.allComplaints = data;
        this.allComplaints.forEach(e => {
          e.fromDate = e.fromDate.split('T')[0];
          e.toDate = e.toDate.split('T')[0];
        });
      }
      else{

      }
    },(err)=>{

    })
  }


  editCmplaint(data:any){
    this.router.navigateByUrl('/complaint-book/edit-complaint', {state:data})
  }

  goBack() {
    this.location.back();
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
      if(this.complaintStatusModal.Status == "Resolved"){
        this.complaintStatusModal={};
        this.router.navigate(['/complaint-book/resolved-complaint']);
        this.toast.presentToast("Complaint resolved successfully!", "success", 'checkmark-circle-sharp');
      }
      else if (this.complaintStatusModal.Status == "Pending"){
        this.complaintStatusModal={};
        this.router.navigate(['/complaint-book/pending-complaint']);
        this.toast.presentToast("Complaint is pending!", "success", 'checkmark-circle-sharp');
      }
    })
  }

  async deleteCom(id:any) {
    debugger;
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
            this.complaint.deleteComplaint(id).subscribe(data=>{
              this.ionViewWillEnter();
              this.toast.presentToast("Appointment deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }

  exportExcel():void {
    this.allComplaints.forEach(e => {
      e.fromDate = e.fromDate.split('T')[0];
      e.toDate = e.toDate.split('T')[0];
    });
    this.excel.exportAsExcelFile(this.allComplaints, 'Complaints');
  }

  exportToCSV() {
    this.allComplaints.forEach(e => {
      e.fromDate = e.fromDate.split('T')[0];
      e.toDate = e.toDate.split('T')[0];
    });
    this.csv.exportToCsv(this.allComplaints, 'Complaints');
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
