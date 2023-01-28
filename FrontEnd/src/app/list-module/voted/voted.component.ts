import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voted',
  templateUrl: './voted.component.html',
  styleUrls: ['./voted.component.scss'],
})
export class VotedComponent implements OnInit {

  isShow = false;

  constructor() { }

  search(){
    this.isShow = !this.isShow
  }

  ngOnInit() {
    $('#villageTable').DataTable({
      lengthMenu: [ [25, 50, 100, -1], [25, 50, 100, "All"] ],
      pageLength: 25,
      autoWidth: false,
      "columnDefs": [
        { "width": "20px", "targets": 0 },
        { "width": "100px", "targets": 1 },
        { "width": "70px", "targets": 2 }
      ],
    });
  }

}
