import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogServerService } from '../dialog-server.service' ;
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  dashboardForm:FormGroup ;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DashBoardComponent>,
    private dialogService: DialogServerService
  ) {}

  ngOnInit() {
  //nese ka ardhur message atehere po kryhet editim
    if (this.data.message) {
      this.dashboardForm = new FormGroup({
        name: new FormControl(this.data.message.name, Validators.required),
        description: new FormControl(this.data.message.description, Validators.required)
      })
    }
      //ne inicializim te komponentit formohet formgrup me te dhenat e dash bosh
      //nuk ka ardhur message prandaj po kryhet shtim
    else {
    this.dashboardForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)})   
    }
  }
closeDialog(){
//mbyllet dialogu i hapur
this.dialogRef.close() ;
}
save(){
  if (this.dashboardForm.invalid) {}
  else {
    if (this.data.message) {
      const obj= {
        id: this.data.message.id,
        name: this.dashboardForm.value['name'],
        description: this.dashboardForm.value['description'],
      }
      this.dialogService.editDash(obj).subscribe(
          res => {
            this.closeDialog()
          })
    }
    else {
      //therritet servisi per te ruajtur te dhenat ne database per dashboardin
      this.dialogService.postDashboard(this.dashboardForm.value['name'],
        this.dashboardForm.value['description']).subscribe(res => {
          this.closeDialog()
        })
    }}
  }
}
