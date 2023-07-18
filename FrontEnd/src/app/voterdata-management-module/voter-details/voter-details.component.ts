import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PopoverController } from '@ionic/angular';
import { VoterService } from 'src/app/services/voter.service'
import { ActivatedRoute,Router, NavigationEnd } from '@angular/router'
import { LoaderService } from 'src/app/services/loader.service'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-voter-details',
  templateUrl: './voter-details.component.html',
  styleUrls: ['./voter-details.component.scss']
})
export class VoterDetailsComponent {
  Language: any;
  maxDate:String = new Date().toISOString();
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('myDiv') myDiv: ElementRef;
  @ViewChild('tr1') tr1: ElementRef;
  @ViewChild('tr2') tr2: ElementRef;
  @ViewChild('tr3') tr3: ElementRef;
  @ViewChild('tr4') tr4: ElementRef;
  @ViewChild('tr5') tr5: ElementRef;
  @ViewChild('tr6') tr6: ElementRef;
  @ViewChild('tr7') tr7: ElementRef;
  @ViewChild('p') p: ElementRef;
  //@ViewChild('myImg') myImg: ElementRef;
  year=new Date().getFullYear();
  text: string = ''
  // imgurl: string = 'https://cdn.pixabay.com/photo/2019/12/26/05/10/pink-4719682_960_720.jpg'
  //imgurl: string = 'https://tinysms.in/bjp.png'
  ImagePath = ''
  VoterListByUser: any;
  id: any;
  RoleId: any;
  colorUpdate: any = {};
  Mobile:any;
  YesNo: any;
  pageNo: any = 1;
  NoofRow: any = 100;
  partNo: any;
  ProfessionName:any;
  professionModal:any={};

