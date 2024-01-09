import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertInterface, AlertType } from '../interfaces/alert.interface';

@Injectable()
export class AlertServices {
  public alert$ = new Subject<AlertInterface>();

  show(text: string, type: AlertType): void {
    this.alert$.next({ type, text });
  }
}
