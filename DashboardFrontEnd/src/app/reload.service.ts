import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {
  public componentMethodCalled$ = new Subject<any>();

  constructor( ) { 
  }
  // Observable string streams
  // Service message commands
  callComponentMethod(object) {
    console.log("test")
    this.componentMethodCalled$.next(object);
  }
}
