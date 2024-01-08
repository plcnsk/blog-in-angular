import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertInterface } from '../interfaces/alert.interface';

@Injectable()
export class AlertServices {
  public alert$ = new Subject<AlertInterface>();

  success(text: string) {
    this.alert$.next({ type: 'success', text });
  }

  warning(text: string) {
    this.alert$.next({ type: 'warning', text });
  }

  danger(text: string) {
    this.alert$.next({ type: 'danger', text });
  }
}
