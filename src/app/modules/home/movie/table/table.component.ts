import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICharacter, IStarship, IPlanet } from 'app/interfaces';

export type TableDatatTransferType = { [tableName: string]: any }
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() tableTitle: string;
  @Input() titles: string[];
  @Input() data: (ICharacter[] | IStarship[] | IPlanet[]) | any = [];
  @Output() messageEvent = new EventEmitter<TableDatatTransferType>();

  forTransfer = {
    starships: '',
    characters: '',
    planets: ''
  }
  constructor() { }

  openModalComponent(tableData: any) {
    this.messageEvent.emit({ ...this.forTransfer, [this.tableTitle]: tableData })
  }
  ngOnInit(): void {
  }

}
