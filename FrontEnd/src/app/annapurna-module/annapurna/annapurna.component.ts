import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js'
import { AnnapurnaService } from 'src/app/services/annapurna.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router'
import { IonicToastService }  from 'src/app/services/ionic-toast.service'

@Component({
  selector: 'app-annapurna',
  templateUrl: './annapurna.component.html',
  styleUrls: ['./annapurna.component.css']
})
export class AnnapurnaComponent implements OnInit {

  year : number = new Date().getFullYear();
  searchWeb:string;
  myForm1: any;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  getAnnapurna: any;

  closeModal() {
    this.modalCtrl.dismiss();
  }

  constructor(
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private loader: LoaderService,
    public toast: IonicToastService,
    private annapurna:AnnapurnaService,
    private router:Router
    ) { }

    ngOnInit() {
      this.annapurnaList();
    }

  annapurnaList(){
    debugger;
    this.loader.showLoading();
    
    this.annapurna.getAnnapurnaList().subscribe(data=>{
      if(data != 0){
        this.loader.hideLoader();
        this.getAnnapurna = data
        this.getAnnapurna.forEach(e => {
          e.tokenDate = e.tokenDate.split('T')[0];
        });
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  editAnnapurna(data:any){
    debugger;
    this.router.navigateByUrl('/annapurna/edit-annapurna', {state:data})
  }

  resetForm(){
    this.myForm1.reset();
  }

  async deleteAnp(id:any) {
    const alert = await this.alertController.create({
      header: 'Delete Annapurna',
      cssClass: 'alertHeader',
      message: 'Are you sure want to delete this Annapurna',
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
            this.annapurna.deleteAnnapurna(id).subscribe(data=>{
              this.toast.presentToast("Annapurna deleted Succesfully!", "success", 'checkmark-circle-sharp');
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
    var element = document.getElementById('table13');
    
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
