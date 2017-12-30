import { Component } from '@angular/core';
import { App, ViewController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { EditPage } from '../edit/edit';
import { ShowAllPage } from '../show-all/show-all';


/**
 * Generated class for the ShowOnePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-one',
  templateUrl: 'show-one.html',
})
export class ShowOnePage {



  public data = { rowid:0, name:"", location:"", star:5, price:1, type:"", review:"", is_favorite:0  };


  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    private sqlite: SQLite,
    private toast: Toast, public app:App) {

    this.navCtrl = navCtrl;
    this.toast = toast;
    this.app = app;
    this.getCurrentData(navParams.get("rowid"));//remplit le tableau data des valeurs de la review demandée


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowOnePage');
  }

  //appelé avant que la vue redevienne active (first on the stack)
  ionViewWillEnter(){
    this.getCurrentData(this.data.rowid);
  }


//remplit le tableau data des valeurs de la review demandée
  getCurrentData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {



      db.executeSql('SELECT * FROM restaurants WHERE rowid=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {

            this.data.rowid = res.rows.item(0).rowid;
            this.data.name = res.rows.item(0).name;
            this.data.location = res.rows.item(0).location;
            this.data.star = res.rows.item(0).star;
            this.data.price = res.rows.item(0).price;
            this.data.type = res.rows.item(0).type;
            this.data.review = res.rows.item(0).review;
            this.data.is_favorite = res.rows.item(0).is_favorite;

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


        /////////////////////////////////////////////






    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }


    //lance la editPage, on passe en argument l'id de la ligne dans la table
    editData(rowid) {
      this.navCtrl.push(EditPage, {
        rowid:rowid
      });
    }
    
    //supprime une review
    deleteData(rowid) {
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {


        db.executeSql('DELETE FROM restaurants WHERE rowid=?', [rowid])
        .then(res => {
          console.log(res);

          this.toast.show('Review supprimée avec succès', '5000', 'center').subscribe(
            toast => {
            }
          );

          this.navCtrl.popToRoot();
          
          //this.navCtrl.push(ShowAllPage);//revient à showAll
          //this.popView();
          //this.getData();
        })
        .catch(e => console.log(e));

    //////////////////








      }).catch(e => console.log(e));
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



popView(){
  this.app.getRootNav().pop()
}



//renvoie vrai si la review est favorite
isFavorite(rowid : number): boolean{
  
  if(this.data.is_favorite == 1)
    return true;

  return false;
    

}

//update le champs favoris dans la table favorites + update le tableau local aussi
addToFavorite(is_favorite: number){


  this.updateFavorite(is_favorite);
  this.data.is_favorite = is_favorite;//on update le tableau local aussi

}


//update le champs favoris dans la table favorites
updateFavorite(is_favorite: number) {
  this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {

    db.executeSql('UPDATE restaurants SET is_favorite=? WHERE rowid=?',
    [is_favorite,this.data.rowid])
      .then(res => {
        console.log(res);

        let message = "";
        if(is_favorite == 1)
          message = "Ajouté aux favoris !";
        else{
          message = "Retiré des favoris !";
        }

        this.toast.show(message, '5000', 'center').subscribe(
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



    

}
