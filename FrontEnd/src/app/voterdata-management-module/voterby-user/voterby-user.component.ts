import { Component } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router, ActivatedRoute } from '@angular/router'
import { IonicToastService } from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service'
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Observable } from 'rxjs/Observable';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-voterby-user',
  templateUrl: './voterby-user.component.html',
  styleUrls: ['./voterby-user.component.css']
})
export class VoterbyUserComponent {
  Language: any;
  id: any;
  RoleId: any;
  voterListByUser: any;
  isShow = true;
  isMike: boolean;
  searchWeb: string;
  EditVoter: any;
  cp: number = 1;
  PageNo: any = 1
  NoofRow: any = 25;
  totalCount: any;
  totalCountByUser:any;
  filterModal: any = {
    TableName: "Tbl_Voter",
    ColumnName: "Fullname",
    ColumnValue: '',
    Condition: "Great",
    UserId: '',
    RoleId: '',
    PageNo: '',
    NoofRow: '',
    Language: ''
  }
  search() {
    this.isShow = !this.isShow
  }

  constructor
    (
      private voter: VoterService,
      private router: Router,
      private route: ActivatedRoute,
      private toast: IonicToastService,
      private loader: LoaderService,
      public alertController: AlertController,
      public translate: TranslateService,
      private translateConfigService: TranslateConfigService,
      private speechRecognition: SpeechRecognition,
      private cd: ChangeDetectorRef
    ) {
    this.Language = this.translateConfigService.getCurrentLang();
    this.speechRecognition.requestPermission()
      .then(() => console.log('Permission granted'))
      .catch(() => console.log('Permission denied'));

  }

  ngOnInit() {
    this.id = localStorage.getItem("loginId");
    this.RoleId = localStorage.getItem("userType");
    this.voterList(this.id, this.RoleId, this.PageNo, this.NoofRow, this.Language);
    this.totalVoterCount();

  }

  totalVoterCount() {
    this.voter.getVoterCountByUser(this.id, this.RoleId).subscribe(data => {
      this.totalCountByUser = data
    })
  }

  event(event: any) {
    this.PageNo = event;
    this.voterList(this.id, this.RoleId, event, this.NoofRow, this.Language)
  }

  voterList(id: any, RoleId: any, PageNo: any, NoofRow: any, Language: any) {
    this.loader.showLoading();
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
    this.voter.getVoterByUser(id, RoleId, PageNo, NoofRow, this.Language).subscribe(data => {
      if (data != 0) {
        this.loader.hideLoader();
        this.voterListByUser = data;
        this.totalCount = data[0].totalCount
      }
      else {
        this.loader.hideLoader();
        this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
      }
    }, (err) => {
      this.loader.hideLoader();
      this.toast.presentToast("No data available", "danger", 'alert-circle-outline');
    })
  }

  voterDetails(item: any) {
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
  }

  toggleMike() {
    this.isMike = !this.isMike;
    let options = {
      Language: this.Language
    }
    if (!this.isMike) {
      this.speechRecognition.hasPermission()
        .then((hasPermission: boolean) => {
          if (!hasPermission) {
            this.speechRecognition.requestPermission();
          }
        });
      this.speechRecognition.startListening().subscribe(voterListByUser => {
        this.voterListByUser = this.voterListByUser;
        this.cd.detectChanges();
      });
      this.isMike = true;
    }
    else if (this.isMike) {
      this.speechRecognition.stopListening().then(() => {
        this.isMike = false;
      });
    }
  }

  filterVoter() {
    debugger;
    this.voter.filterVoterByCondition(this.filterModal).subscribe(data => {

    })
  }



}
