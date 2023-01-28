import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
//import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PopoverController } from '@ionic/angular';
import { VoterService } from 'src/app/services/voter.service'
import { ActivatedRoute } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { Router } from '@angular/router'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';


@Component({
  selector: 'app-voter-details',
  templateUrl: './voter-details.component.html',
  styleUrls: ['./voter-details.component.scss'],
})
export class VoterDetailsComponent {

  @ViewChild(IonModal) modal: IonModal;
  VoterListByUser: any;
  Id: any;
  id: any;
  starUpdate: any = {};
  colorUpdate: any;
  YesNo: any;

  @ViewChild('slipDesign') slipDesign: ElementRef;

  ngAfterViewInit() {
    //console.log(this.slipDesign.nativeElement.innerHTML);
}
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async DismissClick() {
    await this.popoverController.dismiss();
  }

  isStar: boolean;
  Voter: any = ''
  Vid: any;
  mobUpdate: any = {

  }
  adrsUpdate: any = {}
  altmobUpdate: any = {};
  showStar: boolean;
  showVote: boolean;

  toggleVote() {
    this.showVote = !this.showVote;
  }

  bgColor = '#FFF';

  closeModal() {
    this.modalCtrl.dismiss();
  }

  content: string;

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

  constructor
    (
      private pdfGenerator: PDFGenerator,
      private socialSharing: SocialSharing,
      public popoverController: PopoverController,
      private voter: VoterService,
      private route: ActivatedRoute,
      private loader: LoaderService,
      private router: Router,
      private toast: IonicToastService,
      public modalCtrl: ModalController,
      private location: Location
    ) {

  }

  ngOnInit() {
    this.voterDetails();
  }

  family(id: any) {
    this.router.navigate(['/voterdata-management/family', { Id: id }])
  }

  sameAddressVoter(id:any){
    this.router.navigate(['/voterdata-management/family', {Id: id}])
  }

  saveMobile() {
    const Vid = this.route.snapshot.paramMap.get('id');
    this.mobUpdate.Id = Number(Vid);
    this.voter.updateMob(this.mobUpdate.Id, this.mobUpdate.Mobile).subscribe(data => {
      if (data) {
        this.voterDetails();
        this.closeModal();
        this.toast.presentToast("Mobile No. updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.toast.presentToast("Mobile No. not updated", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.toast.presentToast("Mobile No. not updated", "danger", 'alert-circle-sharp');
    })
  }

  saveAltMobile() {
    const Vid = this.route.snapshot.paramMap.get('id');
    this.altmobUpdate.Id = Number(Vid);
    this.voter.updateAltMob(this.altmobUpdate.Id, this.altmobUpdate.AlternateMobileNo).subscribe(data => {
      if (data) {
        this.voterDetails();
        this.closeModal();
        this.toast.presentToast("Mobile No. updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.toast.presentToast("Mobile No. not updated", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.toast.presentToast("Mobile No. not updated", "danger", 'alert-circle-sharp');
    })
  }
  


  saveAddress() {
    const Vid = this.route.snapshot.paramMap.get('id');
    this.adrsUpdate.Id = Number(Vid);
    this.voter.updateAdrs(this.adrsUpdate.Id, this.adrsUpdate.Address).subscribe(data => {
      if (data) {
        this.voterDetails();
        this.closeModal();
        this.toast.presentToast("Address updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else{
        this.toast.presentToast("Address not updated", "danger", 'alert-circle-sharp');
      }
    },(err)=>{
      this.toast.presentToast("Address not updated", "danger", 'alert-circle-sharp');
    })
  }

  supporter() {
    this.bgColor = '#0bbb5f'
    const Vid = this.route.snapshot.paramMap.get('id');
    this.colorUpdate.Id = Number(Vid);
    this.voter.updateColor(this.colorUpdate.Id,this.colorUpdate.Colour).subscribe(data=>{
    })
  }

  opposition() {
    this.bgColor = '#F00'
  }

  doubtful() {
    this.bgColor = '#ffd34f'
  }

  other() {
    this.bgColor = '#fff'
  }

 

  voterDetails() {
    this.loader.showLoading();
    this.id = localStorage.getItem("loginId");
    this.voter.getVoterByUser(this.id).subscribe((data) => {
      this.loader.hideLoader();
      const Vid = this.route.snapshot.paramMap.get('id');
      [this.Voter] = data.filter((Voter) => Voter.id == Vid);
      this.VoterListByUser = this.Voter;
    })
  }

  sameBoothVoter(id:any){
    debugger;
    const coloumnValue = this.VoterListByUser.partNo;
    this.router.navigate(['/list/boothwise-list', {Id: id}])
  }

  goback(){
    this.location.back();
  }

  toggleStar() {
    this.showStar = !this.showStar;
    const Vid = this.route.snapshot.paramMap.get('id');
    this.id = Number(Vid);
    this.voter.updateStar(this.id, this.YesNo).subscribe(data => {
      if (data) {
        this.voterDetails();
        this.toast.presentToast("Starred successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.toast.presentToast("Starred not updated", "danger", 'alert-circle-sharp');
      }
    }, (err) => {
      this.toast.presentToast("Starred not updated", "danger", 'alert-circle-sharp');
    })
  }

  printSlip() {
    this.content = document.getElementById('slipDesign').innerHTML;
    let options = {
      documentSize: 'a7',
      type: 'share',
      // landscape: 'portrait', 86mm x 54mm
      fileName: 'voter slip.pdf'
    };
    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        console.log('OK', base64);
      }).catch((error) => {
        console.log('error', error);
      });

  }

  // share() {
  //   var options = {
  //     message: 'Share',
  //     url: 'https://ionicframework.com/docs/native/social-sharing',
  //   };
  //   this.socialSharing.shareWithOptions(options);
  // }

  ShareWhatsapp(){
    console.log(this.slipDesign.nativeElement.innerHTML);
    //this.socialSharing.shareViaWhatsApp(this.slipDesign.nativeElement.innerHTML)
  }

}
