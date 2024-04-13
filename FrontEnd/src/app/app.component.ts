import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  ActivatedRoute,
  NavigationExtras
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuController, PopoverController, AlertController } from '@ionic/angular';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { App } from '@capacitor/app';
//import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { LoaderService } from 'src/app/services/loader.service'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { Location } from '@angular/common'
import { TranslateService } from '@ngx-translate/core';

//import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { IonicToastService } from './services/ionic-toast.service';
import { update } from './services/update.service';
import { VersionService } from './services/version.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  //menuWidth: number = 218;
  appVersionNumber:any;
  name: any;
  versionInfo: any;
  version:any;
  id: any;
  showHead: boolean = false;
  AdminMenu: any;
  UserMenu: any;
  user: any;
  roleType: string;
  contact: string;
  roleId: any;
  roleName: string;
  isDashboard: any;
  isContact: any;
  isBirthday: any;
  isAnniversary: any;
  isDailyRoutine: any;
  isDailyNews: any;
  isMedia: any;
  isOther: any;
  isSetting: any;
  isUser: any;
  isSurvey: any;
  isLists: any;
  isSearch: any;
  isVoterList: any;
  isAppointment: any;
  isAnnapurna: any;
  isNewVoter: any;
  isSociety: any;
  isOffice: any;
  isNotifications: any;
  isSuperAdmin: any;
  isconfigureDB: any;
  isLetterTracking: any;
  isAppoReport: any;
  isEnquiry: any;
  isReports: any;
  isComBook: any;
  isComBookByUser:any;
  isRequest: any;
  isTab: any;
  role: any;
  language: any;
  state: any;
  apkName: any;
  oldversion: any;
  newVersion: any;
  installedversion: any;
  //expiryTime:any;

  getClass() {
    return "active"
  }
  menuType: string = 'overlay'

  constructor(
    private router: Router,
    //private menu: MenuController,
    public popoverController: PopoverController,
    //private socialSharing: SocialSharing,
    private loader: LoaderService,
    private auth: AuthenticationService,
    private _location: Location,
    //private statusBar: StatusBar,
    private splashScreen:SplashScreen,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    public menuCtrl: MenuController,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private toast: IonicToastService,
    private translateConfigService: TranslateConfigService,
    private update:update,
    private appVersion:AppVersion,
    private file: File,
    private versionService: VersionService,
    private platform: Platform) {
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
    this.initializeApp();
    
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      //console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/home/mobile-dashboard')) {

        // Show Exit Alert!
        //console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {


        // Navigate to back page
        //console.log('Navigate to back page');
        this._location.back();

      }

    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      //console.log('Handler called to force close!');
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        //console.log(e);
      })
    });
    

    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/' || event['url'] == '/otp' || event['url'] == '/login' || event['url'] == '/privacy-policy') {
          this.showHead = false;
        } else {
          // console.log("NU")
          this.showHead = true;
        }
      }
    });
  }



  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.id = localStorage.getItem("loginId");
      this.name = localStorage.getItem("loginUser");
      this.roleId = localStorage.getItem("userType");
      this.state = localStorage.getItem("state");
      this.apkName = localStorage.getItem("superAdminName");
      //this.expiryTime = localStorage.getItem("expiryTime");
      if (this.roleId == 1) {
        this.roleName = "MasterAdmin"
      }
      if (this.roleId == 2) {
        this.roleName = "SuperAdmin"
      }
      if (this.roleId == 3) {
        this.roleName = "Admin"
      }
      if (this.roleId == 4) {
        this.roleName = "Volunteer"
      }
      if (this.roleId == 5) {
        this.roleName = "Society"
      }
      if (this.roleId == 6) {
        this.roleName = "Member"
      }

      var roleId = localStorage.getItem("userType");
      //this.roleType = roleName
      var isMasterAdmin = roleId == "1"
      var isSuperAdmin = roleId == "2"
      var isAdmin = roleId == "3";
      var isVolunteer = roleId == "4"
      var isSociety = roleId == "5"
      var isMember = roleId == "6"
      this.cdr.detectChanges();
      //this.isTokenExpired();
      this.isDashboard = isMasterAdmin || isSuperAdmin || isAdmin || isVolunteer;
      this.isSuperAdmin = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isContact = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isBirthday = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isAnniversary = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isMedia = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isOther = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isSetting = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isSurvey = isVolunteer;
      this.isSearch = isVolunteer;
      this.isLists = isVolunteer;
      this.isUser = isMasterAdmin || isSuperAdmin || isAdmin || isSociety;
      this.isAppointment = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isAnnapurna = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isNewVoter = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isDailyRoutine = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isDailyNews = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isVoterList = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isRequest = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isSociety = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isOffice = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isNotifications = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isLetterTracking = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isAppoReport = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isEnquiry = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isReports = isMasterAdmin || isSuperAdmin || isAdmin;
      this.isComBook = isMasterAdmin || isSuperAdmin || isAdmin || isSociety;
      this.isComBookByUser = isMember;
      
    })
    // keeps user logged in for android app so that user doesnt have to login every time app opens
    // but dont use this code for web view bcoz when i refresh from any page in the app, it redirects me to dashboard page
    if (localStorage.getItem('loginId') != undefined || null) {
      //this.router.navigate(['/image']);
      this.router.navigate(['/home/mobile-dashboard']);
    }
    else {
     this.router.navigate(['/login']);
    }
    
  }

  // toggleMenuWidth() {
  //   this.menuWidth = this.menuWidth === 218 ? 90 : 218; // Toggle between widths
  // }


  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    //this.initializeApp();
  }

  closeMenu() {
    this.menuCtrl.close();
  }




  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      //keeps user logged in for android app so that user doesnt have to login every time app opens
      //but dont use this code for web view bcoz when i refresh from any page in the app, it redirects me to dashboard page

      // if (this.platform.is('android')) {
      //   if (localStorage.getItem('loginId') != undefined || null) {
      //     this.router.navigate(['/image']);
      //     this.appVersion.getVersionNumber().then(version => {
      //       console.log('App Version:', version);
      //       this.version = version;
      //     }).catch(error => {
      //       console.error('Error getting app version', error);
      //     });
      //     this.checkForUpdates();
      //   }else{
      //     this.router.navigate(['/login']);
      //   }
        
      // }
      if (this.platform.is('android')) {
        this.appVersion.getVersionNumber().then(version => {
          this.version = version;
        }).catch(error => {
          console.error('Error getting app version', error);
        });
        this.checkForUpdates();
      }


     if (this.platform.is('desktop')){
       //this.update.checkForUpdates();
      //this.checkForUpdates();
      } 
      if (this.platform.is('ios')){
       //this.update.checkForUpdates();
      this.checkForUpdates();
      }
    })
  }
  

  showExitConfirm() {
    this.alertController.create({
      header: 'Exit Matadarmaza',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

  // share() {
  //   var options = {
  //     message: 'Share this App', 
  //     url: 'https://ionicframework.com/docs/native/social-sharing',
  //   };
  //   this.socialSharing.shareWithOptions(options);
  // }

  logOut() {
    this.router.navigate(['/login']);
    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginId");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    window.location.replace('/login');
    localStorage.clear();
    
    
  }


  async notification(ev: any) {
    const popover = await this.popoverController.create({
      component: NotificationComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ProfileComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }



  // isTokenExpired() {
  //   const expiryTime = localStorage.getItem('expiryTime');
  //   this.expiryTime = expiryTime;
  //   if (!expiryTime) {
  //     return true;
  //   }
  //   return Date.now() > parseInt(expiryTime, 10);
  // }

  // handleTokenExpiry(){
  //   if(this.isTokenExpired()){
  //     this.router.navigate(['/login']);
  //   }
  // }

  checkForUpdates() {
      this.versionService.getandroidVersion().subscribe(data => {
        if (data) {
          this.versionInfo = data;
          var info = {
            newVersion: data[0].newVersion,
            msg: {
              title: 'App update',
              msg: 'Update Matadarmaza',
              btn: 'Update'
            }
          }
          /// var newVersion = "1.0.26";
          var newVersion = data[0].newVersion;
          //var newVersionNumber = parseFloat(newVersion.replace(/\./g, ""));
          this.installedversion = this.version;
          if (newVersion == this.installedversion) {
            this.hideAlert();
            this.router.navigate(['/mobile-dashboard']);
          }
          else if (newVersion > this.installedversion) {
            this.presentalrt(info.msg.title, info.msg.msg, info.msg.btn);
          }
          else {
            this.hideAlert();
            this.router.navigate(['/mobile-dashboard']);
          }
        }
      })
    
  }

  async presentalrt(header, message, buttonText = '', allowClose = false) {
    const buttons = []
    if (buttonText != '') {
      buttons.push({
        text: buttonText, handler: () => {
          this.openAppStoreEntry1()
        }
      })
    }
    if (allowClose) {
      buttons.push({ text: 'Close', role: 'Cancel' })
    }
    const alert = await this.alertController.create({
      header,
      message,
      buttons, backdropDismiss: allowClose
    })
    await alert.present();
  }


  async hideAlert() {
    const alert = await this.alertController.getTop();
    if (alert) {
      await alert.dismiss(); // Dismiss the alert if it exists
    }
  }



  //  openAppStoreEntry1()
  //  {
  //    if(this.platform.is('android'))
  //    {
  //      window.open("https://play.google.com/store/apps/details?id=io.ionic.pollmaster","_system")// matadarmaza prod
  //    }
  //  }

  openAppStoreEntry1() {
    window.open("https://play.google.com/store/apps/details?id=io.ionic.pollmaster", "_system")// matadarmaza prod
  }  

}



