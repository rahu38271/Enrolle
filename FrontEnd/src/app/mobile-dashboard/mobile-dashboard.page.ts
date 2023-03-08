import { Component, OnInit } from '@angular/core';
import { IAccTooltipRenderEventArgs, IPointEventArgs } from '@syncfusion/ej2-angular-charts';
import { MenuController,PopoverController } from '@ionic/angular'
import { NotificationComponent } from '../notification/notification.component';
import { ProfileComponent } from '../profile/profile.component'; 
import { RefreshService } from 'src/app/services/refresh.service'


@Component({
  selector: 'app-mobile-dashboard',
  templateUrl: './mobile-dashboard.page.html',
  styleUrls: ['./mobile-dashboard.page.scss'],
})
export class MobileDashboardPage implements OnInit {

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

  public birthData: Object[];
  public anniData: Object[];
  public primaryXAxis: Object;
  public primaryYAxis: Object;
  public palette: string[];
  public title: string;
  public chartArea: Object;

  public totalData: Object[];
  public totalDataLael: Object;
  public tooltip: Object;
  public title1: String;
  public palette1: string[];
  ageDataLabel: { visible: boolean; };
  
  public pointClick(args: IPointEventArgs): void {
    document.getElementById("lbl").innerText = "X : " + args.point.x + "\nY : " + args.point.y;
  };

  public ageData: Object[];
  public ageDataLael: Object;
  public tooltip1: Object;
  public title2: String;
  public palette2: string[];
  public pointClick1(args: IPointEventArgs): void {
    document.getElementById("lbl").innerText = "X : " + args.point.x + "\nY : " + args.point.y;
  };

  public occuData: Object[];
  public occuDataLabel: Object;
  public tooltip2: Object;
  public title3: String;
  public pointClick2(args: IPointEventArgs): void {
    document.getElementById("lbl").innerText = "X : " + args.point.x + "\nY : " + args.point.y;
  };

  constructor(
    public menuCtrl: MenuController,
    public popoverController: PopoverController,
    public refresh : RefreshService
    ) {
     
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

   ngOnInit(): void {
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

    var roleId = localStorage.getItem("userType");
    //this.roleType = roleName
    var isMasterAdmin = roleId == "1"
    var isSuperAdmin = roleId == "2"
    var isAdmin = roleId == "3";
    var isVolunteer = roleId == "4"
    
    this.isSearch = isMasterAdmin || isSuperAdmin || isAdmin || isVolunteer;
    this.isList = isMasterAdmin|| isSuperAdmin || isAdmin  || isVolunteer;
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

    this.totalDataLael = { visible: true };
    this.tooltip = { enable: true };
    this.title1 = 'Total Data';
    this.totalData = [
      { 'x': 'Male', y: 48, text: '48%' }, { 'x': 'Female', y: 47, text: '47%' },
      { 'x': 'Other', y: 5, text: '5%' }
    ];
    this.palette1 = ["#178ace", "#ffb8be", "#00e1a1"]

    this.ageDataLabel = { visible: true };
    this.tooltip = { enable: true };
    this.title2 = 'Agewise Data';
    this.ageData = [
      { 'x': '18 - 25', y: 48, text: '48%' }, { 'x': '30 - 45', y: 47, text: '47%' },
      { 'x': '45 - 60', y: 5, text: '5%' },{ 'x': '60 +', y: 5, text: '5%' }
    ];
    this.palette2 = ["#178ace", "#ffb8be", "#00e1a1", "#ff6b72"]

    this.occuDataLabel = { visible: true };
    this.tooltip2 = { enable: true };
    this.title3 = 'Occupationwise Data';
    this.occuData = [
      { 'x': 'Engineer', y: 48, text: '48%' }, { 'x': 'Doctor', y: 47, text: '47%' },
      { 'x': 'Business', y: 5, text: '5%' },{ 'x': 'Housewife', y: 5, text: '5%' },
      { 'x': 'Social Worker', y: 5, text: '5%' },{ 'x': 'Other', y: 5, text: '5%' }
    ];
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





