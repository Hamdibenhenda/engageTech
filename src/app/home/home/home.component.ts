import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true }
    )
  ])
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [listAnimation]
})
export class HomeComponent implements OnInit {

  dataList: any = [];
  providersList: any = [];
  total: any = [];
  sortByNameAsc: boolean = true;
  sortAsc: boolean = true;
  activeSortColumn = 'PAYROLL PROVIDER'
  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (response: any) => {
        this.dataList = response[0];
        this.total = response[0]['total'][0];
        this.sortByName(true)
      },
      error: (e) => console.error(e)
    })
  }

  sortByKey(key: any, asc: boolean) {
    this.providersList = [];
    setTimeout(() => {
      this.providersList = [this.dataList['directContractors'][0], ...this.dataList['providers']]
      if (asc === false) {
        this.providersList = [...this.providersList].sort((a, b) => b[key] - a[key])
      } else {
        this.providersList = [...this.providersList].sort((a, b) => a[key] - b[key])
      }
    }, 200);
  }

  async sortByName(asc: boolean) {
    this.providersList = [];
    setTimeout(() => {
      if (asc === false) {
        this.providersList = [...this.dataList['providers']].sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
      } else {
        this.providersList = [...this.dataList['providers']].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      }
      this.providersList = [this.dataList['directContractors'][0], ...this.providersList]
    }, 200);
  }

  calculatePercentage(amount: number) {
    return ((amount / this.total.labourCostTotal) * 100).toFixed(2);
  }

}

