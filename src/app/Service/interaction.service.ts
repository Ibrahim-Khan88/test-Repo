import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _headingTitleSource = new Subject<string>();
  headingTitle$ = this._headingTitleSource.asObservable();

  constructor() { }

  sendHeadingTitle(Id){
    this._headingTitleSource.next(Id);
  }
}
