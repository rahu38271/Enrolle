import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService} from 'src/app/services/loader.service'
import { VoterService} from 'src/app/services/voter.service'

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent {
  id: any;
  familyData: any[]=[];
  userId: any;
  
  constructor(private loader:LoaderService, private voter:VoterService,private route:ActivatedRoute, private router:Router ) { 
      
  }

  voterDetails(id:number){
    this.router.navigate(['voterdata-management/voter-details', id])
   }

  ngOnInit(): void {
    this.userId = localStorage.getItem("loginId");
    this.id = this.route.snapshot.paramMap.get('Id');
    this.voter.getByRelation(this.id, this.userId).subscribe(data=>{
      if(data){
        this.familyData= data;
      }else{

      }
    })
  }

}
