import { Component, OnInit, AfterViewInit, HostBinding} from '@angular/core';
import { GetDataService} from '../app/get-data.service'
import { DialogServerService} from '../app/dialog-server.service'
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SocketService } from './socket.service';
import { ReloadService } from './reload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  //percakton nese butoni i fshirjes do te shfaqet apo jo
  delete_dash:boolean[]=[] ;
  //legjenda e grafikut nuk do te shfaqet
  chartLegend:boolean=false ;
  //mban label per cdo grafik
  label:string ;
  //datasource i grafikut, do ti jepet vlere me poshte
  datasource:any[]=[];
  //mban id e dashboards
  dashboard:any[]=[] ;
  //mban objekte qe emrin dhe pershkrimin per cdo dashboard
  dashObj:any[]=[] ;
  //array qe mban objekte grafik 
  dashboardChart:any[] =[] ;
  //objekti grafik qe mbush vektorin dashboardChart
  mychart:any =null;
  //mban emrat e sensoreve
  labels: any[]=[] ;
  sensors:any[]=[] ;
  //array me datasource
  dataSources:string[]= ["temperature", "worktime", "humidity","tempForceing"] ;
  //4 vektoret qe mbajne te dhena te ndara per cdo datasource
  temperature:number[]=[];
  worktime:number[]=[] ;
  humidity:number[]=[] ;
  tempForceing:number[]=[] ;
  constructor(private getDataService: GetDataService,
              private DialogServerService: DialogServerService, 
              private SocketService:SocketService,
              private ReloadSer: ReloadService )
     {
       //inicializimi i te dhenave
      this.label="" ;
      this.dashObj=[]
      this.dashboard=[] ;
      this.labels=[] ;
      this.temperature=[] ;
      this.worktime=[]
      this.humidity=[];
      this.tempForceing=[]
  }
  ngOnInit() {
    //merrdashboard
    this.GetDash()
    this.GetSensor() ;
    //merr charts
    this.GetCharts() ;
    //reload te dhenat pa bere http request
    this.takeDataAgain();
  }
  GetDash() {
    //inicializimi i te dhenave per siguri
    this.label = "";
    this.dashObj = []
    this.dashboard = [];
    this.dashboardChart = [];
    this.temperature = [];
    this.worktime = [];
    this.humidity = [];
    this.tempForceing = [];
    this.mychart = null;
    this.labels = []
    this.DialogServerService.getDashboard().subscribe(res => {
      this.dashboard = res.map(function (item) {
        return item._id
      })
      this.dashObj = res.map(function (item) {
        var data = {
          id: item._id,
          name: item.name,
          description: item.description
        }
        return data;
      })
      for (var i = 0; i < res.length; i++) {
        //shtohet nje vend per cdo dashboard qe kemi sepse eshte array me dashboard dhe cdo dashboard mban array me grafik
        this.dashboardChart.push([]);
        this.delete_dash.push(true) ;
      }
    })
  }
  GetSensor() {
    //merr sensoret
    this.DialogServerService.getData().subscribe(res1 => {
      //labels mban emrat e sensoreve, ne menyre qe te shfaqen ne grafik
      this.labels = res1.map(function (sensor) {
             return sensor.name;
      })
      //mbushet vektoret e datasource per cdo sensor
      for (var i = 0; i < res1.length; i++) {
        this.sensors.push(res1[i]._id) ;
        this.temperature.push(res1[i].data.temperature);
        this.worktime.push(res1[i].workTime);
        this.humidity.push(res1[i].data.humidity);
        this.tempForceing.push(res1[i].data.tempForc);
      }
    })
  }
  GetCharts(){
    this.DialogServerService.getCharts().subscribe(graph => {
      var dash = 0;
      for (var j = 0; j < graph.length; j++) {
        this.datasource = [];
        var dash1 = this.dashboard.indexOf(graph[j].dashboard);
        //nuk duhet te fshihet sepse ka grafs
        this.delete_dash[dash1]=false ;
        if (graph[j].datasource == "temperature") {
          //datasource do te jete temperature
          for (var i = 0; i < this.temperature.length; i++) {
            this.datasource.push(this.temperature[i])
            this.label = "temperature";
          }
        }
        if (graph[j].datasource == "workTime") {
          //dztasource do te jete workTime
          for (var i = 0; i < this.worktime.length; i++) {
            this.datasource.push(this.worktime[i])
            this.label = "workTime";

          }
        }
        if (graph[j].datasource == "humidity") {
          //datasource do te jete humidity
          for (var i = 0; i < this.humidity.length; i++) {
            this.datasource.push(this.humidity[i])
            this.label = "humidity";
          }
        }
        if (graph[j].datasource == "tempForc") {
          //datasource do te jete tempForc
          for (var i = 0; i < this.tempForceing.length; i++) {
            this.datasource.push(this.tempForceing[i])
            this.label = "tempForc";
          }
        }
        //krijohet obbejti chart
        this.mychart = {
          _id: graph[j]._id,
          name: graph[j].name,
          description: graph[j].description,
          dash: graph[j].dashboard,
          type: graph[j].type,
          barChartLabels: this.labels,
          barChartData: [
            { data: this.datasource, label: this.label }
          ]
        };
        //shtohet tek ai dashboard te cilit i perket
         this.dashboardChart[dash1].push(this.mychart);

      }
    })
  }
  AddDash(){
   // therret servisin qe hap modalin per shtimin e dashboard
    this.getDataService.openDashboard(undefined).afterClosed().subscribe(res=>{
    //reload te dhenat
    this.GetDash()
    this.GetSensor();
    this.GetCharts();
     });
   
  }
  edit(dash) {
    this.getDataService.openDashboard(dash).afterClosed().subscribe(res=> {
      //reload te dhenat
      this.GetDash()
      this.GetSensor();
      this.GetCharts();
    }) ;
  }
  addChart(dash) { 
      this.getDataService.openGraph(dash).afterClosed().subscribe(res=>{
      //reload te dhenat
      this.GetDash()
      this.GetSensor();
      this.GetCharts();
    }) ;
  }
  drop(event){
    console.log("dragDrop")
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    // moveItemInArray(this.dashboardChart, event.previousIndex, event.currentIndex);
  }
  openPopup(graph){
    //hap te dhenat e chartit
    this.getDataService.openGraph(graph).afterClosed().subscribe(res =>{
      this.GetDash()
      this.GetSensor();
      this.GetCharts();
    }) ;
  }
  //nuk fshin
  deleteDash(dash){
    var msg = "Are u sure you want to delete" ;
    this.getDataService.openConfirmDialog(msg).afterClosed().subscribe(res => {
      //deshiron ta fshije
      if (res) {
            this.DialogServerService.deleteDashboard(dash).subscribe(res=>{
              this.GetDash()
              this.GetSensor();
              this.GetCharts();
            })
      }}
    )
  }
  //update datasource pabere reload nga db
  takeDataAgain() {
    //reload te dhenat nese eshte bere nje ndryshim ne faqe
    this.ReloadSer.componentMethodCalled$.subscribe(res => {
      console.log(res)
    if (res.type=='post') {
        //do behet push ne secilen nga datasource
        this.temperature.push(res.data.temperature) ;
        this.humidity.push(res.data.humidity) ;
        this.tempForceing.push(res.data.tempForc) ;
        this.worktime.push(res.workTime) ;
        this.sensors.push(res.id)
        this.labels.push(res.name)
    
     for(var i=0;i<this.dashboardChart.length; i++) {
       var element = this.dashboardChart[i] ;
       for (var j = 0; j <element.length;j++) {
         if (element[j].barChartData[0].label == "temperature") {
           element[j].barChartData[0].data = this.temperature
         }
         if (element[j].barChartData[0].label == 'humidity') {
           element[j].barChartData[0].data = this.humidity
         }
         if (element[j].barChartData[0].label == 'tempForc') {
           element[j].barChartData[0].data = this.tempForceing
         }
         if (element[j].barChartData[0].label == 'workTime') {
           element[j].barChartData[0].data = this.worktime
           
         }
       }       
     }}
      if (res.type == 'update') {
          //id e sensorit te modifikuar
        var indexMod=this.sensors.indexOf(res.id)
        this.labels[indexMod] = res.name ;
        for (var i = 0; i < this.dashboardChart.length; i++) {
          var element = this.dashboardChart[i];
          for (var j = 0; j < element.length; j++) {
            if (element[j].barChartData[0].label == "temperature") {
              element[j].barChartData[0].data[indexMod] = res.data.temperature;
              this.temperature[indexMod] = res.data.temperature ;
            }
            if (element[j].barChartData[0].label == 'humidity') {
              element[j].barChartData[0].data[indexMod] = res.data.humidity ;
              this.humidity[indexMod] = res.data.humidity ;
            }
            if (element[j].barChartData[0].label == 'tempForc') {
              element[j].barChartData[0].data[indexMod] = res.data.tempForc ;
              this.tempForceing[indexMod] = res.data.tempForc ;
            }
            if (element[j].barChartData[0].label == 'workTime') {
              element[j].barChartData[0].data[indexMod] = res.data.workTime ;
              this.worktime[indexMod] = res.data.workTime ;
            }
          }
        }   
      }
      if (res.type=='delete') {
        var indexMod = this.sensors.indexOf(res.id)
        //heqim sensorin qe u fshi
        this.labels.splice(indexMod,1) ;
        this.sensors.splice(indexMod,1)
        for (var i = 0; i < this.dashboardChart.length; i++) {
          var element = this.dashboardChart[i];
          for (var j = 0; j < element.length; j++) {
            element[j].barChartData[0].data.splice(indexMod, 1);
            if (element[j].barChartData[0].label == "temperature") {
           
              this.temperature.splice(indexMod,1)
            }
            if (element[j].barChartData[0].label == 'humidity') {
              this.humidity.splice(indexMod, 1)
            }
            if (element[j].barChartData[0].label == 'tempForc') {
              this.tempForceing.splice(indexMod, 1)
            }
            if (element[j].barChartData[0].label == 'workTime') {
              this.worktime.splice(indexMod, 1)
            }
          }
        }   
      }
    })
  }
  
}