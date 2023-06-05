import { Component, OnInit } from '@angular/core';
import { NewVoterService } from 'src/app/services/new-voter.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-new-voter',
  templateUrl: './new-voter.component.html',
  styleUrls: ['./new-voter.component.css']
})
export class NewVoterComponent implements OnInit {

  getnewVoter:any;
  searchWeb: string;
  cp: number = 1;
  SearchText:any;
  PageNo:any=1;
  NoofRow:any=10;
  totalItems:any;
  UserId:any;
  RoleId:any;

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }


  constructor(
    private newVoter:NewVoterService,
    private loader:LoaderService,
    private router:Router,
    public alertController: AlertController,
    private toast:IonicToastService,
    private excel:ExcelService,
       private csv:CsvService
    ) { }

  ngOnInit(): void {
   
  }

  ionViewWillEnter(){
    this.UserId = localStorage.getItem("loginId");
    this.RoleId = localStorage.getItem("userType");
    if(this.SearchText == undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText
    }
    this.newVoterList(this.UserId,this.RoleId,this.PageNo,this.NoofRow,this.SearchText);
  }

  newVoterList(UserId:any,RoleId:any,PageNo:any,NoofRow:any,SearchText:any){
    this.loader.showLoading();
    this.newVoter.getAllNewVoter(UserId,RoleId,PageNo,NoofRow,SearchText).subscribe(data=>{
      if(data.length != 0){
        this.loader.hideLoader();
        this.getnewVoter = data;
        this.getnewVoter.forEach(e => {
          e.dob = e.dob.split('T')[0]
        });
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  editNewVoter(data:any){
    this.router.navigateByUrl('/new-voter/edit-new-voter', {state:data});
  }

  async deleteNewVoter(id:any) {
    const alert = await this.alertController.create({
      header: 'Delete Work',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this work',
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
            this.newVoter.deleteNewVoter(id).subscribe(data=>{
              this.ionViewWillEnter()
              this.toast.presentToast("Work deleted Succesfully!", "success", 'checkmark-circle-sharp');
            })
          }
        }
      ],
    });

    await alert.present();
  }

  exportExcel():void {
    this.excel.exportAsExcelFile(this.getnewVoter, 'work');
  }

  exportToCSV() {
    this.csv.exportToCsv(this.getnewVoter, 'work');
  }

}
