import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GetDataService} from '../get-data.service'
import { DialogServerService } from '../dialog-server.service'
import { Sensor1 } from '../sensor';
import { SocketService } from '../socket.service';
@Component({
  selector: 'app-sensors-list',
  templateUrl: './sensors-list.component.html',
  styleUrls: ['./sensors-list.component.css']
})
export class SensorsListComponent implements OnInit {
  displayedColumns = ['name', 'description', 'workTime', 'gpsData',  'data', 'actions'];
  sensor:any=null
  sensorData: Sensor1[]=[] ;
  searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator = null;
  constructor(private getDataServise: GetDataService ,
              private DialogServerService: DialogServerService,
              private SocketService: SocketService) { }
  ngOnInit() {
    this.getData();
  }
  add() {
      this.getDataServise.openSensorDetails(undefined).afterClosed().subscribe(res=>{
        this.updatePermbajtjen() ;
      })
  }
  edit(sensor){
    this.getDataServise.openSensorDetails(sensor).afterClosed().subscribe(res=>{
      this.updatePermbajtjen();
    }) ;
  }
  delete(sensor){
    this.getDataServise.openConfirmDialog("Are u sure you want to delete?").afterClosed().subscribe(res=>{
       if (res) {
         //deshiron ta fshije
         this.DialogServerService.deleteCamera(sensor.id).subscribe(res=>{
           this.updatePermbajtjen()}) }})  }
  filter($event){
    this.sensor.filter = $event.target.value.trim().toLowerCase();;
  }
  getData() {
    this.sensor=[]
    this.sensorData=[]
    this.DialogServerService.getData().subscribe(res => {
      var i = 0;
      for (i = 0; i < res.length; i++) {
        var obj = {
          id: res[i]._id,
          name: res[i].name,
          description: res[i].description,
          gpsData: res[i].gpsData.longitude + "," + res[i].gpsData.latitude,
          workTime: res[i].workTime,
          data: res[i].data.temperature + "," + res[i].data.humidity + "," + res[i].data.tempForc
        }
        this.sensorData.push(obj);
      }
      this.sensor = new MatTableDataSource(this.sensorData);
      this.sensor.paginator = this.paginator;
    })}
  updatePermbajtjen() {
  this.getData() ;
  }
}
