import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../shared/components/loading/loading.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, RouterModule],
})
export class MainModule {}
