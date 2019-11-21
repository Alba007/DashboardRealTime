import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule} from '@angular/material' ;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' ;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { SensorsListComponent } from './sensors-list/sensors-list.component';
import { MatTableModule } from '@angular/material'; 
import { MatPaginatorModule } from '@angular/material';
import { SensorDetailsComponent } from './sensor-details/sensor-details.component';
import { DeleteComponent } from './delete/delete.component';
import { GraphComponent } from './graph/graph.component';
import { MatSelectModule } from '@angular/material/select';
import { ChartsModule } from 'ng2-charts';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { AngularResizedEventModule } from 'angular-resize-event';
import { ResizableModule } from 'angular-resizable-element'; 


@NgModule({ 
  declarations: [
    AppComponent,
    DashBoardComponent,
    SensorsListComponent,
    SensorDetailsComponent,
    DeleteComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule, 
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule ,
    ChartsModule,
    DragDropModule,
    AngularResizedEventModule,
    ResizableModule 
    
    
  ],
  providers: []
    
  ,
  bootstrap: [AppComponent],
  exports: [
    MatFormFieldModule,
    MatInputModule
   ],
  entryComponents: [DashBoardComponent, SensorDetailsComponent, DeleteComponent, GraphComponent]
})
export class AppModule { }
