import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICharacter, IStarship, IPlanet } from 'app/interfaces';

export type TableDatatTransferType = { [tableName: string]: any }
type DataType = ICharacter | IStarship | IPlanet;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  @Input() tableTitle: string;
  @Input() titles: string[];
  @Input() data: (ICharacter[] | IStarship[] | IPlanet[]) | any = [];
  @Input() _data: (ICharacter[] | IStarship[] | IPlanet[]) | any = [];
  @Output() messageEvent = new EventEmitter<TableDatatTransferType>();

  sortStatus = "idle";

  forTransfer = {
    starships: '',
    characters: '',
    planets: ''
  }

  rowData: [] | any = []
  constructor() {

   }
  ngOnInit(): void {
  }

  sortData(sort: 'A-Z' | 'Z-A', data: DataType[]) {
    data.sort((a: DataType, b: DataType) => {
      let textA = a.name.toLowerCase();
      let textB = b.name.toLowerCase();
      if (sort === 'A-Z') {
        return (textA < textB) ? -1 : (textA < textB) ? 1 : 0
      } else if (sort === 'Z-A') {
        return (textA > textB) ? -1 : (textA > textB) ? 1 : 0
      } else {
        return 0
      }
    })
  }
  sortByName() {
    if (this.sortStatus === "idle") {
      this.sortData('A-Z', this.data)
      this.sortStatus = 'A-Z';
    } else if (this.sortStatus === "A-Z") {
      this.sortData('Z-A', this.data)
      this.sortStatus = 'Z-A';
    } else {
      this.data = [...this._data[this.tableTitle]]
      this.sortStatus = 'idle';
    }
  }
  
  openModalComponent(tableData: any) {
    this.messageEvent.emit({ ...this.forTransfer, [this.tableTitle]: tableData })
  }
  

}
