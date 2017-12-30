import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { App, ViewController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import {FormControl} from "@angular/forms";

// Import ionic2-rating module



//code behind

@Component({
  //où est défini selector ?
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public name = "";
  public has_name = false;
  //rowid: number;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast, public app:App) {


      this.navCtrl = navCtrl;
      this.toast = toast;
      this.app = app;

       //met à jour avec les données courantes de la bdd
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



      db.executeSql('SELECT * FROM user', [])
        .then(res => {
          if(res.rows.length > 0) {
           
            this.name = res.rows.item(0).name;
            this.has_name = true;
          }
          else{
            //on n'a pas encore entré de nom
            this.has_name = false;


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



//appelé au submit
  updateData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      if(this.name.length<=0){

              this.toast.show('Veuillez entrer un prénom.', '5000', 'center').subscribe(
                toast => {
                }
              );
    

      }

      // UPDATE
      else if(this.has_name){

          db.executeSql('UPDATE user SET name=?',
          [this.name.trim()])
            .then(res => {
              console.log(res);
              this.navCtrl.pop();//on retire la view une fois l'update fait
              //this.navCtrl.popToRoot();
    
              //this.popView();
              this.toast.show('Merci ! Désormais, je vous appellerai '+this.name.trim()+".", '5000', 'center').subscribe(
                toast => {
                }
              );
    
    
            })
            .catch(e => {
              console.log(e);
              this.toast.show(e, '5000', 'center').subscribe(
                toast => {
                  console.log(toast);
                }
              );
            });
    


          
        }

        //nouveau nom (premier nom)
        else{


            db.executeSql('INSERT INTO user VALUES(NULL,?)',[this.name.trim()])
            .then(res => {


              console.log(res);


              this.toast.show('Merci ! Désormais, je vous appellerai '+this.name.trim()+".", '5000', 'center').subscribe(
                toast => {
                  //this.navCtrl.popToRoot();
                }
              );
            })
            .catch(e => {
              console.log(e);
              this.toast.show(e, '5000', 'center').subscribe(
                toast => {
                  console.log(toast);
                }
              );
            });




        }





///////////////
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });




  }

  public isValid(): boolean{



        if(this.name.trim().length <= 0)
          return false;//le champs est vide
        else{
          return true;
        }



  }



























}
