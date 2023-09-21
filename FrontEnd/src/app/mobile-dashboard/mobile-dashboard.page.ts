import { Component, OnInit } from '@angular/core';
import { IAccTooltipRenderEventArgs, IPointEventArgs } from '@syncfusion/ej2-angular-charts';
import { MenuController,PopoverController } from '@ionic/angular'
import { NotificationComponent } from '../notification/notification.component';
import { ProfileComponent } from '../profile/profile.component'; 
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController } from '@ionic/angular';
import { VoterService } from '../services/voter.service';


@Component({
  selector: 'app-mobile-dashboard',
  templateUrl: './mobile-dashboard.page.html',
  styleUrls: ['./mobile-dashboard.page.scss'],
})
export class MobileDashboardPage implements OnInit {
  language: any;
  showHead: boolean = false;
  isSearch:any;
  isList:any;
  isContact:any;
  isBirthDay:any;
  isAnniversary:any;
  isSurvey:any;
  isGraph:any;
  isLogReport:any;
  id:any;
  name: any;
  roleName: string;
  roleId:any;
  state:any;
  isMarathi:any;
  superAdminName:any;
  isImage=true;

  public Search: string;
  public Lists: string;
  public Survey: string;
  public birthData: Object[];
  public anniData: Object[];
  public primaryXAxis: Object;
  public primaryYAxis: Object;
  public palette: string[];
  public title: string;
  public chartArea: Object;

  public casteData: Object[];
  public totalDataLael: Object;
  public tooltip: Object;
  public title1: String;
  public palette1: string[];
  ageDataLabel: { visible: boolean; };
  
  public pointClick(args: IPointEventArgs): void {
    document.getElementById("lbl").innerText = "X : " + args.point.x + "\nY : " + args.point.y;
  };

  constructor(
    public menuCtrl: MenuController,
    public popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    public actionSheetController: ActionSheetController,
    private voter:VoterService
    ) {
      this.translateConfigService.getDefaultLanguage();
      this.language = this.translateConfigService.getCurrentLang();
      setTimeout(()=>{
        this.isImage = false;
      },3000);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

   ngOnInit(): void {
    
    this.id = localStorage.getItem("loginId");
    this.name = localStorage.getItem("loginUser");
    this.state = localStorage.getItem("state");
    this.roleId = localStorage.getItem("userType");
    this.superAdminName = localStorage.getItem("superAdminName");
    if(this.roleId==2){
      this.superAdminName = this.name;
    }
    else{
      this.superAdminName = this.superAdminName
    }
    if(this.roleId == 1){
      this.roleName = "MasterAdmin";
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

    if(this.state == "Maharashtra"){
      this.isMarathi = this.isMarathi
    }
    else{
      this.isMarathi = !this.isMarathi
    }
    

    var roleId = localStorage.getItem("userType");
    //this.roleType = roleName
    var isMasterAdmin = roleId == "1"
    var isSuperAdmin = roleId == "2"
    var isAdmin = roleId == "3";
    var isVolunteer = roleId == "4"
    
    this.isSearch = isVolunteer;
    this.isList =  isSuperAdmin || isAdmin || isVolunteer;
    this.isContact =isMasterAdmin || isSuperAdmin || isAdmin;
    this.isBirthDay = isMasterAdmin || isSuperAdmin || isAdmin;
    this.isAnniversary = isMasterAdmin || isSuperAdmin || isAdmin;
    this.isSurvey = isMasterAdmin || isSuperAdmin || isAdmin || isVolunteer;
    this.isGraph = isMasterAdmin || isSuperAdmin || isAdmin;
    this.isLogReport = isMasterAdmin || isSuperAdmin || isAdmin;
    

    this.primaryXAxis = {
      majorGridLines: { width: 0 },
      minorGridLines: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
      interval: 1,
      lineStyle: { width: 0 },
      valueType: "Category",
      title: 'Months'
    };
    this.primaryYAxis = {
      title: "Count",
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
      labelFormat: "{value}"
    };

    this.palette = ["#0067b5", "#00e29c"];
    this.title = 'Monthwise Count of Birthday and Anniversary';
    this.chartArea = {
      border: {
        width: 0
      }
    };

    this.birthData = [
      { x: "Jan", y: 111.1 },
      { x: "Feb", y: 127.3 },
      { x: "Mar", y: 143.4 },
      { x: "Apr", y: 159.9 },
      { x: "May", y: 159.9 },
      { x: "Jun", y: 149 },
      { x: "Jul", y: 144 },
      { x: "Aug", y: 142 },
      { x: "Sep", y: 145 },
      { x: "Oct", y: 144 },
      { x: "Nov", y: 144 },
      { x: "Dec", y: 148 }
    ];
    this.anniData = [
      { x: "Jan", y: 76.9 },
      { x: "Feb", y: 99.5 },
      { x: "Mar", y: 121.7 },
      { x: "Apr", y: 142.5 },
      { x: "May", y: 152.9 },
      { x: "Jun", y: 149.9 },
      { x: "Jul", y: 146 },
      { x: "Aug", y: 144 },
      { x: "Sep", y: 147 },
      { x: "Oct", y: 148 },
      { x: "Nov", y: 159 },
      { x: "Dec", y: 145 }
    ];

  }


  async changeLanguage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Languages',
      buttons: [{
        text: 'English',
        icon: 'language-outline',
        handler: () => {
          this.language = 'en';
          this.translateConfigService.setLanguage('en');
        },
      }, {
        text: 'Marathi',
        icon: 'language-outline',
        handler: () => {
          this.language = 'mr';
          this.translateConfigService.setLanguage('mr');
        }
      }, {
        text: 'Hindi',
        icon: 'language-outline',
        handler: () => {
          this.language = 'hi';
          this.translateConfigService.setLanguage('hi');
        }
      },{
        text: 'Kannada',
        icon: 'language-outline',
        handler: () => {
          this.language = 'kn';
          this.translateConfigService.setLanguage('kn');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  // async changeLanguage() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Languages',
  //     buttons: [{
  //       text: 'English',
  //       icon: 'language-outline',
  //       handler: () => {
  //         this.language = 'en';
  //         this.translateConfigService.setLanguage('en');
  //       },
  //     },{
  //       text: 'Kannada',
  //       icon: 'language-outline',
  //       handler: () => {
  //         this.language = 'kn';
  //         this.translateConfigService.setLanguage('kn');
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();

  //   const { role, data } = await actionSheet.onDidDismiss();
  //   console.log('onDidDismiss resolved with role and data', role, data);
  // }

}





