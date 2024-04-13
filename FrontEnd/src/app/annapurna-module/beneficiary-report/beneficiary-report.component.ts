import { Component, OnInit } from '@angular/core';
import { AnnapurnaService } from 'src/app/services/annapurna.service';
import { Location } from '@angular/common';
import { ExcelService } from 'src/app/services/excel.service'
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-beneficiary-report',
  templateUrl: './beneficiary-report.component.html',
  styleUrls: ['./beneficiary-report.component.css']
})
export class BeneficiaryReportComponent implements OnInit {

  beneficiaryModal:any={};
  maxDate:String = new Date().toISOString();
  year: number = new Date().getFullYear();
  allBeneficiary:any;
  cp: number = 1;

  constructor(
    private annapurna:AnnapurnaService,
    private location:Location,
    private excel:ExcelService,
    private csv:CsvService
  ) { }

  ngOnInit(): void {
  }

  beneficiaryList(){
    if(this.beneficiaryModal.Name==undefined){
      this.beneficiaryModal.Name=''
    }else{
      this.beneficiaryModal.Name = this.beneficiaryModal.Name
    }
    if(this.beneficiaryModal.FromDate==undefined){
      this.beneficiaryModal.FromDate=''
    }else{
      this.beneficiaryModal.FromDate = this.beneficiaryModal.FromDate
    }
    if(this.beneficiaryModal.ToDate==undefined){
      this.beneficiaryModal.ToDate = this.beneficiaryModal.FromDate
    }else{
      this.beneficiaryModal.ToDate = this.beneficiaryModal.ToDate
    }
    this.annapurna.getBeneficiaryReport(this.beneficiaryModal.Name,this.beneficiaryModal.FromDate,this.beneficiaryModal.ToDate).subscribe(data=>{
      if(data){
        this.allBeneficiary = data;
      }else{

      }
    },(err)=>{

    })
  }

  goBack(){
    this.location.back();
  }

  exportExcel():void {
    this.excel.exportAsExcelFile(this.allBeneficiary, 'Beneficiary');
  }

  exportToCSV() {
    this.csv.exportToCsv(this.allBeneficiary, 'Beneficiary');
  }

}
