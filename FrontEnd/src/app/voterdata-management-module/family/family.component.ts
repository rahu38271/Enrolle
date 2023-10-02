import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService} from 'src/app/services/loader.service'
import { VoterService} from 'src/app/services/voter.service'
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent {
  id: any;
  familyData: any;
  userId: any;
  roleID:any;
  searchWeb:string;
  PageNo:any=1;
  NoofRow:any=10;
  Language:any;
  totalItems:any;
  address:any;
  
  constructor(
    private loader:LoaderService, 
    private voter:VoterService,
    private route:ActivatedRoute, 
    private router:Router,
    private translateConfigService: TranslateConfigService,
     ) { 
      this.Language = this.translateConfigService.getCurrentLang();
  }

  voterDetails(item:any){
    this.router.navigate(['voterdata-management/voter-details'], { state: item })
   }

  

  ngOnInit(): void {
    this.userId = localStorage.getItem("loginId");
    this.roleID = localStorage.getItem("userType");
    this.id = this.route.snapshot.paramMap.get('Id');
    this.address = this.route.snapshot.paramMap.get('Address')
    this.familyWiseVoterData(this.userId,this.roleID,this.PageNo,this.NoofRow,this.Language);
  }

  event(event:any){
    this.PageNo = event;
    this.familyWiseVoterData(this.id,this.roleID,event,this.NoofRow,this.Language)
  }

  familyWiseVoterData(userId:any,roleID:any,PageNo:any,NoofRow:any,Language:any){
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
    this.voter.getByRelation(this.id, userId,roleID,PageNo,NoofRow,this.Language).subscribe(data=>{
      if(data){
        console.log(data);
        this.familyData= data;
        //this.totalItems = data[0].totalCount
      }else{

      }
    })
  }

}
