import { Component,ChangeDetectorRef,ViewChild } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router, ActivatedRoute } from '@angular/router'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service'
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-voterby-user',
  templateUrl: './voterby-user.component.html',
  styleUrls: ['./voterby-user.component.css']
})
export class VoterbyUserComponent {
  Language: any
  id: any;
  RoleId: any;
  voterListByUser: any;
  isShow = true;
  isMike: boolean;
  searchWeb: string;
  EditVoter: any;
  cp: number = 1;
  PageNo: any =1
  NoofRow: any =25
  totalCount: any;
  totalCountByUser:any;
  casteList:any;
  searchTerm:string;
  SearchText:any;
  birthDate:any;
  vid:any;
  Lid:any;
  item:any;
  search() {
    this.isShow = !this.isShow
  }

  searchVoterModal:any


  constructor
    (
      private voter: VoterService,
      private router: Router,
      private route: ActivatedRoute,
      private toast: IonicToastService,
      private loader: LoaderService,
      public alertController: AlertController,
      public translate: TranslateService,
      private translateConfigService: TranslateConfigService
    ) {
      
  }

  ngOnInit() {
    this.Language = this.translateConfigService.getCurrentLang();
    this.Lid = localStorage.getItem("loginId");
    this.RoleId = localStorage.getItem("userType");
    
  }

  ionViewWillEnter(){
    this.voterList(this.Lid, this.RoleId, this.PageNo, this.NoofRow,this.Language,this.SearchText);
    this.totalVoterCount();
    this.AllCasts();
  }

  totalVoterCount() {
    this.voter.getVoterCountByUser(this.Lid, this.RoleId).subscribe(data => {
      this.totalCountByUser = data
    })
  }


  
  voterList(Lid: any, RoleId: any, PageNo: any, NoofRow: any, Language:any,SearchText:any) {
    //this.loader.showLoading();
    this.Language = this.translateConfigService.getCurrentLang();
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
    if(this.SearchText == undefined){
      this.SearchText = ''
    }
    else{
      this.SearchText = this.SearchText.trim();
    }
    this.voter.getVoterByUser(Lid, RoleId, PageNo, NoofRow, this.Language, this.SearchText).subscribe(data => {
      if (data.length != 0) {
        //this.loader.hideLoader();
        this.voterListByUser = data;
        this.totalCount = data[0].totalCount;

        // this.voterListByUser.forEach(e => {
        //   e.birthDate = e.birthDate.split('T')[0];
        // });
        // this.searchWeb = this.searchWeb.trim();
      }
      else {
        //this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    }, (err) => {
      //this.loader.hideLoader();
      
    })
  }

  event(event: any) {
    this.PageNo = event;
    this.voterList(this.Lid, this.RoleId, event, this.NoofRow,this.Language,this.SearchText)
  }


  onSearchChange(SearchText: any): void { 
    if (this.SearchText == '') {
      this.SearchText = SearchText;
      this.PageNo = 1;
      this.NoofRow = this.totalCount;
      this.voterList(this.Lid, this.RoleId, this.PageNo, this.NoofRow, this.Language, SearchText)
    }
    else {
      this.SearchText = SearchText.trim();
      this.PageNo = 1;
      this.NoofRow = 25;
      this.voter.getVoterByUser(this.Lid, this.RoleId, this.PageNo, this.NoofRow, this.Language, SearchText).subscribe(data => {
        if (data.length != 0) {
          //this.loader.hideLoader();
          this.voterListByUser = data;
          this.totalCount = data[0].totalCount;
          // this.voterListByUser.forEach(e => {
          //   e.birthDate = e.birthDate.split('T')[0];
          // });
        }
        else {
          //this.loader.hideLoader();
          this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
        }
      })
    }
  }

  keyPress(SearchText: any){
    if (this.SearchText == '') {
      this.SearchText = SearchText;
      this.PageNo = 1;
      this.NoofRow = this.totalCount;
      this.voterList(this.Lid, this.RoleId, this.PageNo, this.NoofRow, this.Language, SearchText)
    }
    else {
      this.SearchText = SearchText.trim();
      this.PageNo = 1;
      this.NoofRow = 25;
      this.voter.getVoterByUser(this.Lid, this.RoleId, this.PageNo, this.NoofRow, this.Language, SearchText).subscribe(data => {
        if (data) {
          //this.loader.hideLoader();
          this.voterListByUser = data;
          this.totalCount = data[0].totalCount;
          // this.voterListByUser.forEach(e => {
          //   e.birthDate = e.birthDate.split('T')[0];
          // });
        }
      })
    }
  }

  // data with state
  // voterDetails(item: any) {
  //   this.router.navigate(['voterdata-management/voter-details'], { state: item })
  // }

  // data with id
  // voterDetails(id: number) {
  //   this.router.navigate(['/voterdata-management/voter-details', id])
  // }

  voterDetails(data){
    this.id = data.id;
    this.router.navigate(['/voterdata-management/voter-details', this.id])
    
  }

  // voterInfo(data){
  //   this.id = data.id;
  //   this.router.navigate(['/voterdata-management/voter-info', this.id])
  // }



  AllCasts(){
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
    this.voter.getAllCaste(this.Language).subscribe(data=>{
      this.casteList = data;
    })
  }

  toggleMike() {
    this.isMike = !this.isMike;
    let options = {
      Language: this.Language
    }
   
  }

}
