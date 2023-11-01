import { Component, OnInit } from '@angular/core';
import { IAccTooltipRenderEventArgs,IPointRenderEventArgs, IPointEventArgs } from '@syncfusion/ej2-angular-charts';
import { MenuController,PopoverController } from '@ionic/angular'
import { NotificationComponent } from '../notification/notification.component';
import { ProfileComponent } from '../profile/profile.component'; 
import { TranslateConfigService } from 'src/app/services/translate-config.service';
//import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController } from '@ionic/angular';
import { VoterService } from '../services/voter.service';
import { ComplaintService } from 'src/app/services/complaint.service'
import { LetterService } from 'src/app/services/letter.service';
import { AppointmentService } from 'src/app/services/appointment.service'
import { DashboardService } from '../services/dashboard.service';


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
  mainCounts:any;

  // complaint graph
  public primaryXAxis: Object;
  public chartData: Object[];
  public piedata: Object[];
  public datalabel: Object;
  public tooltip: Object;
  public title: String;
  public palette1: string[];
  public legendSettings: Object;
  
  public pointRender(args: IPointRenderEventArgs): void {
    let seriesColor: string[] = ['#00bdae', '#5e6368', '#357cd2', '#f97369', '#29dd52'];
    args.fill = seriesColor[args.point.index];
  };

  complaintCount: any;
  totalComplaints: any;
  todaysComplaints: any;
  resolvedComplaints: any;
  pendingComplaints: any;

  // letter graph
  public primaryXAxisL: Object;
  public chartDataL: Object[];
  public piedataL: Object[];
  public datalabelL: Object;
  public tooltipL: Object;
  public titleL: String;
  public palette1L: string[];
  public legendSettingsL: Object;
  public pointRenderL(args: IPointRenderEventArgs): void {
    let seriesColor: string[] = ['#00bdae', '#5e6368', '#357cd2', '#f97369', '#29dd52'];
    args.fill = seriesColor[args.point.index];
  };

  RoleId: any;
  UserId: any;
  allCount: any;
  totalLetters: any;
  todayLetters: any;
  compLetters: any;
  pendLetters: any;

  // appointment graph
  apmCount:any;
  totalApm:any;
  todayApm:any;
  approvedApm:any;
  rejectedApm:any;
  roleID:any;

  public primaryXAxisApm: Object;
  public chartDataApm: Object[];
  public piedataApm: Object[];
  public datalabelApm: Object;
  public tooltipApm: Object;
  public titleApm: String;
  public palette1Apm: string[];
  public legendSettingsApm: Object;
  public pointRenderApm(args: IPointRenderEventArgs): void {
    let seriesColor: string[] = ['#00bdae', '#5e6368', '#357cd2', '#f97369'];
    args.fill = seriesColor[args.point.index];
  };

  // public Search: string;
  // public Lists: string;
  // public Survey: string;
  public birthData: Object[];
  public anniData: Object[];
  public primaryXAxisP: Object;
  public primaryYAxisP: Object;
  public paletteP: string[];
  public titleP: string;
  public chartAreaP: Object;

  // public casteData: Object[];
  // public totalDataLael: Object;
  // public tooltip: Object;
  // public title1: String;
  // public palette1: string[];
  // ageDataLabel: { visible: boolean; };
  
  // public pointClick(args: IPointEventArgs): void {
  //   document.getElementById("lbl").innerText = "X : " + args.point.x + "\nY : " + args.point.y;
  // };

  constructor(
    public menuCtrl: MenuController,
    public popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    public actionSheetController: ActionSheetController,
    private voter:VoterService,
    private complaint: ComplaintService,
    private letterService: LetterService,
    private appointment:AppointmentService,
    private dashboard:DashboardService
    ) {
      this.translateConfigService.getDefaultLanguage();
      this.language = this.translateConfigService.getCurrentLang();
      setTimeout(()=>{
        this.isImage = false;
      },3000);
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
    

    this.primaryXAxisP = {
      majorGridLines: { width: 0 },
      minorGridLines: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
      interval: 1,
      lineStyle: { width: 0 },
      valueType: "Category",
      title: 'Week'
    };
    this.primaryYAxisP = {
      title: "Count",
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
      labelFormat: "{value}"
    };

    this.paletteP = ["#0067b5", "#00e29c"];
    this.titleP = 'Weekly Count of Birthday and Anniversary';
    this.chartAreaP = {
      border: {
        width: 0
      }
    };

    this.birthData = [
      { x: "Mon", y: 111},
      { x: "Tue", y: 127},
      { x: "Mar", y: 143},
      { x: "Wed", y: 159},
      { x: "Thu", y: 159},
      { x: "Fri", y: 149 },
      { x: "Sat", y: 144 },
      { x: "Sun", y: 142 }
    ];
    this.anniData = [
      { x: "Mon", y: 111},
      { x: "Tue", y: 127},
      { x: "Mar", y: 143},
      { x: "Wed", y: 159},
      { x: "Thu", y: 159 },
      { x: "Fri", y: 149 },
      { x: "Sat", y: 144 },
      { x: "Sun", y: 142 }
    ];

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.apmCountData();
    this.allComplaintCount();
    this.allLetterCount();
    this.countOfDashboard();
  }

  apmCountData(){
    this.UserId = this.id;
    this.roleID = this.roleId;
    this.appointment.getApmCounts(this.UserId,this.roleID).subscribe(data=>{
      this.apmCount = data;
      this.totalApm = data[0].totalAppointment;
      this.todayApm = data[0].todayAppointment;
      this.approvedApm = data[0].approved;
      this.rejectedApm = data[0].rejected;

      this.datalabelApm = { visible: true };
      this.tooltipApm = { enable: true };
      this.titleApm = 'Appointments';
      this.palette1Apm = ["#ccc", "#ffd34f", "#0bbb5f", "#f00"]
      this.apmCount = [
        { 'x': 'All', y: this.totalApm }, { 'x': 'Today', y: this.todayApm },
        { 'x': 'Approved', y: this.approvedApm }, { 'x': 'Rejected', y: this.rejectedApm }
      ];
    })
  }

  allComplaintCount() {
    this.complaint.getComplaintCount().subscribe(data => {
      this.complaintCount = data;
      this.totalComplaints = data[0].totalCount;
      this.todaysComplaints = data[0].todayCount;
      this.resolvedComplaints = data[0].resolved;
      this.pendingComplaints = data[0].pending;

      this.datalabel = { visible: true };
      this.tooltip = { enable: true };
      this.title = 'Complaint Book';
      this.palette1 = ["#ccc", "#ffd34f", "#0bbb5f", "#f00"]
      this.complaintCount = [
        { 'x': 'All', y: this.totalComplaints }, { 'x': 'Today', y: this.todaysComplaints },
        { 'x': 'Resolved', y: this.resolvedComplaints }, { 'x': 'Pending', y: this.pendingComplaints }
      ];
    })
  }

  allLetterCount(){
    this.UserId = this.id;
    this.RoleId = this.roleId;
    this.letterService.getDashboardCount(this.UserId, this.RoleId).subscribe(data => {
      if (data) {
        this.allCount = data;
        this.totalLetters = data[0].totalCount;
        this.todayLetters = data[0].todayCount;
        this.compLetters = data[0].completed;
        this.pendLetters = data[0].pending;

        this.datalabelL = { visible: true };
        this.tooltipL = { enable: true };
        this.titleL = 'Letter Tracking';
        this.palette1L = ["#ccc", "#ffd34f", "#0bbb5f", "#f00"]
        this.allCount = [
          { 'x': 'All', y: this.totalLetters }, { 'x': 'Today', y: this.todayLetters },
          { 'x': 'Completed', y: this.compLetters }, { 'x': 'Pending', y: this.pendLetters }
        ];
      }
    })
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

  countOfDashboard(){
    this.dashboard.getMainDashoardCount().subscribe(data=>{
      if(data){
        console.log(data);
        this.mainCounts = data;
      }else{

      }
    },(err)=>{

    })
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





