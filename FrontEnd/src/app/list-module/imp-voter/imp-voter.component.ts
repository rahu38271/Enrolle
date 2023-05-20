import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { VoterService } from 'src/app/services/voter.service'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-imp-voter',
  templateUrl: './imp-voter.component.html',
  styleUrls: ['./imp-voter.component.css']
})
export class ImpVoterComponent implements OnInit {
  Language: any;
  isShow = false;
  impVoterData: any;
  userId: any;
  roleID: any;
  PageNo:any=1;
  NoofRow:any=10;
  totalItems:any;
  SearchText:any;

  search() {
    this.isShow = !this.isShow
  }

  constructor(
    private router: Router,
    private voter: VoterService,
    private loader: LoaderService,
    private translateConfigService: TranslateConfigService,
  ) {
    this.Language = this.translateConfigService.getCurrentLang();
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    if (this.SearchText==undefined) {
      this.SearchText = ''
    }
    else {
      this.SearchText = this.SearchText
    }
    this.impVoterList(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language,this.SearchText);
  }

  event(event: any) {
    this.PageNo = event;
    this.impVoterList(this.userId,this.roleID,event,this.NoofRow,this.Language,this.SearchText)
  }

  voterDetails(item: any) {
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
  }

  impVoterList(userId: any, roleID: any, PageNo: any, NoofRow: any, Language: any, SearchText: any) {
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
    this.voter.impVoter(userId, roleID, PageNo, NoofRow, this.Language, this.SearchText).subscribe(data => {
      if (data.length != 0) {
        this.impVoterData = data;
        this.totalItems = data[0].totalCount
      }
      else {
      }
    }, (err) => {

    })
  }

  onSearchChange(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.impVoterList(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 10;
      this.SearchText = SearchText;
      this.voter.impVoter(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
        if (data) {
          this.impVoterData = data;
          this.totalItems = data[0].totalCount
        }
        else {
        }
      })
    }
  }

  keyPress(SearchText: any) {
    if (this.SearchText == '') {
      this.PageNo = 1;
      this.NoofRow = this.totalItems;
      this.SearchText = SearchText;
      this.impVoterList(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText);
    }
    else {
      this.PageNo = 1;
      this.NoofRow = 10;
      this.SearchText = SearchText;
      this.voter.impVoter(this.userId, this.roleID, this.PageNo, this.NoofRow, this.Language, this.SearchText).subscribe(data => {
        if (data) {
          this.impVoterData = data;
          this.totalItems = data[0].totalCount
        }
        else {
        }
      })
    }
  }


}
