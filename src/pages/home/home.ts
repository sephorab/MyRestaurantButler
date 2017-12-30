import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';  


import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Toast } from '@ionic-native/toast';


@Component({
  templateUrl: 'home.html'
})
export class HomePage {


  public name = "";
  public has_name = false;


  constructor(
    public platform: Platform,
    private sqlite: SQLite,
    private toast: Toast,
    public actionsheetCtrl: ActionSheetController
  ) {

        this.getCurrentData();


   }


   ionViewWillEnter() {
    this.getCurrentData();
  }
  


  getCurrentData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {




      //CREATION de la table restaurants
      db.executeSql('CREATE TABLE IF NOT EXISTS restaurants(rowid INTEGER PRIMARY KEY, name TEXT, location TEXT, star INT, price INT, type TEXT, review TEXT, is_favorite INT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));




      //CREATION de la table user
      db.executeSql('CREATE TABLE IF NOT EXISTS user(rowid INTEGER PRIMARY KEY, name TEXT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));



      
      db.executeSql('SELECT * FROM user', [])
        .then(res => {
          if(res.rows.length > 0) {
           
            this.name = res.rows.item(0).name;
            this.has_name = true;
          }
          else{
            //on n'a pas encore entré de nom
            this.has_name = false;
            this.name = "utilisateur";


          }
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }




  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}