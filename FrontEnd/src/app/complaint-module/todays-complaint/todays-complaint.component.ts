import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service'
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';
import html2pdf from 'html2pdf.js'
import { Router } from '@angular/router'
import { IonicToastService } from 'src/app/services/ionic-toast.service'; 
import { AlertController} from '@ionic/angular';
import { Location } from '@angular/common';
import { LoaderService  } from 'src/app/services/loader.service';

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
  isShow = false;

  constructor(
    private complaint:ComplaintService,
    private excel:ExcelService,
    private csv:CsvService,
    private router:Router,
    private toast:IonicToastService,
    public alertController: AlertController,
    private location: Location,
    private loader:LoaderService
  ) { }

  ngOnInit(): void {
    if(this.SearchText == undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
  }

  search(){
    this.isShow = !this.isShow
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

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
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
      this.complaint.getTodayComplaint(this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
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
      })
    }
  }

  keyPress(SearchText:any){
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
      this.complaint.getTodayComplaint(this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
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
      })
    }
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
    this.PageNo = 1;
    this.NoofRow = this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.complaint.getAllComplaints(this.PageNo, this.NoofRow, SearchText).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.todayComplaints = data;
        this.todayComplaints.forEach(e => {
          e.fromDate = e.fromDate.split('T')[0];
          e.toDate = e.toDate.split('T')[0];
        });
        this.excel.exportAsExcelFile(this.todayComplaints, 'Complaints');
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
    this.PageNo = 1;
    this.NoofRow = this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.complaint.getAllComplaints(this.PageNo, this.NoofRow, SearchText).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.todayComplaints = data;
        this.todayComplaints.forEach(e => {
          e.fromDate = e.fromDate.split('T')[0];
          e.toDate = e.toDate.split('T')[0];
        });
        this.csv.exportToCsv(this.todayComplaints, 'Complaints');
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
    html2pdf().set(opt).from(element).save();{};

    // Old monolithic-style usage:
    html2pdf(element, opt);
  }

}
