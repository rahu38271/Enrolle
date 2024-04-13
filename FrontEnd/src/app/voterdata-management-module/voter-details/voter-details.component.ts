import { Component, OnInit, ViewChild, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { VoterService } from 'src/app/services/voter.service';
import { ActivatedRoute, Router, NavigationEnd, NavigationExtras } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { IonModal, NavController, PopoverController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { SMS } from '@ionic-native/sms/ngx';
import { PrintService } from 'src/app/services/print.service';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { SettingService } from 'src/app/services/setting.service';
import { Base64Service } from 'src/app/services/base64.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-voter-details',
  templateUrl: './voter-details.component.html',
  styleUrls: ['./voter-details.component.scss'],
})
export class VoterDetailsComponent {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  imageBitmap: ImageBitmap;
  imageUrl: string = 'http://localhost:8100/assets/img/user.jpg';
  //imageUrl: string = 'https://innovarticsolutions.com/images/bulk-sms-01.png'; // This will hold the URL of the image
  base64Image: string = ''; // This will hold the Base64 encoded image
  dataToPrint :any
  voterAssembly:any;
  voterPartNo:any;
  voterName:any;
  isConnected:any;
  url: string = 'https://innovarticsolutions.com/images/bulk-sms-01.png';
  base64String: string = '';
  //unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: boolean = false;
  printerAddress: any;
  device: any;
  //isPrinterList=false;
  deviceName: any;
  deviceAddress: any;
  columnName: any;
  partNo: any;
  address: any;
  Language: any;
  Vid: any;
  voterInfoData: any;
  starUpdare: any = {};
  voteStatusUpdate: any = {}
  colorUpdate: any = {};
  mobUpdate: any = {};
  altmobUpdate: any = {};
  deadAlive: any = {};
  BirthdateUpdate: any = {};
  societyUpdate: any = {}
  CasteUpdate: any = {};
  professionUpdate: any = {}
  ProfessionName: any;
  professionModal: any = {};
  profModal: any = {}
  casteModal: any = {}
  houseUpdate: any = {};
  adrsUpdate: any = {}
  slipModal: any = {}
  showStar: boolean;
  showVote: boolean;
  id: any;
  imgurl: any;
  bgColor = '#FFF';
  casteList: any;
  professionList: any;
  engAssembly = false;
  nonEngAssembly = false;
  isAssembly = true;
  assemblyName: any;
  assemblyNameByLang: any;
  setMobile: any;
  setAltMob: any;
  setDOB: any;
  setSociety: any;
  setHouseNo: any;
  setAddress: any;
  setStar: any;
  setVote: any;
  setColor: any;
  setAlive: any;
  setProf: any;
  setCaste: any;
  setPartNo: any;
  setName: any;
  ColoumnValue: any;
  text: string;
  htmlContent: string;
  userId: any;
  whatsText: any;
  msgText: any;
  mobileNo: any;
  message: any;
  media_url: any;
  fileName: any;
  instance_id: any;
  access_token: any;
  isPrinterList: boolean;
  bitmapData: string;
  convertedImage: Promise<void>;

