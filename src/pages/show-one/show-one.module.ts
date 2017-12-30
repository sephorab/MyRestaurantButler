import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowOnePage } from './show-one';

@NgModule({
  declarations: [
    ShowOnePage,
  ],
  imports: [
    IonicPageModule.forChild(ShowOnePage),
  ],
})
export class ShowOnePageModule {}
