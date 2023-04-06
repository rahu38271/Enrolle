import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
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
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-voter-details',
  templateUrl: './voter-details.component.html',
  styleUrls: ['./voter-details.component.scss'],
})
export class VoterDetailsComponent {

  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('myDiv') myDiv: ElementRef;
  @ViewChild('tr1') tr1: ElementRef;
  @ViewChild('tr2') tr2: ElementRef;
  @ViewChild('tr3') tr3: ElementRef;
  @ViewChild('tr4') tr4: ElementRef;
  @ViewChild('tr5') tr5: ElementRef;
  @ViewChild('tr6') tr6: ElementRef;
  @ViewChild('tr7') tr7: ElementRef;
  //@ViewChild('myImg') myImg: ElementRef;

  text: string = ''
  imgurl: string = 'https://cdn.pixabay.com/photo/2019/12/26/05/10/pink-4719682_960_720.jpg'

  ImagePath = ''
  VoterListByUser: any;
  id: any;
  RoleId: any;
  colorUpdate: any = {};
  YesNo: any;
  pageNo: any = 1;
  NoofRow: any = 100;


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

  //isStar: any;
  Voter: any = {}
  Vid: any;
  roleID: any;
  mobUpdate: any = {

  }
  adrsUpdate: any = {}
  altmobUpdate: any = {};
  starUpdare: any = {};
  deadAlive: any = {};
  voteStatusUpdate: any = {}
  showStar: boolean;
  showVote: boolean;

