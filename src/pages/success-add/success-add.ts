import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Toast } from '@ionic-native/toast';
//sqlite
import { SQLite, SQLiteDatabaseConfig, SQLiteObject } from '@ionic-native/sqlite';

//pages qu'on va utiliser
import { AddPage } from '../add/add';
import { EditPage } from '../edit/edit';
import { ShowOnePage } from '../show-one/show-one';

import { App, ViewController } from 'ionic-angular';
/**
 * Generated class for the SuccessAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-success-add',
  templateUrl: 'success-add.html',
})
export class SuccessAddPage {

  restaurants: any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, public app:App, private toast: Toast) {
    
        this.navCtrl = navCtrl;
        this.app = app;
        this.toast = toast;
      
    
  }
    


  ionViewDidLoad() {
    this.getData();
    console.log('ionViewDidLoad Favoris');

  }
  
  ionViewWillEnter() {
    this.getData();
  }
  
  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {



      //CREATION de la table restaurants
      db.executeSql('CREATE TABLE IF NOT EXISTS restaurants(rowid INTEGER PRIMARY KEY, name TEXT, location TEXT, star INT, price INT, type TEXT, review TEXT, is_favorite INT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));


      //RECUPERE tous les restaurants FAVORIS dans l'ordre décroissant des id
      db.executeSql('SELECT * FROM restaurants WHERE is_favorite = 1 ORDER BY rowid DESC', {})
      .then(res => {
        this.restaurants = [];

        //pour chaque review
        for(var i=0; i<res.rows.length; i++) {

          this.restaurants.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name, location:res.rows.item(i).location, star:res.rows.item(i).star, price:res.rows.item(i).price, type:res.rows.item(i).type,   review:res.rows.item(i).review, is_favorite:res.rows.item(i).is_favorite})
        }
      })
      .catch(e => console.log(e));







    }).catch(e => console.log(e));

    
  }
  
  
  //lance la editPage, on passe en argument l'id de la ligne dans la table
  editData(rowid) {
    this.navCtrl.push(EditPage, {
      rowid:rowid
    });
  }


  //supprime all reviews
  deleteDataAll() {
    
        //supprime la review
        this.sqlite.create({
          name: 'ionicdb.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
    
    
    
    
    
          db.executeSql('DELETE FROM restaurants', [])
          .then(res => {
            console.log(res);
            //this.getData();
          })
          .catch(e => console.log(e));
    
          ////////////////////////
  
          //drop de la table favorites
          db.executeSql('DROP TABLE IF EXISTS user', {})
          .then(res => console.log('Executed SQL'))
          .catch(e => console.log(e));


          //drop de la table restaurants
          db.executeSql('DROP TABLE IF EXISTS restaurants', {})
          .then(res => console.log('Executed SQL'))
          .catch(e => console.log(e));

    
    
    
        }).catch(e => console.log(e));
    
    
    
      }


  
  //supprime une review
  deleteData(rowid) {

    //supprime la review
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {





      db.executeSql('DELETE FROM restaurants WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));

      ////////////////////////



    }).catch(e => console.log(e));



  }


  //lance la page show one en passant le rowid en argument
  showOneData(rowid){
    this.navCtrl.push(ShowOnePage, {
      rowid:rowid
    });


  }


  getStringRatingFromInt(rating : number):string{
      switch(rating)
      {
          case 1:
          return "Nul !";

          case 2:
          return "Peut mieux faire !";

          case 3:
          return "Pas mal !";

          case 4:
          return "Bon !";

          case 5:
          return "Excellent !";

          default:
          return "Erreur rating to string";

        
      }
    }

  getStringPriceFromInt(price : number):string{
      switch(price)
      {
          case 1:
          return "Pas cher";

          case 2:
          return "Moyen";

          case 3:
          return "Cher";


          default:
          return "Erreur price to string";
        
      }

        
  }


  //renvoie faux si le tableau de reviews est vide
  hasReviews():boolean{
    if(this.restaurants.length >0)
      return true;
    else 
      return false;
        
  }

  isFavorite(rowid : number): boolean{

    let i = 0;
    for(i = 0 ; i< this.restaurants.length; i++){
        if(this.restaurants[i].rowid == rowid){ //on a trouvé le bon restaurant, 
          if(this.restaurants[i].is_favorite == 1){ //c'est un favori
            //c'est un favori
            return true;
          }
          //on a trouvé le bon restaurant, on garde l'index comme les listes restaurants et favoris st identiques
        }

    }
    return false;


  }
    
  

  backToHome(){

   // this.navCtrl.setRoot(HomePage);
    //this.navCtrl.popToRoot();  
   this.navCtrl.push(HomePage);
  }

}
