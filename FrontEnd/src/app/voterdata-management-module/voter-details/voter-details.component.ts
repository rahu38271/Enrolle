import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { VoterService } from 'src/app/services/voter.service';
import { ActivatedRoute,Router, NavigationEnd } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ModalController } from '@ionic/angular';
import { IonModal,NavController,PopoverController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-voter-details',
  templateUrl: './voter-details.component.html',
  styleUrls: ['./voter-details.component.scss'],
})
export class VoterDetailsComponent  {
  columnName:any;
  partNo:any;
  Language:any;
  Vid:any;
  voterInfoData:any;
  starUpdare: any = {};
  voteStatusUpdate: any = {}
  colorUpdate: any = {};
  mobUpdate: any = {};
  altmobUpdate: any = {};
  deadAlive: any = {};
  BirthdateUpdate:any={};
  societyUpdate:any={}
  CasteUpdate: any = {};
  professionUpdate: any = {}
  ProfessionName:any;
  professionModal:any={};
  houseUpdate:any={};
  adrsUpdate: any = {}
  showStar: boolean;
  showVote: boolean;
  id:any;
  imgurl:any;
  bgColor = '#FFF';
  casteList: any;
  professionList:any;
  engAssembly=false;
  nonEngAssembly=false;
  isAssembly=true;
  assemblyName: any;
  assemblyNameByLang:any;
  setMobile:any;
  setAltMob:any;
  setDOB:any;
  setSociety:any;
  setHouseNo:any;
  setAddress:any;
  setStar:any;
  setVote:any;
  setColor:any;
  setAlive:any;
  setProf:any;
  setCaste:any;
  ColoumnValue: any;
  closeModal() {
    this.modalCtrl.dismiss();
  }
  year=new Date().getFullYear();
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
    private voter:VoterService,
    private route: ActivatedRoute,
    private router:Router,
    private loader:LoaderService,
    private toast:IonicToastService,
    private socialSharing: SocialSharing,
    public popoverController: PopoverController,
    public modalCtrl: ModalController,
    private sms: SMS
  ) {
    this.Language = this.translateConfigService.getCurrentLang();
    if(this.Language == 'en'){
      this.engAssembly = true;
    }
    else{
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
    
  }

  ionViewWillEnter(){
    this.voterInfo();
    this.AllCasts();
    this.allProfession();
    this.assemblyNameLang();
    if(this.assemblyName=="null"){
      this.isAssembly=!this.isAssembly;
    }
    else{
      this.isAssembly=this.isAssembly;
    }
    
  }

  voterInfo(){
    this.loader.showLoading();
    this.voter.getVoterById(this.Vid,this.Language).subscribe(data=>{
      if(data){
        this.loader.hideLoader();
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
        if(this.setStar=="N" || this.setStar==null){
          this.showStar = this.showStar
        }
        else{
          this.showStar = !this.showStar
        }
        if(this.setVote=="N" || this.setVote==null){
          this.showVote = this.showVote
        }
        else{
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
        this.professionModal.ProfessionName = this.setProf;
        this.CasteUpdate.ColoumnValue = this.setCaste;
        this.voterInfoData.forEach(e => {
          e.birthDate = e.birthDate.split('T')[0];
        });
        
      }
      else{
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
      
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
      this.toast.presentToast("Address not updated", "danger", 'alert-circle-sharp');
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
      this.toast.presentToast("Mobile No. not updated", "danger", 'alert-circle-sharp');
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
      this.toast.presentToast("Mobile No. not updated", "danger", 'alert-circle-sharp');
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

  // add profession

  saveProfession() {
    this.id = this.Vid;
    this.professionUpdate.Id = Number(this.id);
    this.professionUpdate.ColoumnName = "Occupation"
    this.voter.updateProfession(this.professionUpdate.Id, this.professionUpdate.ColoumnName, this.professionUpdate.ColoumnValue).subscribe(data => {
      if (data) {
        this.voterInfo();
        this.closeModal();
        this.toast.presentToast("profession updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {

      }
    }, (err) => {

    })
  }

  addProfession(){
    debugger;
    this.voter.addProf(this.professionModal.ProfessionName).subscribe(data=>{
      if(data){
        this.professionModal = {};
        this.closeModal();
        this.toast.presentToast("profession added successfully!", "success", 'checkmark-circle-sharp');
      }
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
  AllCasts1(ColoumnValue){
    this.id = this.Vid;
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
        this.voterInfo();
        this.closeModal();
        this.toast.presentToast("Caste11 updated successfully!", "success", 'checkmark-circle-sharp');
      }
      else {

      }
    }, (err) => {

    })
  }

  // add Caste 

  addCaste() {
    // debugger;
    // this.id = this.Vid;
    // this.CasteUpdate.Id = Number(this.id);
    // this.CasteUpdate.ColoumnName = "Caste"
    // this.CasteUpdate.ColoumnValue = this.CasteUpdate.ColoumnValue;
    // this.voter.updateCaste(this.CasteUpdate.Id, this.CasteUpdate.ColoumnName, this.CasteUpdate.ColoumnValue).subscribe(data => {
    //   if (data) {
    //     this.voterInfo();
    //     this.closeModal();
    //     this.ionViewWillEnter();
    //     this.toast.presentToast("Caste2 updated successfully!", "success", 'checkmark-circle-sharp');
    //   }
    //   else {

    //   }
    // }, (err) => {

    // })
  }

  allProfession(){
    this.voter.getAllProfession().subscribe(data=>{
      this.professionList = data;
    },(err)=>{

    })
  }

  allProfession1(ColoumnValue){
    this.id = this.Vid;
    this.professionUpdate.Id = Number(this.id);
    this.professionUpdate.ColoumnName = "Occupation"
    if(this.professionUpdate.ColoumnValue == null){
      this.professionUpdate.ColoumnValue = '';
    }
    else{
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

  // shate text sms

  sendSMS(){
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

  assemblyNameLang(){
    this.voter.getAssemblyName(this.assemblyName).subscribe(data=>{
      this.assemblyNameByLang = data;
    })
  }

  sameBoothVoter(columnName:any) {
    this.columnName ==this.partNo;
    this.router.navigate(['/list/boothwise-list', {partNumber :columnName}])
  }

  sameAddressVoter(id: any) {
    this.router.navigate(['/voterdata-management/family', { Id: id }])
  }

  EditSurvey(data:any){
    this.router.navigateByUrl('/survey/edit-survey', {state:data});
  }

}




