import { Component, OnInit } from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { MenuController, PopoverController, AlertController } from '@ionic/angular';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { Platform } from '@ionic/angular';
//import { App } from '@capacitor/app';
//import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { LoaderService } from 'src/app/services/loader.service'
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { AuthenticationService } from 'src/app/services/authentication.service'
import { Location } from '@angular/common'

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { StatusBar } from '@ionic-native/status-bar/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  name: any;
  roleName: string;
  id: any;
  showHead:boolean=false;
  DashboardMenu: any;
  AdminMenu: any;
  UserMenu: any;
  user: any;
  roleType: string;
  contact: string;
  roleId:any;
  isDashboard: any;
  isContact: any;
  isBirthday: any;
  isAnniversary: any;
  isDailyRoutine: any;
  isMedia: any;
  isOther: any;
  isSetting: any;
  isUser: any;
  isSurvey: any;
  isLists: any;
  isSearch: any;
  isVoterList: any;
  isAppointment:any;
  isSuperAdmin:any;
  isconfigureDB:any;
  isRequest:any;
  isTab:any;

  getClass() {
    return "active"
  }
  menuType: string = 'overlay'

  constructor(
    private router: Router,
    private menu: MenuController,
    public popoverController: PopoverController,
    //private socialSharing: SocialSharing,
    private androidPermissions: AndroidPermissions,
    private firebaseX: FirebaseX,
    private loader: LoaderService,
    private auth: AuthenticationService,
    private _location: Location,
    private splashScreen: SplashScreen,
    //private statusBar: StatusBar,
    private alertController: AlertController,
    private platform: Platform) {
    this.auth.userType = "";
    
    this.initializeApp();

    // platform.ready().then(() => {

    //   androidPermissions.requestPermissions(
    //     [
    //       this.androidPermissions.PERMISSION.CAMERA,
    //       this.androidPermissions.PERMISSION.READ_SMS
    //     ]
    //   );

    // });

    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/' || event['url'] == '/otp') {
          this.showHead = false;
        } else {
          // console.log("NU")
          this.showHead = true;
        }
      }
    });
  }

  ngOnInit() {
    this.id = localStorage.getItem("loginId");
    this.name = localStorage.getItem("loginUser");
    this.roleId = localStorage.getItem("userType");
    if(this.roleId == 1){
      this.roleName = "MasterAdmin"
    }
    if(this.roleId == 2){
      this.roleName = "SuperAdmin"
    }
    if(this.roleId == 3){
      this.roleName = "Admin"
    }
    if(this.roleId == 4){
      this.roleName = "Volunteer"
    }

    // keeps user logged in for android app so that user doesnt have to login every time app opens
    // but dont use this code for web view bcoz when i refresh from any page in the app, it redirects me to dashboard page
    if (localStorage.getItem('loginId') != undefined || null) {
      this.router.navigate(['/home/mobile-dashboard']);
    }
    else {
      this.router.navigate(['/']);
    }

   
    
    // var roleName = localStorage.getItem("userType");
    // this.roleId = roleName
    // var isMasterAdmin = roleName == "MasterAdmin"
    // var isSuperAdmin = roleName == "SuperAdmin"
    // var isAdmin = roleName == "Admin";
    // var isVolunteer = roleName == "Volunteer"
    // this.isDashboard = isMasterAdmin || isSuperAdmin || isAdmin || isVolunteer;
    // this.isContact = isSuperAdmin || isAdmin;
    // this.isBirthday = isSuperAdmin || isAdmin;
    // this.isAnniversary = isSuperAdmin || isAdmin;
    // this.isDailyRoutine = isSuperAdmin || isAdmin;
    // this.isMedia = isSuperAdmin || isAdmin;
    // this.isOther = isSuperAdmin || isAdmin;
    // this.isSetting = isSuperAdmin || isAdmin;
    // this.isUser = isSuperAdmin || isAdmin;
    // this.isSurvey = isVolunteer;
    // this.isLists = isAdmin || isVolunteer;
    // this.isSearch = isAdmin || isVolunteer;
    // this.isVoterList = isSuperAdmin || isAdmin;
    // this.isRequest = isSuperAdmin || isAdmin;
    // this.isAppointment = isSuperAdmin || isAdmin;
    // this.isSuperAdmin = isMasterAdmin;
    // this.isconfigureDB = isMasterAdmin;
    // this.isTab = isSuperAdmin || isAdmin;
    
    this.firebaseX.getToken()
      .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
      .catch(error => console.error('Error getting token', error));

    this.firebaseX.onMessageReceived()
      .subscribe(data => console.log(`User opened a notification ${data}`));

    this.firebaseX.onTokenRefresh()
      .subscribe((token: string) => console.log(`Got a new token ${token}`));
  }


  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      //console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/home')) {

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

  }

  showExitConfirm() {
    this.alertController.create({
      header: 'Exit Enrolle',
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
    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginId");
    localStorage.removeItem("userType");
    localStorage.clear();
    this.router.navigateByUrl('/');
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
}