  closeModal() {
    this.modalCtrl.dismiss();
  }
  year = new Date().getFullYear();
  maxDate: String = new Date().toISOString();
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('myDiv') myDiv: ElementRef;
  @ViewChild('tr1') tr1: ElementRef;
  @ViewChild('tr2') tr2: ElementRef;
  @ViewChild('tr3') tr3: ElementRef;
  @ViewChild('tr4') tr4: ElementRef;
  @ViewChild('tr5') tr5: ElementRef;
  @ViewChild('tr6') tr6: ElementRef;
  @ViewChild('tr7') tr7: ElementRef;
  @ViewChild('tr8') tr8: ElementRef;
  @ViewChild('p') p: ElementRef;
  
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

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async DismissClick() {
    await this.popoverController.dismiss();
  }

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
      return true
    }
    else {
      return false
    }
  }

  constructor(
    private translateConfigService: TranslateConfigService,
    public translate: TranslateService,
    private voter: VoterService,
    private route: ActivatedRoute,
    private router: Router,
    private loader: LoaderService,
    private toast: IonicToastService,
    private socialSharing: SocialSharing,
    public popoverController: PopoverController,
    public modalCtrl: ModalController,
    private sms: SMS,
    private alertController: AlertController,
    private printService: PrintService,
    private bluetoothSerial: BluetoothSerial,
    private toastController: ToastController,
    private setting: SettingService,
    private base64Service:Base64Service,
    private http: HttpClient,
    private renderer: Renderer2
  ) {
    this.Language = this.translateConfigService.getCurrentLang();
    if (this.Language == 'en') {
      this.engAssembly = true;
    }
    else {
      this.nonEngAssembly = true;
    }
    if (this.Language == "kn") {
      this.Language = "Kannada"
    }
    else if (this.Language == "mr") {
      this.Language = "Marathi"
    }
    else if (this.Language == "hi") {
      this.Language = "Hindi"
    }
    else {
      this.Language = "English"
    }
  }

  ngOnInit(): void {
    this.Vid = this.route.snapshot.paramMap.get('id');
    this.assemblyName = localStorage.getItem("loginAssembly");
    this.userId = localStorage.getItem('loginId');
    this.setting.getWhatsappImage(this.userId).subscribe(data => {
      if (data) {
        this.saveFile(data);
        this.fetchImage(data);
        this.imgurl = true;
      }
    })
    this.setting.getWhatsappText(this.userId).subscribe(data => {
      if (data) {
        this.whatsText = data;
        this.msgText = data[0].messageContent;
      }
      else {

      }
    }, (err) => {

    })
  }

  saveFile(imageData: Blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(imageData);

  }

  // to download image from get api
  fetchImage(image: Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imgurl = reader.result as string;
    };
    reader.readAsDataURL(image);
  }


  ionViewWillEnter() {
    this.voterInfo();
    this.AllCasts();
    this.allProfession();
    this.assemblyNameLang();
    if (this.assemblyName == "null") {
      this.isAssembly = !this.isAssembly;
    }
    else {
      this.isAssembly = this.isAssembly;
    }
  }




  voterInfo() {
    this.voter.getVoterById(this.Vid, this.Language).subscribe(data => {
      if (data) {
        this.voterInfoData = data;
        this.setAddress = data[0].address;
        this.setMobile = data[0].mobileNo;
        this.setAltMob = data[0].alternateMobileNo;
        this.setDOB = data[0].birthDate.split('T')[0];
        this.setSociety = data[0].society;
        this.setHouseNo = data[0].houseNo;
        this.setStar = data[0].starVoter;
        this.setVote = data[0].isVoted;
        this.setColor = data[0].votingInclination;
        this.setAlive = data[0].isAlive;
        this.setProf = data[0].occupation;
        this.setCaste = data[0].caste;
        this.setPartNo = data[0].partNo;
        this.setName = data[0].fullName;
        if (this.setStar == "N" || this.setStar == null) {
          this.showStar = this.showStar
        }
        else {
          this.showStar = !this.showStar
        }
        if (this.setVote == "N" || this.setVote == null) {
          this.showVote = this.showVote
        }
        else {
          this.showVote = !this.showVote
        }
        if (this.setColor == "Supporter") {
          this.bgColor = '#0bbb5f'
        }
        else if (this.setColor == "Opposition") {
          this.bgColor = '#F00'
        }
        else if (this.setColor == "Doubtful") {
          this.bgColor = '#ffd34f'
        }
        else if (this.setColor == "Other") {
          this.bgColor = '#fff'
        }
        if (this.setAlive == "Y") {
          this.voterInfoData.isAlive = "Y"
          this.deadAlive.YesNo = "Y"
        }
        else if (this.setAlive == "N") {
          this.voterInfoData.isAlive = "N"
          this.deadAlive.YesNo = "N"
        }
        else if (this.setAlive == null) {
          this.voterInfoData.isAlive = ''
          this.deadAlive.YesNo = ""
        }
        this.adrsUpdate.Address = this.setAddress;
        this.mobUpdate.Mobile = this.setMobile;
        this.altmobUpdate.AlternateMobileNo = this.setAltMob;
        this.BirthdateUpdate.ColoumnValue = this.setDOB;
        this.societyUpdate.ColoumnValue = this.setSociety;
        this.houseUpdate.ColoumnValue = this.setHouseNo;
        this.professionUpdate.ColoumnValue = this.setProf;
        this.profModal.ProfessionName = this.setProf;
        this.CasteUpdate.ColoumnValue = this.setCaste;
        this.casteModal.CasteName = this.setCaste;
        this.voterInfoData.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });

      }
      else {

      }
    }, (err) => {


    })

  }

  // add address

  saveAddress() {
    this.id = this.Vid;
    this.adrsUpdate.Id = Number(this.id);
    this.voter.updateAdrs(this.adrsUpdate.Id, this.adrsUpdate.Address).subscribe(data => {
      if (data) {
        this.voterInfo();
        this.closeModal();
        this.toast.presentToast("Address updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.toast.presentToast("Address not updated", "danger", 'alert-circle-sharp');
      }
    }, (_err) => {

    })
  }

  // edit mobile number

  saveMobile() {
    this.id = this.Vid;
    this.mobUpdate.Id = Number(this.id);
    this.voter.updateMob(this.mobUpdate.Id, this.mobUpdate.Mobile).subscribe(data => {
      if (data) {
        this.voterInfo();
        this.closeModal();
        this.toast.presentToast("Mobile No. updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.toast.presentToast("Mobile No. not updated", "danger", 'alert-circle-sharp');
      }
    }, (_err) => {


    })
  }

  // edit alt. mob.

  saveAltMobile() {
    this.id = this.Vid;
    this.altmobUpdate.Id = Number(this.id);
    this.voter.updateAltMob(this.altmobUpdate.Id, this.altmobUpdate.AlternateMobileNo).subscribe(data => {
      if (data) {
        this.voterInfo();
        this.closeModal();
        this.toast.presentToast("Mobile No. updated successfully!", "success", 'checkmark-circle-sharp');

      }
      else {
        this.toast.presentToast("Mobile No. not updated", "danger", 'alert-circle-sharp');
      }
    }, (_err) => {

    })
  }

  // add Birthdate

  saveBirthdate() {
    this.id = this.Vid;
    this.BirthdateUpdate.Id = Number(this.id);
    this.BirthdateUpdate.ColoumnName = "Birthdate"
    this.voter.updateDoB(this.BirthdateUpdate.Id, this.BirthdateUpdate.ColoumnName, this.BirthdateUpdate.ColoumnValue).subscribe(data => {
      if (data) {
        this.voterInfo();
        this.closeModal();
        this.toast.presentToast("Birthdate updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
      }
    }, (err) => {

    })
  }


  addProfession() {
    this.voter.addProf(this.profModal).subscribe(data => {
      if (data) {
        this.professionList = data;
        this.closeModal();
        this.ionViewWillEnter();
        this.toast.presentToast("Profession added successfully!", "success", 'checkmark-circle-sharp');
      }
      else {

      }
    }, (err) => {

    })
  }

  // add society

  saveSociety() {
    this.id = this.Vid;
    this.societyUpdate.Id = Number(this.id);
    this.societyUpdate.ColoumnName = "Society"
    this.voter.updateSociety(this.societyUpdate.Id, this.societyUpdate.ColoumnName, this.societyUpdate.ColoumnValue).subscribe(data => {
      if (data) {
        this.voterInfo();
        this.closeModal();
        this.toast.presentToast("society updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {

      }
    }, (err) => {

    })
  }

  // add houseNo

  saveHouseNo() {
    this.id = this.Vid;
    this.houseUpdate.Id = Number(this.id);
    this.houseUpdate.ColoumnName = "HouseNo"
    this.voter.updateHouse(this.houseUpdate.Id, this.houseUpdate.ColoumnName, this.houseUpdate.ColoumnValue).subscribe(data => {
      if (data) {
        this.voterInfo();
        this.closeModal();
        this.toast.presentToast("HouseNo updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {

      }
    }, (err) => {

    })
  }

  AllCasts() {
    if (this.Language == "kn") {
      this.Language = "Kannada"
    }
    else if (this.Language == "mr") {
      this.Language = "Marathi"
    }
    else if (this.Language == "hi") {
      this.Language = "Hindi"
    }
    else {
      this.Language = "English"
    }
    this.voter.getAllCaste(this.Language).subscribe(data => {
      this.casteList = data;
    })
  }

  // change caste from select dropdown
  AllCasts1(ColoumnValue) {
    this.id = this.Vid;
    this.CasteUpdate.Id = Number(this.id);
    this.CasteUpdate.ColoumnName = "Caste"
    if (this.CasteUpdate.ColoumnValue == null) {
      this.CasteUpdate.ColoumnValue = '';
    }
    else {
      this.CasteUpdate.ColoumnValue = this.CasteUpdate.ColoumnValue;
    }
    this.voter.updateCaste(this.CasteUpdate.Id, this.CasteUpdate.ColoumnName, this.CasteUpdate.ColoumnValue).subscribe(data => {
      if (data) {
        this.voterInfo();
        this.closeModal();
        this.toast.presentToast("Caste updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {

      }
    }, (err) => {

    })
  }

  // add Caste

  addCaste() {
    this.voter.addSingleCaste(this.casteModal).subscribe(data => {
      if (data) {
        this.casteList = data;
        this.closeModal();
        this.ionViewWillEnter();
        this.toast.presentToast("Caste added successfully!", "success", 'checkmark-circle-sharp');
      }
      else {

      }
    }, (err) => {

    })
  }

  allProfession() {
    this.voter.getAllProfession().subscribe(data => {
      this.professionList = data;
    }, (err) => {

    })
  }

  allProfession1(ColoumnValue) {
    this.id = this.Vid;
    this.professionUpdate.Id = Number(this.id);
    this.professionUpdate.ColoumnName = "Occupation"
    if (this.professionUpdate.ColoumnValue == null) {
      this.professionUpdate.ColoumnValue = '';
    }
    else {
      this.professionUpdate.ColoumnValue = this.professionUpdate.ColoumnValue;
    }
    this.voter.updateProfession(this.professionUpdate.Id, this.professionUpdate.ColoumnName, this.professionUpdate.ColoumnValue).subscribe(data => {
      if (data) {
        this.voterInfo();
        this.closeModal();
        this.ionViewWillEnter();
        this.toast.presentToast("Profession updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {

      }
    }, (err) => {

    })
  }

  //update dead or alive voter
  aliveDead() {
    this.id = this.Vid;
    this.deadAlive.Id = Number(this.id);
    this.voter.updateAliveDead(this.deadAlive.Id, this.deadAlive.YesNo).subscribe(data => {
      if (data) {
        this.voterInfo();
        this.closeModal();
        this.ionViewWillEnter();
        this.toast.presentToast("Voter updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {
        this.toast.presentToast("Voter not updated", "danger", 'alert-circle-sharp');
      }
    }, (_err) => {
      this.toast.presentToast("Mobile No. not updated", "danger", 'alert-circle-sharp');
    })
  }

  // update star voter

  toggleStar() {
    this.id = this.Vid;
    this.starUpdare.id = Number(this.id);
    this.showStar = !this.showStar;
    if (this.showStar) {
      this.showStar == !this.showStar;
      this.starUpdare.YesNo = 'Y';
      this.voter.updateStar(this.starUpdare.id, this.starUpdare.YesNo).subscribe(data => {
        if (data) {
          this.voterInfo();
          this.ionViewWillEnter();
          this.toast.presentToast("Starred successfully!", "success", 'checkmark-circle-sharp');
        }
        else {
          this.toast.presentToast("Starred not updated", "danger", 'alert-circle-sharp');
        }
      }, (_err) => {
        this.toast.presentToast("Starred not updated", "danger", 'alert-circle-sharp');
      })
    }
    if (!this.showStar) {
      this.showStar == this.showStar
      this.starUpdare.YesNo = 'N';
      this.voter.updateStar(this.starUpdare.id, this.starUpdare.YesNo).subscribe(data => {
        if (data) {
          this.voterInfo();
          this.ionViewWillEnter();
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

  // update vote status

  toggleVote() {
    this.id = this.Vid;
    this.voteStatusUpdate.id = Number(this.id);
    this.showVote = !this.showVote;
    if (this.showVote) {
      this.voteStatusUpdate.YesNo = 'Y';
      this.voter.updateVotedStatus(this.voteStatusUpdate.id, this.voteStatusUpdate.YesNo).subscribe(data => {
        if (data) {
          this.voterInfo();
          this.ionViewWillEnter();
          this.toast.presentToast("Vote status updated successfully!", "success", 'checkmark-circle-sharp');
        }
        else {
          this.toast.presentToast("Vote status not updated", "danger", 'alert-circle-sharp');
        }
      }, (_err) => {

      })
    }
    if (!this.showVote) {
      this.voteStatusUpdate.YesNo = 'N';
      this.voter.updateVotedStatus(this.voteStatusUpdate.id, this.voteStatusUpdate.YesNo).subscribe(data => {
        if (data) {
          this.voterInfo();
          this.ionViewWillEnter();
          this.toast.presentToast("Vote status updated successfully!", "success", 'checkmark-circle-sharp');
        }
        else {
          this.toast.presentToast("Vote status not updated", "danger", 'alert-circle-sharp');
        }
      }, (_err) => {

      })
    }
  }

  // share whatsapp slip

  ShareWhatsapp1() {
    debugger;
    //const Mobile = this.VoterListByUser.mobileNo;
    this.socialSharing.shareViaWhatsApp(
      this.myDiv.nativeElement.innerText
      + '\n' + this.tr1.nativeElement.innerText
      + '\n' + this.tr2.nativeElement.innerText
      + '\n' + this.tr3.nativeElement.innerText
      + '\n' + this.tr4.nativeElement.innerText
      + '\n' + this.tr5.nativeElement.innerText
      + '\n' + this.tr6.nativeElement.innerText
      + '\n' + this.tr7.nativeElement.innerText
      + '\n' + this.tr8.nativeElement.innerText
      + '\n' + '----------------------------------------------------',
      //+ '\n' + this.p.nativeElement.innerText,
      this.imgurl
      //Mobile
    )
  }

  ShareWhatsapp() {
    const Mobile = this.setMobile;
    this.socialSharing.shareViaWhatsApp(
      this.myDiv.nativeElement.innerText
      + '\n' + this.tr1.nativeElement.innerText
      + '\n' + this.tr2.nativeElement.innerText
      + '\n' + this.tr3.nativeElement.innerText
      + '\n' + this.tr4.nativeElement.innerText
      + '\n' + this.tr5.nativeElement.innerText
      + '\n' + this.tr6.nativeElement.innerText
      + '\n' + this.tr7.nativeElement.innerText
      + '\n' + this.tr8.nativeElement.innerText
      + '\n' + '----------------------------------------------------'
    )
  }

  // shate text sms

  sendSMS() {
    const phoneNumber = this.setMobile // Replace with the recipient's phone number
    //const message = 'Hello, this is a test SMS!'; // Replace with your message
    const message =
      this.myDiv.nativeElement.innerText
      + '\n' + this.tr1.nativeElement.innerText
      + '\n' + this.tr2.nativeElement.innerText
      + '\n' + this.tr3.nativeElement.innerText
      + '\n' + this.tr4.nativeElement.innerText
      + '\n' + this.tr5.nativeElement.innerText
      + '\n' + this.tr6.nativeElement.innerText
      + '\n' + this.tr7.nativeElement.innerText
      + '\n' + '----------------------------------------------------'
      + '\n' + this.p.nativeElement.innerText
    this.sms.send(phoneNumber, message)
      .then(() => {

        console.log('SMS sent successfully');
      })
      .catch((error) => {
        console.error('Error sending SMS:', error);
      });
  }

  // voter select color for supporter

  supporter() {
    this.bgColor = '#0bbb5f'
    this.id = this.Vid;
    this.colorUpdate.id = Number(this.id);
    this.colorUpdate.colour = 'Supporter'
    this.voter.updateColor(this.colorUpdate.id, this.colorUpdate.colour).subscribe(data => {
      if (data) {
        this.voterInfo();
      }
    })
  }

  // voter select color for opposition

  opposition() {
    this.bgColor = '#F00'
    this.id = this.Vid;
    this.colorUpdate.id = Number(this.id);
    this.colorUpdate.colour = 'Opposition'
    this.voter.updateColor(this.colorUpdate.id, this.colorUpdate.colour).subscribe(data => {
      if (data) {
        this.voterInfo();
      }
    })
  }

  doubtful() {
    this.bgColor = '#ffd34f'
    this.id = this.Vid;
    this.colorUpdate.id = Number(this.id);
    this.colorUpdate.colour = 'Doubtful'
    this.voter.updateColor(this.colorUpdate.id, this.colorUpdate.colour).subscribe(data => {
      if (data) {
        this.voterInfo();
      }
    })
  }

  other() {
    this.bgColor = '#fff'
    this.id = this.Vid;
    this.colorUpdate.id = Number(this.id);
    this.colorUpdate.colour = 'Other'
    this.voter.updateColor(this.colorUpdate.id, this.colorUpdate.colour).subscribe(data => {
      if (data) {
        this.voterInfo();
      }
    })
  }

  assemblyNameLang() {
    this.voter.getAssemblyName(this.assemblyName).subscribe(data => {
      this.assemblyNameByLang = data;
    })
  }

  sameBoothVoter(columnName: any) {
    this.columnName == this.partNo;
    this.router.navigate(['/list/boothwise-list', { partNumber: columnName }])
  }

  sameAddressVoter(columnName: any) {
    this.columnName == this.address;
    this.router.navigate(['/list/addresswise-list', { addressName: columnName }])
  }

  voterByFamily(id: any) {
    this.router.navigate(['/voterdata-management/family', { Id: id }])
  }


  EditSurvey(data: any) {
    this.router.navigateByUrl('/survey/edit-survey', { state: data });
  }

  slipPrint() {
    this.slipModal.id = Number(this.Vid);
    this.slipModal.ColoumnName = "PrintSlip"
    this.slipModal.ColoumnValue = "Y"
    this.voter.addToPrintSlip(this.slipModal.id, this.slipModal.ColoumnName, this.slipModal.ColoumnValue).subscribe(data => {
      if (data) {
        console.log(data)
      } else {

      }
    }, (err) => {

    })
  }

  // bluetooth print

  // openBluetoothSettings() {
  //   debugger;
  //   this.bluetoothSerial.showBluetoothSettings();
  // }

  startScanning() {
    debugger;
    this.pairedDevices = null;
    //this.unpairedDevices = null;
    this.gettingDevices = true;
    const unPair: any[] = [];
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      success.forEach((value: { id: string; }, key: any) => {
        var exists = false;
        unPair.forEach((val2, i) => {
          if (value.id === val2.id) {
            exists = true;
          }
        });
        if (exists === false && value.id !== '') {
          unPair.push(value);
        }
      });
      //this.unpairedDevices = unPair;
      this.selectDevice(this.device.id);
      this.gettingDevices = false;
    },
      (err) => {
        console.log(err);
      });

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    },
      (err) => {

      });
  }

  success = (data: any) => {
    this.deviceConnected();
  }
  fail = (error: any) => {
    alert(error);
  }

  async selectDevice(id: any) {

    const alert = await this.alertController.create({
      header: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            this.bluetoothSerial.connect(id).subscribe(this.success, this.fail);
          }
        }
      ]
    });
    await alert.present();
  }


  deviceConnected() {
    debugger;
    this.bluetoothSerial.isConnected().then(success => {
      alert('Connected Successfullly');
    }, error => {
      alert('error' + JSON.stringify(error));
    });
  }

  async disconnect() {
    const alert = await this.alertController.create({
      header: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    await alert.present();
  }

  change() {
    console.log(this.device);
    this.device = this.device;
  }

  // connect bluetooth device to matadarmaza app
  connectPrinter() {
    debugger;
    //this.printerAddress = "00:15:0E:E7:F0:FC";
    //this.startScanning();
    this.printerAddress = this.device;
    this.printService.connect(this.printerAddress)
      .subscribe(
        () => {
          console.log('Connected to printer');
          this.printData();
        },
        (error) => console.error('Error connecting to printer', error)
      );
  }

  // print voter data with bluetooth printer 
  // printData() {
  //   debugger;
  //   this.myDiv.nativeElement.innerText
  //     + '\n' + this.tr1.nativeElement.innerText
  //     + '\n' + this.tr2.nativeElement.innerText
  //     + '\n' + this.tr3.nativeElement.innerText
  //     + '\n' + this.tr4.nativeElement.innerText
  //     + '\n' + this.tr5.nativeElement.innerText
  //     + '\n' + this.tr6.nativeElement.innerText
  //     + '\n' + this.tr7.nativeElement.innerText
  //     + '\n' + this.tr8.nativeElement.innerText;
  //   this.printService.print(this.dataToPrint)
  //     .then(() => {
  //       console.log('Print successful');
  //       this.closeModal();
  //       this.ionViewWillEnter();
  //       this.toast.presentToast("Slip printed successfully!", "success", 'checkmark-circle-sharp');
  //     })
  //     .catch((error) => console.error('Error printing', error));
  // }


  printData() {
    debugger;
    //const dataToPrint = "Hello"
    const dataToPrint = "Hello"
    this.printService.print(dataToPrint)
      .then(() => {
        console.log('Print successful');
        this.closeModal();
        this.toast.presentToast("Slip printed successfully!", "success", 'checkmark-circle-sharp');
      })
      .catch((error) => console.error('Error printing', error));
  }


  printVoterSlip() {
    debugger;
    this.startScanning();
      this.isPrinterList = true;
      this.selectDevice(this.device.id);
    //this.connectPrinter();
    // this.printData();
  }

  


  // whatsappSlip() {
  //   debugger;
  //   if(this.setMobile==null){
  //     this.toast.presentToast("Please Enter Mobile No.!", "danger", 'checkmark-circle-sharp');
  //   }else{
  //     this.instance_id = "65DC78AA5CA19";
  //     this.access_token = "65dc7765bb24b";
  //     this.message = this.myDiv.nativeElement.innerText
  //       + '\n' + this.tr1.nativeElement.innerText
  //       + '\n' + this.tr2.nativeElement.innerText
  //       + '\n' + this.tr3.nativeElement.innerText
  //       + '\n' + this.tr4.nativeElement.innerText
  //       + '\n' + this.tr5.nativeElement.innerText
  //       + '\n' + this.tr6.nativeElement.innerText
  //       + '\n' + this.tr7.nativeElement.innerText
  //       + '\n' + this.tr8.nativeElement.innerText
  //       + '----------------------------------------------------'
  //       + this.msgText;
  //     this.fileName = "Test File";
  //     //this.media_url = "https://www.freepik.com/free-vector/illustration-india-flag_2922516.htm#fromView=search&page=1&position=2&uuid=8f4b4429-7453-4665-86be-80954345206b";
  //     this.media_url = "https://innovarticsolutions.com/images/bulk-sms-01.png";
  //     this.mobileNo = "91" + this.setMobile;
  //     this.voter.slipOnWhatsapp(
  //       this.mobileNo,
  //       this.message,
  //       this.media_url,
  //       this.fileName,
  //       this.instance_id,
  //       this.access_token
  //     ).subscribe(data => {
  //       console.log(data.status);
  //       if(data.status=="success"){
  //         this.toast.presentToast("Slip Sent on whatsapp successfully!", "success", 'checkmark-circle-sharp');
  //       }else if(data.status=="error"){
  //         this.toast.presentToast("Something went wrong!", "danger", 'checkmark-circle-sharp');
  //       }
        
  //     })
  //   }
    
  // }

  whatsappSlip() {
    debugger;
    if(this.setMobile==null){
      this.toast.presentToast("Please Enter Mobile No.!", "danger", 'checkmark-circle-sharp');
    }else{
      this.instance_id = "65DC78AA5CA19";
      this.access_token = "65dc7765bb24b";
      this.message = this.myDiv.nativeElement.innerText
        + this.tr1.nativeElement.innerText
        + this.tr2.nativeElement.innerText
        + this.tr3.nativeElement.innerText
        + this.tr4.nativeElement.innerText 
        + this.tr5.nativeElement.innerText
        + this.tr6.nativeElement.innerText
        + this.tr7.nativeElement.innerText
        + this.tr8.nativeElement.innerText
        + '----------------------------------------------------'
        + this.msgText;
      this.fileName = "Test File";
      //this.media_url = "https://www.freepik.com/free-vector/illustration-india-flag_2922516.htm#fromView=search&page=1&position=2&uuid=8f4b4429-7453-4665-86be-80954345206b";
      this.media_url = "https://innovarticsolutions.com/images/bulk-sms-01.png";
      this.mobileNo = "91" + this.setMobile;
      // this.voter.slipOnWhatsapp(
      //   this.mobileNo,
      //   this.message,
      //   this.media_url,
      //   this.fileName,
      //   this.instance_id,
      //   this.access_token
      // ).subscribe(data => {
      //   console.log(data.status);
      //   if(data.status=="success"){
      //     this.toast.presentToast("Slip Sent on whatsapp successfully!", "success", 'checkmark-circle-sharp');
      //   }else if(data.status=="error"){
      //     this.toast.presentToast("Something went wrong!", "danger", 'checkmark-circle-sharp');
      //   }
        
      // })
    }
    
  }

}

