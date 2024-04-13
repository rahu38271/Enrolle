import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService} from 'src/app/services/loader.service'
import { VoterService} from 'src/app/services/voter.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css'] 
})
export class FamilyComponent {
  id: any;
  familyData: any;
  UserId: any;
  roleID:any;
  searchWeb:string;
  PageNo:any=1;
  NoofRow:any=10;
  Language:any;
  totalItems:any;
  
  constructor(
    private loader:LoaderService, 
    private voter:VoterService,
    private route:ActivatedRoute, 
    private router:Router,
    private location:Location,
    private translateConfigService: TranslateConfigService,
     ) { 
      this.Language = this.translateConfigService.getCurrentLang();
  }

  // voterDetails(item:any){
  //   this.router.navigate(['voterdata-management/voter-details'], { state: item })
  //  }

  voterDetails(data){
    this.id = data.id;
    this.router.navigate(['/voterdata-management/voter-details', this.id])
  }

  ngOnInit(): void {
    this.UserId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.id = this.route.snapshot.paramMap.get('Id');
    
  }

  ionViewWillEnter(){
    this.familyWiseVoterData(this.id,this.PageNo,this.NoofRow,this.Language);
  }

  event(event:any){
    this.PageNo = event;
    this.familyWiseVoterData(this.id,event,this.NoofRow,this.Language)
  }

  familyWiseVoterData(id:any,PageNo:any,NoofRow:any,Language:any){
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
    this.voter.getVoterByFamily(id,PageNo,NoofRow,this.Language).subscribe(data=>{
      if(data){
        this.familyData= data;
        this.totalItems = data[0].totalCount;
      }else{

      }
    })
  }

  goBack(){
    this.location.back();
  }

}
