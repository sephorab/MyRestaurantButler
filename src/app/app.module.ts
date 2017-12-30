import { NgModule, ErrorHandler } from '@angular/core';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import {FormGroup, FormControl} from "@angular/forms";

import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ShowAllPage } from '../pages/show-all/show-all';
import { AddPage } from '../pages/add/add';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';

//pages hors tabs
import { SuccessAddPage } from '../pages/success-add/success-add';
import { EditPage } from '../pages/edit/edit';
import { ShowOnePage } from '../pages/show-one/show-one';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//SQLite
import { SQLite, SQLiteDatabaseConfig, SQLiteObject, SQLiteTransaction } from '@ionic-native/sqlite';

//Toast
import { Toast } from '@ionic-native/toast';

// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';


class SQLiteMock{


  public create(config : SQLiteDatabaseConfig) : Promise<SQLiteObject>{

    return new Promise((resolve,reject) => {
      resolve(new SQLiteObject(new Object()));
    });

  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShowAllPage,
    AddPage,
    AboutPage,
    TabsPage,
    SuccessAddPage,
    EditPage,
    ShowOnePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule, // Put ionic2-rating module here
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule,                        // <========== Add this line!
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShowAllPage,
    AddPage,
    AboutPage,
    TabsPage,
    SuccessAddPage,
    EditPage,
    ShowOnePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
