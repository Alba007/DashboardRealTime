import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogServerService {
  _url: string = "http://localhost:8080/api/sensor";
  _url2: string ="http://localhost:8080/apiDash/dashboard";
  _url3: string = "http://localhost:8080/api/graph";
  constructor(private http: HttpClient,
    private dialog: MatDialog) { }


  getData(): Observable<any[]> {
    return this.http.get<any[]>(this._url);
  }
 
  postSensor(name, description, latitude, longitude, workTime, temperature, humidity, tempForceing) {
    const obj = {
      name: name,
      description: description,
      workTime: workTime,
      data: {
        temperature: temperature,
        humidity: humidity,
        tempForc: tempForceing
      },
      gpsData:{
        latitude: latitude,
        longitude: longitude
      }
    };
    return this.http.post(`${this._url}`, obj);
  }
  getDashboard(): Observable<any[]> {
    return this.http.get<any[]>(this._url2);
  }
  postDashboard(name,description) {
    const obj={
               name:name ,
               description:description
    }
    return this.http.post(`${this._url2}`, obj);
  }
  editSensor(_id,name, description, latitude, longitude, workTime, temperature, humidity, tempForceing) {
     const obj = {
       _id: _id,
       name: name,
       description: description,
       workTime: workTime,
       data: {
         temperature: temperature,
         humidity: humidity,
         tempForc: tempForceing
       },
       gpsData: {
         latitude: latitude,
         longitude: longitude
       }
     };
     
    return this.http.put(`${this._url}/${_id}`, obj);

 }
 deleteCamera(id) {
   return this.http.delete(`${this._url}/${id}`) ;
 }
  addDash(id, name, description) {
    const obj = {
      name: name,
      description: description }
    return this.http.post(`${this._url2}`, obj);
 }
 editDash(obj)  {
   return this.http.put(`${this._url2}/${obj.id}`, obj);
   }
  addChart(obj){
    return this.http.post(`${this._url3}`, obj);
  }
  getCharts() : Observable<any[]> {
    return this.http.get<any[]>(this._url3) ;
  }
  editChart(chart) {
    return this.http.put(`${this._url3}/${chart._id}`, chart);
  }
  deleteChart(id) {
    return this.http.delete(`${this._url3}/${id}`);
  }
  deleteDashboard(id) {
    console.log(id)
     return this.http.delete(`${this._url2}/${id}`);
  }
}

