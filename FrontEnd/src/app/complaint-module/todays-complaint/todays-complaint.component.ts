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
  selector: 'app-todays-complaint',
  templateUrl: './todays-complaint.component.html',
  styleUrls: ['./todays-complaint.component.css']
})
export class TodaysComplaintComponent implements OnInit {

  todayComplaints:any;
  fromDate='';
  ToDate='';
  complaintCount:any;
  Id:any;
  complaintStatusModal:any={}
  PageNo:any=1;
  NoofRow:any=10;
  SearchText:any;
  totalItems:any;

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
    if(this.SearchText == undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
  }

  ionViewWillEnter(){
    this.complaintList(this.PageNo,this.NoofRow,this.SearchText);
  }

  event(event:any){
    this.PageNo=event;
    this.complaintList(event,this.NoofRow,this.SearchText);
  }

  complaintList(PageNo:any,NoofRow:any,SearchText:any){
    this.complaint.getTodayComplaint(PageNo,NoofRow,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.todayComplaints = data;
        this.totalItems = data[0].totalCount;
        this.todayComplaints.forEach(e => {
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

  onSearchChange(SearchText:any){
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    this.SearchText=SearchText;
    var SearchText = SearchText.replace(/^\|+|\|+$/g, '');
    this.complaintList(this.PageNo,this.NoofRow,this.SearchText);
  }

  keyPress(SearchText:any){
    this.PageNo=1;
    this.NoofRow=this.totalItems;
    this.SearchText=SearchText;
    this.complaintList(this.PageNo,this.NoofRow,this.SearchText);
  }

  async deleteCom(id:any) {
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
              this.toast.presentToast("Complaint deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }

  exportExcel():void {
    this.todayComplaints.forEach(e => {
      e.fromDate = e.fromDate.split('T')[0];
      e.toDate = e.toDate.split('T')[0];
    });
    this.excel.exportAsExcelFile(this.todayComplaints, 'Complaints');
  }

  exportToCSV() {
    this.todayComplaints.forEach(e => {
      e.fromDate = e.fromDate.split('T')[0];
      e.toDate = e.toDate.split('T')[0];
    });
    this.csv.exportToCsv(this.todayComplaints, 'Complaints');
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
