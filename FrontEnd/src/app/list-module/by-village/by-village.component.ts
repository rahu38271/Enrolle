import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voter.service'
import { Router } from '@angular/router'
import { IonicToastService} from 'src/app/services/ionic-toast.service'
import { LoaderService } from 'src/app/services/loader.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { Location } from '@angular/common';
import { IAccTooltipRenderEventArgs, IPointEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-by-village',
  templateUrl: './by-village.component.html',
  styleUrls: ['./by-village.component.scss'],
})
export class ByVillageComponent implements OnInit {
  Language:any;
  isShow = false;
  searchMob:string;
  id:any;
  roleId:any;
  public vilModal: Object[];
  public totalDataLael: Object;
  public tooltip: Object;
  public title1: String;
  public palette1: string[];
  public pointClick(args: IPointEventArgs): void {
    document.getElementById("lbl").innerText = "X : " + args.point.x + "\nY : " + args.point.y;
  };

  constructor(
    private voter: VoterService, 
    private router:Router,
    private toast:IonicToastService,
    private loader:LoaderService,
    private translateConfigService: TranslateConfigService,
    private location:Location
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
    this.totalDataLael = { visible: true };
    this.tooltip = { enable: true };
    this.title1 = 'Villagewise Data';
    // this.palette1 = ["#178ace", "#ffb8be", "#00e1a1"]
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

  goBack(){
    this.location.back();
  }

}
