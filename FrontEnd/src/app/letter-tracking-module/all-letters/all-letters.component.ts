import { Component, OnInit } from '@angular/core';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { LetterService } from 'src/app/services/letter.service';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-all-letters',
  templateUrl: './all-letters.component.html',
  styleUrls: ['./all-letters.component.css']
})
export class AllLettersComponent implements OnInit {

  UserId:any;
  RoleId:any;
  SearchText:any;
  PageNo:any=1;
  NoofRow:any=25;
  allLetters:any;
  totalItems:any;
  id:any;
  imageUrl:string='';
  Lid:any;

  constructor(
    public alertController: AlertController,
    private location:Location,
    private letterService:LetterService,
    private loader:LoaderService,
    private toast:IonicToastService,
    private router:Router,
    private excel: ExcelService,
    private csv: CsvService,
  ) { }

  ngOnInit(): void {
    this.UserId = localStorage.getItem('loginId');
    this.RoleId = localStorage.getItem('userType');
    if(this.SearchText==undefined){
      this.SearchText=''
    }
    else{
      this.SearchText = this.SearchText
    }
  }

  ionViewWillEnter(){
    this.lettersList(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText);
  }

  lettersList(UserId:any,RoleId:any,PageNo:any,NoofRow:any,SearchText:any){
    this.letterService.getAllLetters(UserId,RoleId,PageNo,NoofRow,this.SearchText).subscribe(data=>{
      if(data){
        this.allLetters = data;
        this.totalItems = data[0].totalCount;
        this.allLetters.forEach(e => {
          e.letter_Submit_Date = e.letter_Submit_Date.split('T')[0];
        });
      }
      else{

      }
    },(err)=>{

    })
  }

  event(event){
    this.PageNo=event;
    this.lettersList(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText);
  }

  editLetter(data:any){
    this.router.navigateByUrl('/letter-tracking/edit-letter', {state:data})
  }

  subLetter(id:any){
    this.router.navigate(['letter-tracking/sub-letter', id])
  }


  async deleteLetter(id:any) {
    const alert = await this.alertController.create({
      header: 'Delete Letter',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this Letter',
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
            this.letterService.deleteLetter(id).subscribe(data=>{
              this.loader.hideLoader();
              this.ionViewWillEnter();
              this.toast.presentToast("Letter deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }

  saveFile(imageData: Blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(imageData);
    link.download = '';
    link.click();
  }

  downloadFile(event:any){
    this.loader.showLoading();
    this.id = Number(event.target.id);
    this.letterService.downloadLetter(this.id).subscribe((data: Blob)=>{
      if(data.size!= 0){
        this.loader.hideLoader();
        this.saveFile(data);
        this.fetchImage(data);
        this.toast.presentToast("File downloaded successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("No File!", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  // to download image from get api
  fetchImage(image:Blob){
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

  goBack(){
    this.location.back();
  }

  exportExcel(): void {
    this.PageNo = 1;
    this.NoofRow = this.totalItems;
    var SearchText = "";
    this.loader.showLoading();
    this.letterService.getAllLetters(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.allLetters = data;
        this.allLetters.forEach(e => {
          delete e.totalCount;
          delete e.createdDate;
          delete e.roleId;
          delete e.userId;
          delete e.fileName;
        });
        this.excel.exportAsExcelFile(this.allLetters, 'Letters');
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
    this.letterService.getAllLetters(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText).subscribe(data => {
      if (data.length != 0) {
        this.loader.hideLoader();
        this.allLetters = data;
        this.allLetters.forEach(e => {
          delete e.totalCount;
          delete e.createdDate;
          delete e.roleId;
          delete e.userId;
          delete e.fileName;
          delete e.id;
        });
        this.csv.exportToCsv(this.allLetters, 'Letters');
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

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.lettersList(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText)
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText;
      this.letterService.getAllLetters(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText).subscribe(data => {
        if (data.length != 0) {
          this.allLetters = data;
          this.totalItems = data[0].totalCount

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
      this.lettersList(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText)
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 25;
      this.SearchText = SearchText;
      this.letterService.getAllLetters(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText).subscribe(data => {
        if (data.length != 0) {
          this.allLetters = data;
          this.totalItems = data[0].totalCount

        }
        else {

        }
      }, (err) => {

      })
    }
  }

}
