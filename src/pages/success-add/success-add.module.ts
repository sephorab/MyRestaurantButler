import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuccessAddPage } from './success-add';

@NgModule({
  declarations: [
    SuccessAddPage,
  ],
  imports: [
    IonicPageModule.forChild(SuccessAddPage),
  ],
})
export class SuccessAddPageModule {}
