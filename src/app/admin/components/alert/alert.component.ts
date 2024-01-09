import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertServices } from './services/alert.services';
import { delay, Subscription } from 'rxjs';
import { AlertType } from './interfaces/alert.interface';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000;

  public text = '';
  public type: AlertType = 'success';

  alertSubscription!: Subscription;

  constructor(private alertService: AlertServices) {}

  ngOnInit() {
    this.alertSubscription = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type as AlertType;

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay);
    });
  }

  ngOnDestroy() {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }
}
