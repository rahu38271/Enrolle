import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { IonicToastService} from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';


@Component({
  selector: 'app-by-village',
  templateUrl: './by-village.component.html',
  styleUrls: ['./by-village.component.scss'],
})
export class ByVillageComponent implements OnInit {
  Language:any;
  isShow = false;
  vilModal: any;
  searchMob:string;
  id:any;
  roleId:any;

  constructor(
    private voter: VoterService, 
    private router:Router,
    private toast:IonicToastService,
    private loader:LoaderService,
    private translateConfigService: TranslateConfigService,
    ) {
      this.Language = this.translateConfigService.getCurrentLang();
     }

  search() {
    this.isShow = !this.isShow
  }

  ngOnInit() {
    this.id = localStorage.getItem("loginId");
    this.roleId = localStorage.getItem("userType");
    this.allVillages();
  }

  villageName(columnName:any){
    this.router.navigate(['/list/villagewise-list',  {villageName :columnName} ])
   }

  allVillages() {
    this.loader.showLoading();
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
        this.loader.hideLoader();
      }
      else{
        this.toast.presentToast("No data available", "danger", 'alert-circle-sharp');
        this.loader.hideLoader();
      }
    },(err)=>{
      this.loader.hideLoader();
    })
  }

  onSearchChange(event: CustomEvent) {
    if (event.detail.value) {
      this.searchMob = event.detail.value.trim();
    }
  }

}
