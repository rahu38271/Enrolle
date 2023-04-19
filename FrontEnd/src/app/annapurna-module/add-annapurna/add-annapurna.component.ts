import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service'; 
import { AnnapurnaService } from 'src/app/services/annapurna.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-annapurna',
  templateUrl: './add-annapurna.component.html',
  styleUrls: ['./add-annapurna.component.css']
})
export class AddAnnapurnaComponent implements OnInit {

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
      return true
    }
    else {
      return false
    }
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  annapurnaModal:any={};

  constructor(
    private loader:LoaderService,
    private toast:IonicToastService,
    private annapurna:AnnapurnaService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  saveAnnapurna(){
    debugger;
    this.annapurnaModal.YadiNo_PartNo = Number(this.annapurnaModal.YadiNo_PartNo);
    this.annapurnaModal.SrNo = Number(this.annapurnaModal.SrNo);
    this.annapurnaModal.TokenNo = Number(this.annapurnaModal.TokenNo);
    if(this.annapurnaModal.CardDone == true){
      this.annapurnaModal.CardDone = 'Y'
    }
    else{
      this.annapurnaModal.CardDone = 'N'
    }
    this.loader.showLoading();
    this.annapurna.addSingleAnnapurna(this.annapurnaModal).subscribe(data=>{
      if(data){
        console.log(data);
        this.loader.hideLoader();
        this.annapurnaModal = {}
        this.toast.presentToast("Annapurna added successfully!", "success", 'checkmark-circle-sharp');
        this.router.navigate(['/annapurna']);
      }
      else{
        this.loader.hideLoader();
        this.toast.presentToast("Annapurna not saved", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.loader.hideLoader();
      this.toast.presentToast("Something went wrong", "danger", 'alert-circle-sharp');
    })
  }

}
