import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogServerService } from '../dialog-server.service' ;
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.css']
})
export class SensorDetailsComponent implements OnInit {
  sensorForm:FormGroup
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<SensorDetailsComponent>,
    private DialogServerService: DialogServerService,
    private SocketService: SocketService) { }
  ngOnInit() {
    if (this.data.message) {
      var latLng = this.data.message.gpsData.split(",")
      var datas = this.data.message.data.split(",")
      this.sensorForm = new FormGroup({
        name: new FormControl(this.data.message.name, Validators.required),
        description: new FormControl(this.data.message.description, Validators.required),
        latitude: new FormControl(latLng[0]),
        longitude: new FormControl(latLng[1]),
        workTime: new FormControl(this.data.message.workTime, Validators.required),
        temperature: new FormControl(datas[0]),
        humidity: new FormControl(datas[1]),
        tempForceing: new FormControl(datas[2])
      })
}
    //this.data=undefined prndj po shtohet
    else{
      this.sensorForm=new FormGroup({
        name:new FormControl('',Validators.required),
        description: new FormControl('', Validators.required),
        latitude: new FormControl('', Validators.required),
        longitude: new FormControl('', Validators.required),
        workTime: new FormControl('', Validators.required),
        temperature: new FormControl('', Validators.required),
        humidity: new FormControl('', Validators.required),
        tempForceing: new FormControl('', Validators.required),
      })
    }
  }
  save() {
   if (this.data.message) {
      //po editon
       this.DialogServerService.editSensor(
       this.data.message.id,
       this.sensorForm.value['name'],
       this.sensorForm.value['description'],
       this.sensorForm.value['longitude'],
       this.sensorForm.value['latitude'],
       this.sensorForm.value['workTime'],
       this.sensorForm.value['temperature'],
       this.sensorForm.value['humidity'],
       this.sensorForm.value['tempForceing']).subscribe(res=>{}) ;
       this.closeDialog();
    }
   else {
     //po shton
    this.DialogServerService.postSensor(
      this.sensorForm.value['name'],
      this.sensorForm.value['description'],
      this.sensorForm.value['latitude'],
      this.sensorForm.value['longitude'],
      this.sensorForm.value['workTime'],
      this.sensorForm.value['temperature'],
      this.sensorForm.value['humidity'],
      this.sensorForm.value['tempForceing']
    ).subscribe(res=>{}) ;
    this.closeDialog() ;
  }}
  //mbyllet dialogu
  closeDialog(){
    this.dialogRef.close() ;
  }
}
