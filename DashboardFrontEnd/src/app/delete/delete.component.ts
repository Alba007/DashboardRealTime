import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogServerService } from '../dialog-server.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any ,
              private matdalogref:MatDialogRef<DeleteComponent> ,
             ) { }

  ngOnInit() {
  }
  closeDialog(){
    this.matdalogref.close("te") ;
  }
}
