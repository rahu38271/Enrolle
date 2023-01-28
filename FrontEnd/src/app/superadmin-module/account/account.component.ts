import { Component, OnInit } from '@angular/core';
import { SuperadminService} from 'src/app/services/superadmin.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  getSAData: any;
  Sadmin: any;

  constructor
    (
      private sadmin:SuperadminService,
      private route:ActivatedRoute,
      //private router:Router
    ) { }

    // EditSA(data:any){
    //   this.router.navigateByUrl('/superadmin/edit-superadmin', {state:data})
    // }

  ngOnInit(): void {
    this.details();
  }

  details(){
    this.sadmin.getAllMAdmin().subscribe((data) =>{
      const Sid = this.route.snapshot.paramMap.get('id') || "";
      [this.Sadmin] = data.filter((Sadmin) => Sadmin.id == Sid);
      this.getSAData = this.Sadmin
    })
  }

}
