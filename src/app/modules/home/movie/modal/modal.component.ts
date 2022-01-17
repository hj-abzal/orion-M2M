import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableDatatTransferType } from '../table/table.component';

type TitlesType = {
  starships: string[];
  characters: string[];
  planets: string[];
}
type dataType = {
  $event: TableDatatTransferType;
  titles: TitlesType
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalData: TableDatatTransferType;
  titles: any;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataType
    ) { }

  ngOnInit(): void {
    this.modalData = this.data.$event
    this.titles = this.data.titles
    console.log(this.data);
    
  }
  closeModal() {
    this.dialogRef.close();
  }
}
