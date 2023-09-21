import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { IonicToastService} from 'src/app/services/ionic-toast.service'
//import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { Location } from '@angular/common';
import { IAccTooltipRenderEventArgs, IPointEventArgs } from '@syncfusion/ej2-angular-charts';


@Component({
  selector: 'app-voter-dashboard',
  templateUrl: './voter-dashboard.component.html',
  styleUrls: ['./voter-dashboard.component.css']
})
export class VoterDashboardComponent implements OnInit {

  Language:any;
  isShow = false;
  searchMob:string;
  id:any;
  roleId:any;
  UserId:any;
  RoleId:any;
  Coloumn:any;
  colorList:any;
  userId:any;
  roleID:any;

  // by village graph

  public vilModal: Object[];
  public totalDataLael: Object;
  public tooltip: Object;
  public title1: String;
  public palette1: string[];
  public pointClick(args: IPointEventArgs): void {
    document.getElementById("lbl").innerText = "X : " + args.point.x + "\nY : " + args.point.y;
  };

  // by caste data

  public casteData: Object[];
  public casteDataLael: Object;
  public casteTooltip: Object;
  public casteTitle: String;
  public castepalette: string[];

  // by occupation data

  public occuList: Object[];
  public occuDataLael: Object;
  public occuTooltip: Object;
  public occuTitle: String;
  //public palette1: string[];

  // by vote status data

  public voterVoted: Object[];
  public voteDataLael: Object;
  public voteTooltip: Object;
  public voteTitle: String;
  public votePalette: string[];

  // by color data

  supporterVoter:any;
  oppositionVoter:any;
  doubtfulVoter:any;
  otherVoter:any;
  public primaryXAxis: Object;
  public colordatalabel: Object;
  public colorTooltip: Object;
  public colorTitle: String;
  public colorPalette: string[];
  
 

  constructor(
    private location: Location,
    private voter: VoterService, 
    private router:Router,
    private toast:IonicToastService,
    //private loader:LoaderService,
    private translateConfigService: TranslateConfigService
  ) {
    this.Language = this.translateConfigService.getCurrentLang();
   }

  ngOnInit(): void {
    this.id = localStorage.getItem("loginId");
    this.roleId = localStorage.getItem("userType");
    this.UserId = localStorage.getItem("loginId");
    this.RoleId = localStorage.getItem("userType");
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    // by village graph
    
    this.allVillages();
    this.totalDataLael = { visible: true };
    this.tooltip = { enable: true };
    this.title1 = 'Villagewise Data';
    // this.palette1 = ["#178ace", "#ffb8be", "#00e1a1"]

    // by caste graph

    this.allCastes();
    this.casteDataLael = { visible: true };
    this.casteTooltip = { enable: true };
    this.casteTitle = 'Castewise Data';
  
    // this.palette1 = ["#178ace", "#ffb8be", "#00e1a1"]

    // by occupatioin graph

    this.allOccupData();
    this.occuDataLael = { visible: true };
    this.occuTooltip = { enable: true };
    this.occuTitle = 'Professionwise Data';
    
    // by vote status graph

    this.votedList();
    this.voteDataLael = { visible: true };
    this.voteTooltip = { enable: true };
    this.voteTitle = 'Voted not-voted data';

    // by color graph

    this.colorWiseVoterList();
    
  }

  allVillages() {
    //this.loader.showLoading();
    if(this.Language == "kn"){
      this.Language = "Kannada"
    }
    else if(this.Language == "mr"){
      this.Language = "Marathi"
    }
    else if (this.Language == "hi") {
      this.Language = "Hindi"
    }
    else{
      this.Language = "English"
    }
    this.voter.villagedata({
      TableName: "Tbl_Voter",
      ColumnName: "Village",
      UserId : Number(this.id),
      roleID: Number(this.roleId),
      Language: this.Language
    }).subscribe(data => {
      if(data.length > 0){
        this.vilModal = data;
        //this.loader.hideLoader();
      }
      else{
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
        //this.loader.hideLoader();
      }
    },(err)=>{
      //this.loader.hideLoader();
    })
  }

  allCastes() {
    //this.loader.showLoading();
    if(this.Language == "kn"){
      this.Language = "Kannada"
    }
    else if(this.Language == "mr"){
      this.Language = "Marathi"
    }
    else if (this.Language == "hi") {
      this.Language = "Hindi"
    }
    else{
      this.Language = "English"
    }
    this.voter.CastData({
      TableName: "Tbl_Voter",
      ColumnName: "Caste",
      UserId : Number(this.id),
      roleID: Number(this.roleId),
      Language: this.Language
    }).subscribe(data => {
      if(data != 0){
        //this.loader.hideLoader();
        this.casteData = data;
       
      }
      else{
        //this.loader.hideLoader();
      }
    },(err)=>{
      //this.loader.hideLoader();
    })
  }

  allOccupData() {
    //this.loader.showLoading();
    this.Language = this.translateConfigService.getCurrentLang();
    if(this.Language == "kn"){
      this.Language = "Kannada"
    }
    else if(this.Language == "mr"){
      this.Language = "Marathi"
    }
    else if (this.Language == "hi") {
      this.Language = "Hindi"
    }
    else{
      this.Language = "English"
    }
    this.voter.occupaionData({
      TableName: "Tbl_Voter",
      ColumnName: "Occupation",
      UserId : Number(this.id),
      roleID: Number(this.roleId),
      Language: this.Language
    }).subscribe(data => {
      if(data != 0){
        //this.loader.hideLoader();
        this.occuList = data;
      }
      else{
        //this.loader.hideLoader();
      }
    },(err)=>{
      //this.loader.hideLoader();
    })
  }

  votedList(){
    //this.loader.showLoading();
    this.voter.getIsVoted(this.UserId,this.RoleId,this.Coloumn = 'IsVoted').subscribe(data=>{
      if(data != 0){
        //this.loader.hideLoader();
        this.voterVoted = data
      }
      else{
        //this.loader.hideLoader();
      }
    },(err)=>{
      //this.loader.hideLoader();
    })
  }

  colorWiseVoterList() {
    this.voter.getVoterByColor(this.userId,this.roleID).subscribe(data => {
      this.colorList = data;
      this.supporterVoter = data[0].supporter;
      this.oppositionVoter = data[0].opposition;
      this.doubtfulVoter = data[0].doubtful;
      this.otherVoter = data[0].other;
      
    this.colordatalabel = { visible: true };
    this.colorTooltip = { enable: true };
    this.colorTitle = 'Colourwise summary';
    this.colorPalette = ["#0bbb5f", "#f00", "#ffd34f","#ccc"]
    this.colorList = [
       { 'x': 'Supporter', y: this.supporterVoter },{ 'x': 'Opponent', y: this.oppositionVoter },
       { 'x': 'Doubtful', y: this.doubtfulVoter }, { 'x': 'Other', y: this.otherVoter }
    ];
    
    })
  }

  goBack() {
    this.location.back();
  }

}
