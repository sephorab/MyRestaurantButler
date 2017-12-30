import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { App, ViewController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import {FormControl} from "@angular/forms";

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {



  public data = { rowid:0, name:"", location:"", star:5, price:1, type:"", review:""  };

  formGroupEdit : FormGroup;
  rowid = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private formBuilder: FormBuilder, 
    private sqlite: SQLite,
    private toast: Toast, public app:App) {

    this.navCtrl = navCtrl;
    this.toast = toast;
    this.app = app;
    

      //met à jour avec les données courantes de la bdd
      this.rowid = navParams.get("rowid");
      this.getCurrentData(navParams.get("rowid"));

   /* 
      this.formGroupEdit = this.formBuilder.group({
        name: [this.data.name, Validators.required],
        location: [this.data.location, Validators.required],
        star: [this.data.star, Validators.required],
        price: [this.data.price, Validators.required],
        type: [this.data.type, Validators.required],
        review: [this.data.review, Validators.required]
      });*/
   


  }



  getCurrentData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {



      db.executeSql('SELECT * FROM restaurants WHERE rowid=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {



            
            //this.data.push({rowid:res.rows.item(0).rowid,name:res.rows.item(0).name, location:res.rows.item(0).location, star:res.rows.item(0).star, price:res.rows.item(0).price, type:res.rows.item(0).type,   review:res.rows.item(0).review})
            

            this.data.rowid = res.rows.item(0).rowid;
            this.data.name = res.rows.item(0).name;
            this.data.location = res.rows.item(0).location;
            this.data.star = res.rows.item(0).star;
            this.data.price = res.rows.item(0).price;
            this.data.type = res.rows.item(0).type;
            this.data.review = res.rows.item(0).review;

            
            

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

  updateData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('UPDATE restaurants SET name=?,location=?,star=?,price=?,type=?,review=?  WHERE rowid=?',
      [this.data.name,this.data.location,this.data.star,this.data.price,this.data.type,this.data.review,this.rowid])
        .then(res => {
          console.log(res);
          this.navCtrl.pop();//on retire la view une fois l'update fait
          //this.navCtrl.popToRoot();

          //this.popView();
          this.toast.show('Review modifiée avec succès', '5000', 'center').subscribe(
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
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }




  popView(){
    this.app.getRootNav().pop()
  }

  isValid(fieldName : string): boolean{

    if(fieldName === "name" || fieldName === "location" || fieldName === "review"){


      switch(fieldName){
        
        case "name":
          if(this.data.name.trim().length <= 0)
            return false;//le champs est vide
          else
            return true;
          
        case "location":
        if(this.data.location.trim().length <= 0)
          return false;//le champs est vide
        else
          return true;

        case "review":
        if(this.data.review.trim().length <= 0)
          return false;//le champs est vide
        else
          return true;



      }

    }


    return false;//par défaut

  }



}
