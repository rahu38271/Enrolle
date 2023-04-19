import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-letter',
  templateUrl: './add-letter.component.html',
  styleUrls: ['./add-letter.component.css']
})
export class AddLetterComponent implements OnInit {

  districtList: any;
  talukaList: any;

  constructor(
    public contact: ContactService,
  ) { }

  getDistrict() {
    this.contact.getDistrictData().subscribe((data) => {
      if (data.length > 0) {
        //console.log(data);
        this.districtList = data;
      }
    }, (error) => {

    })
  }

  getTaluka(dId: any) {
    this.contact.getTalukaData(dId).subscribe((data) => {
      if (data.length > 0) {
        //console.log(data);
        //this.contactModal.District = this.districtList.find(x => x.dId == dId).districtName;
        this.talukaList = data;
      }
    }, (error) => {

    })
  }

  ngOnInit(): void {
    this.getDistrict();
  }

}
