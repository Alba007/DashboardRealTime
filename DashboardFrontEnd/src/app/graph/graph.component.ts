import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogServerService } from '../dialog-server.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  graph_types=["bar","pie","line"];
  datasource=["workTime","temperature", "humidity", "tempForc"]
  graphForm: FormGroup ;
  //ben te mundur shfaqjen ose jo te grafikur
  del:boolean=false ;
  constructor( @Inject(MAT_DIALOG_DATA) public data:any ,
              private dialogRef: MatDialogRef<GraphComponent>,
              private getDialogData: DialogServerService) { }

ngOnInit() {
  //nese eshte defined do te thote qe na ka ardhur nje graph prndj po editohet
  if (this.data.message._id){
    this.graphForm = new FormGroup({
      name: new FormControl(this.data.message.name, Validators.required),
      description: new FormControl(this.data.message.description, Validators.required),
      type: new FormControl(this.data.message.type, Validators.required),
      datasource: new FormControl(this.data.message.barChartData[0].label, Validators.required)
    })
    //i mundesojme edhe fshirjen ne rast editimi
    this.del=true ;
  }
  else {
     this.graphForm=new FormGroup({
      name: new FormControl('',Validators.required),
      description: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      datasource: new FormControl('', Validators.required)
        })
        //ne rast shtimi nuk ja mundesojme fshirjen
        this.del=false ;
      }
  }
closeDialog(){
    this.dialogRef.close() ;
}
save() {
   if (this.graphForm.invalid){}
   else {
if (this.data.message._id)
{
  const obj = {
    _id:this.data.message._id ,
    name: this.graphForm.value['name'],
    description: this.graphForm.value['description'],
    type: this.graphForm.value['type'],
    datasource: this.graphForm.value['datasource'],
    dashboard: this.data.message.dash
           }
   //editon nje grafik
    this.getDialogData.editChart(obj).subscribe() ;
    this.closeDialog()
} else {
  //shton nje grafik
    const obj = {
    name: this.graphForm.value['name'],
    description: this.graphForm.value['description'],
    type: this.graphForm.value['type'],
    datasource: this.graphForm.value['datasource'],
    dashboard: this.data.message.id
    }
    this.getDialogData.addChart(obj).subscribe();
    this.closeDialog()
}}}
//fshin nje grafik
  delete(){
    var id = this.data.message._id ;
    this.getDialogData.deleteChart(id).subscribe() ;
    this.closeDialog() ;
  }
}