  bgColor = '#FFF';
  assemblyName1: any;
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
      private location: Location,
      private alertController: AlertController,
      private bluetoothSerial: BluetoothSerial,
      private toastCtrl: ToastController
    ) {

  }

  ngOnInit() {
    this.assemblyName1 = localStorage.getItem("loginAssembly");
    this.Voter = this.router.getCurrentNavigation().extras.state
    //pipe(map(() => window.history.state))
    this.voterDetails();
  }

  voterDetails() {
    //this.loader.showLoading();
    this.VoterListByUser = this.Voter;

    // to get star checked if voter is star voter or not 

    if (this.VoterListByUser.starVoter == null || this.VoterListByUser.starVoter == "N") {
      this.showStar = !this.showStar
    }
    else {
      this.showStar = this.showStar
    }

    //to get if voter is voted or not

    if (this.VoterListByUser.isVoted == null || this.VoterListByUser.isVoted == "N") {
      this.showVote = !this.showVote
    }
    else {
      this.showVote = this.showVote
    }

    //to get radio button checked if voter is alive or dead

    if (this.VoterListByUser.isAlive == "Y") {
      this.VoterListByUser.isAlive = 1
    }
    else {
      this.VoterListByUser.isAlive = 0
    }

    //to get color checked if voter is supporter, opposite, doubtful or other
    if (this.VoterListByUser.votingInclination == "Supporter") {
      this.bgColor = '#0bbb5f'
    }
    else if (this.VoterListByUser.votingInclination == "Opposition") {
      this.bgColor = '#F00'
    }
    else if (this.VoterListByUser.votingInclination == "Doubtful") {
      this.bgColor = '#ffd34f'
    }
    else if (this.VoterListByUser.votingInclination == "Other") {
      this.bgColor = '#fff'
    }

  }

  family(id: any) {
    this.router.navigate(['/voterdata-management/family', { Id: id }])
  }

  sameAddressVoter(id: any) {
    this.router.navigate(['/voterdata-management/family', { Id: id }])
  }

  // edit mobile number

  saveMobile() {
    this.id = this.Voter.id;
    this.mobUpdate.Id = Number(this.id);
    this.voter.updateMob(this.mobUpdate.Id, this.mobUpdate.Mobile).subscribe(data => {
      if (data) {
        this.voterDetails();
        this.closeModal();
        this.toast.presentToast("Mobile No. updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.toast.presentToast("Mobile No. not updated", "danger", 'alert-circle-sharp');
      }
    }, (_err) => {
      this.toast.presentToast("Mobile No. not updated", "danger", 'alert-circle-sharp');
    })
  }

  // edit alt. mob.

  saveAltMobile() {
    this.id = this.Voter.id;
    this.altmobUpdate.Id = Number(this.id);
    this.voter.updateAltMob(this.altmobUpdate.Id, this.altmobUpdate.AlternateMobileNo).subscribe(data => {
      if (data) {
        this.voterDetails();
        this.closeModal();
        this.toast.presentToast("Mobile No. updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.toast.presentToast("Mobile No. not updated", "danger", 'alert-circle-sharp');
      }
    }, (_err) => {
      this.toast.presentToast("Mobile No. not updated", "danger", 'alert-circle-sharp');
    })
  }

  // edit voter address

  saveAddress() {
    this.id = this.Voter.id;
    this.adrsUpdate.Id = Number(this.id);
    this.voter.updateAdrs(this.adrsUpdate.Id, this.adrsUpdate.Address).subscribe(data => {
      if (data) {
        this.voterDetails();
        this.closeModal();
        this.toast.presentToast("Address updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.toast.presentToast("Address not updated", "danger", 'alert-circle-sharp');
      }
    }, (_err) => {
      this.toast.presentToast("Address not updated", "danger", 'alert-circle-sharp');
    })
  }


  // voter select color for supporter

  supporter() {
    this.bgColor = '#0bbb5f'
    this.id = this.Voter.id;
    this.colorUpdate.id = Number(this.id);
    this.colorUpdate.colour = 'Supporter'
    this.voter.updateColor(this.colorUpdate.id, this.colorUpdate.colour).subscribe(data => {
      if (data) {
        this.voterDetails();
      }
    })
  }

  // voter select color for opposition

  opposition() {
    this.bgColor = '#F00'
    this.id = this.Voter.id;
    this.colorUpdate.id = Number(this.id);
    this.colorUpdate.colour = 'Opposition'
    this.voter.updateColor(this.colorUpdate.id, this.colorUpdate.colour).subscribe(data => {
      if (data) {
        this.voterDetails();
      }
    })
  }

  doubtful() {
    this.bgColor = '#ffd34f'
    this.id = this.Voter.id;
    this.colorUpdate.id = Number(this.id);
    this.colorUpdate.colour = 'Doubtful'
    this.voter.updateColor(this.colorUpdate.id, this.colorUpdate.colour).subscribe(data => {
      if (data) {
        this.voterDetails();
      }
    })
  }

  other() {
    this.bgColor = '#fff'
    this.id = this.Voter.id;
    this.colorUpdate.id = Number(this.id);
    this.colorUpdate.colour = 'Other'
    this.voter.updateColor(this.colorUpdate.id, this.colorUpdate.colour).subscribe(data => {
      if (data) {
        this.voterDetails();
      }
    })
  }

  // update star voter

  // toggleStar() {
  //   this.showStar = !this.showStar;
  //   this.id = this.Voter.id;
  //   this.starUpdare.id = Number(this.id);
  //   this.starUpdare.YesNo = 'Y';
  //   this.voter.updateStar(this.starUpdare.id, this.starUpdare.YesNo).subscribe(data => {
  //     if (data) {
  //       this.voterDetails();
  //       this.toast.presentToast("Starred successfully!", "success", 'checkmark-circle-sharp');
  //     }
  //     else {
  //       this.toast.presentToast("Starred not updated", "danger", 'alert-circle-sharp');
  //     }
  //   }, (_err) => {
  //     this.toast.presentToast("Starred not updated", "danger", 'alert-circle-sharp');
  //   })
  // }

  toggleStar() {
    debugger;
    this.id = this.Voter.id;
    this.starUpdare.id = Number(this.id);
    this.showStar = !this.showStar;
    if (!this.showStar) {
      this.showStar == !this.showStar;
      this.starUpdare.YesNo = 'Y';
      this.voter.updateStar(this.starUpdare.id, this.starUpdare.YesNo).subscribe(data => {
        if (data) {
          this.voterDetails();
          this.toast.presentToast("Starred successfully!", "success", 'checkmark-circle-sharp');
        }
        else {
          this.toast.presentToast("Starred not updated", "danger", 'alert-circle-sharp');
        }
      }, (_err) => {
        this.toast.presentToast("Starred not updated", "danger", 'alert-circle-sharp');
      })
    }
    if (this.showStar) {
      this.showStar == this.showStar
      this.starUpdare.YesNo = 'N';
      this.voter.updateStar(this.starUpdare.id, this.starUpdare.YesNo).subscribe(data => {
        if (data) {
          this.voterDetails();
          this.toast.presentToast("Starred removed successfully!", "success", 'checkmark-circle-sharp');
        }
        else {
          this.toast.presentToast("Starred not updated", "danger", 'alert-circle-sharp');
        }
      }, (_err) => {
        this.toast.presentToast("Starred not updated", "danger", 'alert-circle-sharp');
      })
    }
  }

  // update isvoted status

  toggleVote() {
    this.id = this.Voter.id;
    this.voteStatusUpdate.id = Number(this.id);
    this.showVote = !this.showVote;
    if (!this.showVote) {
      this.voteStatusUpdate.YesNo = 'Y';
      this.voter.updateVotedStatus(this.voteStatusUpdate.id, this.voteStatusUpdate.YesNo).subscribe(data => {
        if (data) {
          this.voterDetails();
          this.toast.presentToast("Vote status updated successfully!", "success", 'checkmark-circle-sharp');
        }
        else {
          this.toast.presentToast("Vote status not updated", "danger", 'alert-circle-sharp');
        }
      }, (_err) => {

      })
    }
    if (this.showVote) {
      this.voteStatusUpdate.YesNo = 'N';
      this.voter.updateVotedStatus(this.voteStatusUpdate.id, this.voteStatusUpdate.YesNo).subscribe(data => {
        if (data) {
          this.voterDetails();
          this.toast.presentToast("Vote status updated successfully!", "success", 'checkmark-circle-sharp');
        }
        else {
          this.toast.presentToast("Vote status not updated", "danger", 'alert-circle-sharp');
        }
      }, (_err) => {

      })
    }
  }

  //update dead or alive voter
  aliveDead() {
    this.id = this.Voter.id;
    this.deadAlive.Id = Number(this.id);
    this.voter.updateAliveDead(this.deadAlive.Id, this.deadAlive.YesNo).subscribe(data => {
      if (data) {
        this.voterDetails();
        this.closeModal();
        this.toast.presentToast("Voter updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.toast.presentToast("Voter not updated", "danger", 'alert-circle-sharp');
      }
    }, (_err) => {
      this.toast.presentToast("Mobile No. not updated", "danger", 'alert-circle-sharp');
    })
  }



  // voterDetails() {
  //   this.loader.showLoading();
  //   this.VoterListByUser = this.Voter;
  //   console.log(this.Voter)
  //      to get star checked if voter is star voter or not 
  //     if(this.VoterListByUser.starVoter == null || this.VoterListByUser.starVoter == "N"){
  //       this.showStar =  !this.showStar
  //     }
  //     else{
  //       this.showStar =  this.showStar
  //     }
  //   this.id = localStorage.getItem("loginId");
  //   this.RoleId = localStorage.getItem("userType");
  //   this.voter.getVoterByUser(this.id, this.RoleId, this.pageNo,this.NoofRow).subscribe((data) => {
  //     this.loader.hideLoader();
  //     debugger;
  //     const Vid = this.route.snapshot.paramMap.get('id');
  //     console.log(data.filter((Voter) => Voter.id == Vid))
  //     this.Voter = data.filter((Voter) => Voter.id == Vid);



  //     to get if voter is voted or not
  //     if(this.VoterListByUser.isVoted == null || this.VoterListByUser.isVoted == "N"){
  //       this.showVote =  !this.showVote
  //     }
  //     else{
  //       this.showVote =  this.showVote
  //     }
  //     to get color checked if voter is supporter, opposite, doubtful or other
  //     if (this.VoterListByUser.votingInclination == "Supporter") {
  //        this.bgColor = '#0bbb5f'
  //     }
  //     else if (this.VoterListByUser.votingInclination == "Opposition") {
  //       this.bgColor = '#F00'
  //     }
  //     else if (this.VoterListByUser.votingInclination == "Doubtful") {
  //       this.bgColor = '#ffd34f'
  //     }
  //     else if (this.VoterListByUser.votingInclination == "Other") {
  //       this.bgColor = '#fff'
  //     }
  //   },(err)=>{
  //     this.loader.hideLoader();
  //   })
  // }

  sameBoothVoter(id: any) {
    const coloumnValue = this.VoterListByUser.partNo;
    this.router.navigate(['/list/boothwise-list', { Id: id }])
  }

  goback() {
    this.location.back();
  }

  onSubmit() {

  }

  printSlip() {
    this.content = document.getElementById('slipDesign').innerHTML;
    let options = {
      documentSize: 'a7',
      type: 'share',
      //landscape: 'portrait', 86mm x 54mm
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

  //   ShareWhatsapp() {
  //     this.socialSharing.shareViaWhatsApp(this.ImagePath);
  //     console.log(this.ImagePath)
  //   }
  // }

  ShareWhatsapp() {
    this.socialSharing.shareViaWhatsApp
      (
        this.myDiv.nativeElement.innerText
        + '\n' + this.tr1.nativeElement.innerText
        + '\n' + this.tr2.nativeElement.innerText
        + '\n' + this.tr3.nativeElement.innerText
        + '\n' + this.tr4.nativeElement.innerText
        + '\n' + this.tr5.nativeElement.innerText
        + '\n' + this.tr6.nativeElement.innerText
        + '\n' + this.tr7.nativeElement.innerText
      );
    //console.log(this.tr1.nativeElement.innerText);
  }

  ShareWhatsapp1() {
    this.socialSharing.shareViaWhatsApp(this.myDiv.nativeElement.innerText
      + '\n' + this.tr1.nativeElement.innerText
      + '\n' + this.tr2.nativeElement.innerText
      + '\n' + this.tr3.nativeElement.innerText
      + '\n' + this.tr4.nativeElement.innerText
      + '\n' + this.tr5.nativeElement.innerText
      + '\n' + this.tr6.nativeElement.innerText
      + '\n' + this.tr7.nativeElement.innerText, this.imgurl)
  }

}




