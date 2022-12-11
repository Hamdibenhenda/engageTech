import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataList: any = [];
  providersList: any = [];
  total : any = [];
  sortByNameAsc: boolean = true;
  sortAsc: boolean = true;
  activeSortColumn = 'PAYROLL PROVIDER'
  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (response: any) => {
        this.dataList = response[0];
        this.total = response[0]['total'][0];        
        this.sortByName(true)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  sortByKey(key: any, asc:boolean) {
    this.providersList = [this.dataList['directContractors'][0], ...this.dataList['providers']]
    if (asc === false) { 
    this.providersList = [...this.providersList].sort((a, b) => b[key]-a[key]) 
    } else {
      this.providersList = [...this.providersList].sort((a, b) => a[key]-b[key]) 
    }
  }

  sortByName(asc:boolean) {    
    if (asc === false) {
      this.providersList = [...this.dataList['providers']].sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
    } else {
      this.providersList = [...this.dataList['providers']].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    }

    this.providersList = [this.dataList['directContractors'][0], ...this.providersList]
  }

}

