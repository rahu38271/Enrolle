import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { AnnapurnaService } from 'src/app/services/annapurna.service';


@Component({
  selector: 'app-edit-annapurna',
  templateUrl: './edit-annapurna.component.html',
  styleUrls: ['./edit-annapurna.component.css']
})
export class EditAnnapurnaComponent implements OnInit {
  annapurnaModal: any;
  constructor(
    private router:Router,
    private loader:LoaderService,
    private toast:IonicToastService,
    private annapurna:AnnapurnaService
  ) { }

  ngOnInit(): void {
    this.annapurnaModal = this.router.getCurrentNavigation().extras.state
  }

 

  EditAnnapurna(){
    debugger;
    this.loader.showLoading();
    this.annapurnaModal.yadiNo_PartNo = Number(this.annapurnaModal.yadiNo_PartNo);
    this.annapurnaModal.srNo = Number(this.annapurnaModal.srNo);
    this.annapurnaModal.tokenNo = Number(this.annapurnaModal.tokenNo);
    this.annapurnaModal.id = Number(this.annapurnaModal.id);
    if(this.annapurnaModal.cardDone == true){
      this.annapurnaModal.cardDone = 'Y'
    }
    else{
      this.annapurnaModal.cardDone = 'N'
    }
    this.annapurna.addSingleAnnapurna(this.annapurnaModal).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
        this.annapurnaModal={}
        this.toast.presentToast("Annapurna added successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/annapurna']);
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Annapurna not saved", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

}
