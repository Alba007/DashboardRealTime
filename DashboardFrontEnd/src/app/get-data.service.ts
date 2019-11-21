import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material'
import { DashBoardComponent } from './dash-board/dash-board.component';
import { SensorDetailsComponent } from './sensor-details/sensor-details.component';
import { DeleteComponent } from './delete/delete.component';
import { GraphComponent } from './graph/graph.component';
@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  constructor(private http:HttpClient,
             private dialog:MatDialog) { }
 
  openDashboard(dash){
    //hap modalin e shtimit te dashboard
    return this.dialog.open(DashBoardComponent,{
      //karakteristikat e modalit
      width:'350px',
      disableClose:true,
      data: {
        message: dash
      }
    });
  }
  openSensorDetails(sensor:any) {
    //hap modalin per shtimin ose editimin e nje sensori
   return this.dialog.open(SensorDetailsComponent,{
     //karakteristikat e modalit
     width: '350px',
     disableClose: true,
     data: {
       message: sensor
     }

   })
  }
 openConfirmDialog(msg) {
   return this.dialog.open(DeleteComponent,{
     width: '300px',
     disableClose: true,
     data: {
       message: msg
     }
   })
}
openGraph(dash){
 return  this.dialog.open(GraphComponent,{
    width: '400px',
    disableClose: true,
    data: {
      message: dash
    }
  })
}
}