  @ViewChild('slipDesign') slipDesign: ElementRef;

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
  professionUpdate: any = {}
  BirthdateUpdate: any = {}
  CasteUpdate: any = {}
  societyUpdate:any={};
  houseUpdate:any={};
  showStar: boolean;
  showVote: boolean;
  casteList: any;
  interval:any;
  partNumber:any;
  columnName:any;
  bgColor = '#FFF';
  assemblyName: any;
  isAssembly=true;
  isVillage=true;
  village:any;
  professionList:any;
  userId:any;
  imgurl:any;
  imgText:any;
  whatsText:any;
  msgText:any;
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
      public translate: TranslateService,
      private setting:SettingService,
      private translateConfigService: TranslateConfigService
  ) {

    this.Language = this.translateConfigService.getCurrentLang();
    this.Voter = this.router.getCurrentNavigation().extras.state;

  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.assemblyName = localStorage.getItem("loginAssembly");
    this.village = localStorage.getItem("loginVillage");
    this.userId = localStorage.getItem("loginId");
    this.userId = Number(this.userId);
    this.voterDetails();
    this.AllCasts();
    this.allProfession();
    if(this.assemblyName=="null"){
      this.isAssembly=!this.isAssembly;
    }
    else{
      this.isAssembly=this.isAssembly;
    }
    if(this.village=="null"){
      this.isVillage=!this.isVillage;
    }
    else{
      this.isVillage=this.isVillage;
    }
    this.mobUpdate.Mobile = this.VoterListByUser.mobileNo;
    this.altmobUpdate.AlternateMobileNo = this.VoterListByUser.alternateMobileNo;
    this.deadAlive.YesNo = this.VoterListByUser.isAlive;
    if (this.VoterListByUser.isAlive == "1") {
      this.deadAlive.YesNo = "Y"
    }
    else if (this.VoterListByUser.isAlive == "0") {
      this.deadAlive.YesNo = "N"
    }
    else if (this.VoterListByUser.isAlive == null) {
      this.deadAlive.YesNo = ''
    }
    this.BirthdateUpdate.ColoumnValue = this.VoterListByUser.birthDate;
    this.CasteUpdate.ColoumnValue = this.VoterListByUser.caste;
    this.professionUpdate.ColoumnValue = this.VoterListByUser.occupation;
    this.adrsUpdate.Address = this.VoterListByUser.address;
    this.setting.getWhatsappImage(this.userId).subscribe(data=>{
      if(data){
        this.saveFile(data);
        this.fetchImage(data);
        this.imgurl = true;
      }
    })
    this.setting.getWhatsappText(this.userId).subscribe(data=>{
      if(data){
        console.log(data);
        this.whatsText = data;
        this.msgText = data[0].messageContent;
      }
      else{

      }
    },(err)=>{

    })
  }

  saveFile(imageData: Blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(imageData);
    
  }

  // to download image from get api
  fetchImage(image:Blob){
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imgurl = reader.result as string;
    };
    reader.readAsDataURL(image);
  }



  // ngOnInit() {
  //   this.assemblyName1 = localStorage.getItem("loginAssembly");
  //   this.voterDetails();
  //   this.AllCasts();
  //   this.mobUpdate.Mobile = this.VoterListByUser.mobileNo;
  //   this.altmobUpdate.AlternateMobileNo = this.VoterListByUser.alternateMobileNo;
  //   this.deadAlive.YesNo = this.VoterListByUser.isAlive;
  //   if (this.VoterListByUser.isAlive == "1") {
  //     this.deadAlive.YesNo = "Y"
  //   }
  //   else if (this.VoterListByUser.isAlive == "0") {
  //     this.deadAlive.YesNo = "N"
  //   }
  //   else if (this.VoterListByUser.isAlive == null) {
  //     this.deadAlive.YesNo = ''
  //   }
  //   this.BirthdateUpdate.ColoumnValue = this.VoterListByUser.birthDate;
  //   this.CasteUpdate.ColoumnValue = this.VoterListByUser.caste;
  //   this.professionUpdate.ColoumnValue = this.VoterListByUser.occupation;
  //   this.adrsUpdate.Address = this.VoterListByUser.address
  // }


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
    else if (this.VoterListByUser.isAlive == "N") {
      this.VoterListByUser.isAlive = 0
    }
    else if (this.VoterListByUser.isAlive == null) {
      this.VoterListByUser.isAlive = ''
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

    if(this.VoterListByUser.birthDate == null){
      this.VoterListByUser.birthDate = ''
    }
    else{
      this.VoterListByUser.birthDate = this.VoterListByUser.birthDate.split('T')[0];
    }

    //this.partNumber =this.partNo

  }

  family(id: any) {
    this.router.navigate(['/voterdata-management/family', { Id: id }])
  }

  sameAddressVoter(id: any) {
    this.router.navigate(['/voterdata-management/family', { Id: id }])
  }

  sameBoothVoter(columnName:any) {
    this.columnName ==this.partNo;
    this.router.navigate(['/list/boothwise-list', {partNumber :columnName}])
  }

  // partNo(columnName:any){
  //   this.router.navigate(['/list/boothwise-list',  {partNumber :columnName} ])
  //  }

  // edit mobile number

  saveMobile() {
    this.id = this.Voter.id;
    this.mobUpdate.Id = Number(this.id);
    this.voter.updateMob(this.mobUpdate.Id, this.mobUpdate.Mobile).subscribe(data => {
      if (data) {
        this.closeModal();
        setTimeout(()=>{
          this.ionViewWillEnter();
          this.voterDetails();
        },1000);
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

  // add profession

  saveProfession() {
    this.id = this.Voter.id;
    this.professionUpdate.Id = Number(this.id);
    this.professionUpdate.ColoumnName = "Occupation"
    this.voter.updateProfession(this.professionUpdate.Id, this.professionUpdate.ColoumnName, this.professionUpdate.ColoumnValue).subscribe(data => {
      if (data) {
        this.voterDetails();
        this.closeModal();
        this.toast.presentToast("profession updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {

      }
    }, (err) => {

    })
  }

  addProfession(){
    this.voter.addProf(this.professionModal.ProfessionName).subscribe(data=>{
      if(data){
        this.voterDetails();
        this.closeModal();
        this.toast.presentToast("profession added successfully!", "success", 'checkmark-circle-sharp');
      }
      else{

      }
    })
  }

  // add Birthdate

  saveBirthdate() {
    this.id = this.Voter.id;
    this.BirthdateUpdate.Id = Number(this.id);
    this.BirthdateUpdate.ColoumnName = "Birthdate"
    this.voter.updateDoB(this.BirthdateUpdate.Id, this.BirthdateUpdate.ColoumnName, this.BirthdateUpdate.ColoumnValue).subscribe(data => {
      if (data) {
        this.voterDetails();
        this.closeModal();
        this.toast.presentToast("Birthdate updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {

      }
    }, (err) => {

    })
  }

  // add Caste

  saveCaste() {
    this.id = this.Voter.id;
    this.CasteUpdate.Id = Number(this.id);
    this.CasteUpdate.ColoumnName = "Caste"
    this.CasteUpdate.ColoumnValue = this.CasteUpdate.ColoumnValue;
    this.voter.updateCaste(this.CasteUpdate.Id, this.CasteUpdate.ColoumnName, this.CasteUpdate.ColoumnValue).subscribe(data => {
      if (data) {
        // this.voterDetails();
        this.VoterListByUser.caste = this.VoterListByUser.caste;
        this.closeModal();

        this.toast.presentToast("Caste updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {

      }
    }, (err) => {

    })
  }

   // add society

   saveSociety() {
    this.id = this.Voter.id;
    this.societyUpdate.Id = Number(this.id);
    this.societyUpdate.ColoumnName = "Society"
    this.voter.updateSociety(this.societyUpdate.Id, this.societyUpdate.ColoumnName, this.societyUpdate.ColoumnValue).subscribe(data => {
      if (data) {
        this.voterDetails();
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
    this.id = this.Voter.id;
    this.houseUpdate.Id = Number(this.id);
    this.houseUpdate.ColoumnName = "HouseNo"
    this.voter.updateHouse(this.houseUpdate.Id, this.houseUpdate.ColoumnName, this.houseUpdate.ColoumnValue).subscribe(data => {
      if (data) {
        this.voterDetails();
        this.closeModal();
        this.toast.presentToast("HouseNo updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {

      }
    }, (err) => {

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

  AllCasts1(ColoumnValue){
    this.id = this.Voter.id;
    this.CasteUpdate.Id = Number(this.id);
    this.CasteUpdate.ColoumnName = "Caste"
    if(this.CasteUpdate.ColoumnValue == null){
      this.CasteUpdate.ColoumnValue = '';
    }
    else{
      this.CasteUpdate.ColoumnValue = this.CasteUpdate.ColoumnValue;
    }
    this.voter.updateCaste(this.CasteUpdate.Id, this.CasteUpdate.ColoumnName, this.CasteUpdate.ColoumnValue).subscribe(data => {
      if (data) {
        this.voterDetails();
        this.closeModal();

        this.toast.presentToast("Caste updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {

      }
    }, (err) => {

    })
  }

  allProfession(){
    this.voter.getAllProfession().subscribe(data=>{
      this.professionList = data;
    },(err)=>{

    })
  }

  allProfession1(ColoumnValue){
    this.id = this.Voter.id;
    this.professionUpdate.Id = Number(this.id);
    this.professionUpdate.ColoumnName = "Occupation"
    if(this.professionUpdate.ColoumnValue == null){
      this.professionUpdate.ColoumnValue = '';
    }
    else{
      this.professionUpdate.ColoumnValue = this.professionUpdate.ColoumnValue;
    }
    this.voter.updateCaste(this.professionUpdate.Id, this.professionUpdate.ColoumnName, this.professionUpdate.ColoumnValue).subscribe(data => {
      if (data) {
        this.voterDetails();
        this.closeModal();

        this.toast.presentToast("Profession updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {

      }
    }, (err) => {

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

  // sameBoothVoter(id: any) {
  //   debugger;
  //   this.VoterListByUser.partNo = this.partNo;
  //   this.router.navigate(['/list/boothwise-list', { Id: id }])
  // }

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
      + '\n' + '----------------------------------------------------'
      + '\n' + this.p.nativeElement.innerText,
      this.imgurl
      //Mobile
      )
  }


  // ShareWhatsapp2() {
  //   debugger;
  //   this.socialSharing.shareViaWhatsApp(
  //     this.tr8.nativeElement.innerText
  //     )
  // }

}




