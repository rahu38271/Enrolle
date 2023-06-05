import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { LoaderService } from 'src/app/services/loader.service';
import { HttpClient,HttpHeaders,HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-daily-news',
  templateUrl: './daily-news.component.html',
  styleUrls: ['./daily-news.component.scss'],
})
export class DailyNewsComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  newsList:any;
  f;
  UserId:any;
  RoleId:any;
  PageNo:any=1;
  NoofRow:any=10;
  SearchText:any;
  totalItems:any;
  id:any;
  Id:any;

  year : number = new Date().getFullYear();

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private news:NewsService,
    private router:Router,
    private toast:IonicToastService,
    private loader:LoaderService,
    private http:HttpClient
    ) { }

  ngOnInit() {
    this.UserId = localStorage.getItem("loginId");
    this.RoleId = localStorage.getItem("userType");
    if(this.SearchText==undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    
  }

  ionViewWillEnter(){
    this.allNewsList(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText)
  }

  event(event:any){
    this.PageNo=event;
    this.allNewsList(this.UserId,this.RoleId,event,this.NoofRow,this.SearchText)
  }

  allNewsList(UserId:any,RoleId:any,PageNo:any,NoofRow:any,SearchText:any){
    this.news.getAllNews(UserId,RoleId,PageNo,NoofRow,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.newsList=data;
        this.totalItems=data[0].totalCount;
        this.newsList.forEach(e => {
          e.date = e.date.split('T')[0];
        });
      }
      else{

      }
    },(err)=>{

    })
  }

  editNews(data:any){
    this.router.navigateByUrl('/daily-news/edit-daily-news', { state: data })
  }



  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.allNewsList(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText)
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 10;
      this.SearchText = SearchText;
      this.news.getAllNews(this.UserId,this.RoleId,this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
        if(data.length != 0){
          this.newsList=data;
          this.totalItems=data[0].totalCount;
          this.newsList.forEach(e => {
            e.date = e.date.split('T')[0];
          });
        }
        else{
  
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
      this.allNewsList(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText)
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 10;
      this.SearchText = SearchText;
      this.news.getAllNews(this.UserId,this.RoleId,this.PageNo,this.NoofRow,SearchText).subscribe(data=>{
        if(data.length != 0){
          this.newsList=data;
          this.totalItems=data[0].totalCount;
          this.newsList.forEach(e => {
            e.date = e.date.split('T')[0];
          });
        }
        else{
  
        }
      }, (err) => {

      })
    }
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
    this.news.getFile(this.Id).subscribe((data : Blob) => {
      if (data) {
        this.loader.hideLoader();
        this.saveFile(data);
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("File download failed!", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.loader.hideLoader();
      this.toast.presentToast("File not downloaded!", "danger", 'alert-circle-sharp');
    })
  }

  async deleteNews(id:any) {
    const alert = await this.alertController.create({
      header: 'Delete news',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this news',
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
            console.log('Confirm Ok');
            this.news.delete(id).subscribe(data=>{
              this.ionViewWillEnter();
              this.toast.presentToast("News deleted Succesfully!", "success", 'checkmark-circle-sharp');
            },(err)=>{
            })
          }
        }
      ],
    });

    await alert.present();
  }


  exportexcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  pdf() {
    var element = document.getElementById('table10');
    
    var opt = {
      margin: 0.2,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();{};

    // Old monolithic-style usage:
    html2pdf(element, opt);
  }

}
