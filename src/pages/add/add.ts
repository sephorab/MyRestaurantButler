import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite, SQLiteDatabaseConfig, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import {FormControl} from "@angular/forms";
// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating'; 
import { SuccessAddPage } from '../success-add/success-add';


@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})


export class AddPage {

  formGroupAdd : FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private formBuilder: FormBuilder, private toast:Toast ) {


    this.navCtrl = navCtrl;
    this.formGroupAdd = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      star: ['5', Validators.required],
      price: ['3', Validators.required],
      type: ['africaine', Validators.required],
      review: ['', Validators.required],
      //file: ['', Validators.required]


    });




  }




  
  addRestaurantForm(value: any): void{
    console.log(this.formGroupAdd.value);


    if(this.formGroupAdd.valid) {

      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {

        db.executeSql('INSERT INTO restaurants VALUES(NULL,?,?,?,?,?,?,?)',[value.name.trim(),value.location.trim(),value.star,value.price, value.type, value.review.trim(), 0])
          .then(res => {


            console.log(res);

            this.navCtrl.popToRoot();

            this.toast.show('Data saved', '5000', 'center').subscribe(
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

          //////////////////




      }).catch(e => {
        console.log(e);
        this.toast.show(e, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });


    

  }

  }




  isValid(fieldName : string): boolean{
    
        if(fieldName === "name" || fieldName === "location" || fieldName === "review"){
    
    
          switch(fieldName){
            
            case "name":
              if(this.formGroupAdd.value.name.trim()<= 0)
                return false;//le champs est vide
              else
                return true;
              
            case "location":
            if(this.formGroupAdd.value.location.trim()<= 0)
              return false;//le champs est vide
            else
              return true;
    
            case "review":
            if(this.formGroupAdd.value.review.trim() <= 0)
              return false;//le champs est vide
            else
              return true;
    
    
    
          }
    
        }
    
    
        return false;//par défaut
    
      }
    


    
    




 ngOnInit(){


 }

  

}
