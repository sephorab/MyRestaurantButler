webpackJsonp([3],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowAllPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_toast__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__add_add__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__edit_edit__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__show_one_show_one__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//sqlite

//pages qu'on va utiliser




/**
 * Generated class for the ShowAllPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ShowAllPage = (function () {
    function ShowAllPage(navCtrl, navParams, sqlite, app, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.app = app;
        this.toast = toast;
        this.restaurants = [];
        this.name = "";
        this.location = "";
        this.star = 1;
        this.price = 1;
        this.type = "";
        this.review = "";
        this.navCtrl = navCtrl;
        this.app = app;
        this.toast = toast;
    }
    ShowAllPage.prototype.ionViewDidLoad = function () {
        this.getData();
        console.log('ionViewDidLoad ShowAllPage');
    };
    ShowAllPage.prototype.ionViewWillEnter = function () {
        this.getData();
    };
    ShowAllPage.prototype.getData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            /*
                  //drop de la table favorites
                  db.executeSql('DROP TABLE IF EXISTS favorites', {})
                  .then(res => console.log('Executed SQL'))
                  .catch(e => console.log(e));
            
            
                  //drop de la table restaurants
                  db.executeSql('DROP TABLE IF EXISTS restaurants', {})
                  .then(res => console.log('Executed SQL'))
                  .catch(e => console.log(e));
            
            */
            //CREATION de la table restaurants
            db.executeSql('CREATE TABLE IF NOT EXISTS restaurants(rowid INTEGER PRIMARY KEY, name TEXT, location TEXT, star INT, price INT, type TEXT, review TEXT, is_favorite INT)', {})
                .then(function (res) { return console.log('Executed SQL'); })
                .catch(function (e) { return console.log(e); });
            //RECUPERE tous les restaurants dans l'ordre décroissant des id
            db.executeSql('SELECT * FROM restaurants ORDER BY rowid DESC', {})
                .then(function (res) {
                _this.restaurants = [];
                //pour chaque review
                for (var i = 0; i < res.rows.length; i++) {
                    _this.restaurants.push({ rowid: res.rows.item(i).rowid, name: res.rows.item(i).name, location: res.rows.item(i).location, star: res.rows.item(i).star, price: res.rows.item(i).price, type: res.rows.item(i).type, review: res.rows.item(i).review, is_favorite: res.rows.item(i).is_favorite });
                }
            })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    //lance la  AddPage
    ShowAllPage.prototype.addData = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__add_add__["a" /* AddPage */]);
    };
    //lance la editPage, on passe en argument l'id de la ligne dans la table
    ShowAllPage.prototype.editData = function (rowid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__edit_edit__["a" /* EditPage */], {
            rowid: rowid
        });
    };
    //supprime all review
    ShowAllPage.prototype.deleteDataAll = function () {
        var _this = this;
        //supprime la review
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('DELETE FROM restaurants', [])
                .then(function (res) {
                console.log(res);
                //this.getData();
            })
                .catch(function (e) { return console.log(e); });
            ////////////////////////
            //drop de la table favorites
            db.executeSql('DROP TABLE IF EXISTS user', {})
                .then(function (res) { return console.log('Executed SQL'); })
                .catch(function (e) { return console.log(e); });
            //drop de la table restaurants
            db.executeSql('DROP TABLE IF EXISTS restaurants', {})
                .then(function (res) {
                ;
                _this.getData();
            })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    //supprime une review
    ShowAllPage.prototype.deleteData = function (rowid) {
        var _this = this;
        //supprime la review
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('DELETE FROM restaurants WHERE rowid=?', [rowid])
                .then(function (res) {
                console.log(res);
                _this.getData();
            })
                .catch(function (e) { return console.log(e); });
            ////////////////////////
        }).catch(function (e) { return console.log(e); });
    };
    //lance la page show one en passant le rowid en argument
    ShowAllPage.prototype.showOneData = function (rowid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__show_one_show_one__["a" /* ShowOnePage */], {
            rowid: rowid
        });
    };
    ShowAllPage.prototype.getStringRatingFromInt = function (rating) {
        switch (rating) {
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
    };
    ShowAllPage.prototype.getStringPriceFromInt = function (price) {
        switch (price) {
            case 1:
                return "Pas cher";
            case 2:
                return "Moyen";
            case 3:
                return "Cher";
            default:
                return "Erreur price to string";
        }
    };
    //renvoie faux si le tableau de reviews est vide
    ShowAllPage.prototype.hasReviews = function () {
        if (this.restaurants.length > 0)
            return true;
        else
            return false;
    };
    ShowAllPage.prototype.isFavorite = function (rowid) {
        var i = 0;
        for (i = 0; i < this.restaurants.length; i++) {
            if (this.restaurants[i].rowid == rowid) {
                if (this.restaurants[i].is_favorite == 1) {
                    //c'est un favori
                    return true;
                }
                //on a trouvé le bon restaurant, on garde l'index comme les listes restaurants et favoris st identiques
            }
        }
        return false;
    };
    return ShowAllPage;
}());
ShowAllPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-show-all',template:/*ion-inline-start:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\show-all\show-all.html"*/'<!--\n  Generated template for the ShowAllPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  \n    <ion-navbar>\n      <ion-title>Voir tout</ion-title>\n  \n      <ion-buttons end>\n          <button ion-button icon-only (click)="addData()">\n            <ion-icon name="add-circle"></ion-icon>\n          </button>\n      </ion-buttons>\n  \n    </ion-navbar>\n  \n  </ion-header>\n  \n  <ion-content padding>\n      <h2>Toutes vos reviews</h2>\n  \n      <p>Glissez votre doigt vers la gauche en touchant un item, je le modifierai ou le supprimerai. </p>\n      <p>Cliquez sur un item, j\'afficherai ses détails.</p>\n  \n      <ion-item *ngIf="!hasReviews()">\n          <p>Vous n\'avez encore crée aucune review.</p>\n      </ion-item>\n  \n      <ion-list>\n        <ion-item-sliding *ngFor="let restaurant of restaurants; let i=index" >\n          <ion-item nopadding (click) = "showOneData(restaurant.rowid)">\n\n\n            <ion-icon float-end *ngIf=isFavorite(restaurant.rowid) name="heart"></ion-icon>\n            <ion-icon float-end *ngIf=!isFavorite(restaurant.rowid) name="heart-outline"></ion-icon>\n            <p>\n              <span>Nom : {{restaurant.name}}</span><br>\n              Adresse : {{restaurant.location}}<br>\n              Note : {{getStringRatingFromInt(restaurant.star)}}<br>\n              Prix : {{getStringPriceFromInt(restaurant.price)}}<br>\n              Type : {{restaurant.type}}<br>\n              \n            </p>\n            <h3>\n                Avis : {{restaurant.review}}\n            </h3>\n  \n  \n          </ion-item>\n          <ion-item-options side="right">\n            <button ion-button color="primary" (click)="editData(restaurant.rowid)">\n              <ion-icon name="paper"></ion-icon>\n            </button>\n            <button ion-button color="danger" (click)="deleteData(restaurant.rowid)">\n              <ion-icon name="trash"></ion-icon>\n            </button>\n          </ion-item-options>\n        </ion-item-sliding>\n      </ion-list>\n\n\n      Tout effacer\n      <button ion-button color="danger" (click)="deleteDataAll()">\n        <ion-icon name="trash"></ion-icon>\n      </button>\n    </ion-content>'/*ion-inline-end:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\show-all\show-all.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_toast__["a" /* Toast */]])
], ShowAllPage);

//# sourceMappingURL=show-all.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuccessAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__edit_edit__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__show_one_show_one__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//sqlite




/**
 * Generated class for the SuccessAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SuccessAddPage = (function () {
    function SuccessAddPage(navCtrl, navParams, sqlite, app, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.app = app;
        this.toast = toast;
        this.restaurants = [];
        this.navCtrl = navCtrl;
        this.app = app;
        this.toast = toast;
    }
    SuccessAddPage.prototype.ionViewDidLoad = function () {
        this.getData();
        console.log('ionViewDidLoad Favoris');
    };
    SuccessAddPage.prototype.ionViewWillEnter = function () {
        this.getData();
    };
    SuccessAddPage.prototype.getData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            //CREATION de la table restaurants
            db.executeSql('CREATE TABLE IF NOT EXISTS restaurants(rowid INTEGER PRIMARY KEY, name TEXT, location TEXT, star INT, price INT, type TEXT, review TEXT, is_favorite INT)', {})
                .then(function (res) { return console.log('Executed SQL'); })
                .catch(function (e) { return console.log(e); });
            //RECUPERE tous les restaurants FAVORIS dans l'ordre décroissant des id
            db.executeSql('SELECT * FROM restaurants WHERE is_favorite = 1 ORDER BY rowid DESC', {})
                .then(function (res) {
                _this.restaurants = [];
                //pour chaque review
                for (var i = 0; i < res.rows.length; i++) {
                    _this.restaurants.push({ rowid: res.rows.item(i).rowid, name: res.rows.item(i).name, location: res.rows.item(i).location, star: res.rows.item(i).star, price: res.rows.item(i).price, type: res.rows.item(i).type, review: res.rows.item(i).review, is_favorite: res.rows.item(i).is_favorite });
                }
            })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    //lance la editPage, on passe en argument l'id de la ligne dans la table
    SuccessAddPage.prototype.editData = function (rowid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__edit_edit__["a" /* EditPage */], {
            rowid: rowid
        });
    };
    //supprime all reviews
    SuccessAddPage.prototype.deleteDataAll = function () {
        //supprime la review
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('DELETE FROM restaurants', [])
                .then(function (res) {
                console.log(res);
                //this.getData();
            })
                .catch(function (e) { return console.log(e); });
            ////////////////////////
            //drop de la table favorites
            db.executeSql('DROP TABLE IF EXISTS user', {})
                .then(function (res) { return console.log('Executed SQL'); })
                .catch(function (e) { return console.log(e); });
            //drop de la table restaurants
            db.executeSql('DROP TABLE IF EXISTS restaurants', {})
                .then(function (res) { return console.log('Executed SQL'); })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    //supprime une review
    SuccessAddPage.prototype.deleteData = function (rowid) {
        var _this = this;
        //supprime la review
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('DELETE FROM restaurants WHERE rowid=?', [rowid])
                .then(function (res) {
                console.log(res);
                _this.getData();
            })
                .catch(function (e) { return console.log(e); });
            ////////////////////////
        }).catch(function (e) { return console.log(e); });
    };
    //lance la page show one en passant le rowid en argument
    SuccessAddPage.prototype.showOneData = function (rowid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__show_one_show_one__["a" /* ShowOnePage */], {
            rowid: rowid
        });
    };
    SuccessAddPage.prototype.getStringRatingFromInt = function (rating) {
        switch (rating) {
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
    };
    SuccessAddPage.prototype.getStringPriceFromInt = function (price) {
        switch (price) {
            case 1:
                return "Pas cher";
            case 2:
                return "Moyen";
            case 3:
                return "Cher";
            default:
                return "Erreur price to string";
        }
    };
    //renvoie faux si le tableau de reviews est vide
    SuccessAddPage.prototype.hasReviews = function () {
        if (this.restaurants.length > 0)
            return true;
        else
            return false;
    };
    SuccessAddPage.prototype.isFavorite = function (rowid) {
        var i = 0;
        for (i = 0; i < this.restaurants.length; i++) {
            if (this.restaurants[i].rowid == rowid) {
                if (this.restaurants[i].is_favorite == 1) {
                    //c'est un favori
                    return true;
                }
                //on a trouvé le bon restaurant, on garde l'index comme les listes restaurants et favoris st identiques
            }
        }
        return false;
    };
    SuccessAddPage.prototype.backToHome = function () {
        // this.navCtrl.setRoot(HomePage);
        //this.navCtrl.popToRoot();  
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    return SuccessAddPage;
}());
SuccessAddPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-success-add',template:/*ion-inline-start:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\success-add\success-add.html"*/'<!--\n  Generated template for the ShowAllPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    \n      <ion-navbar>\n        <ion-title>Favoris</ion-title>\n  \n    \n      </ion-navbar>\n    \n    </ion-header>\n    \n    <ion-content padding>\n        <h2>Tous vos favoris</h2>\n    \n        <p>Glissez votre doigt vers la gauche en touchant un favori, je le modifierai ou le supprimerai. </p>\n        <p>Cliquez sur un favori, j\'afficherai ses détails.</p>\n    \n        <ion-item *ngIf="!hasReviews()">\n            <p>Vous n\'avez encore aucun favori.</p>\n        </ion-item>\n    \n        <ion-list>\n          <ion-item-sliding *ngFor="let restaurant of restaurants; let i=index" >\n            <ion-item nopadding (click) = "showOneData(restaurant.rowid)">\n\n\n              <ion-icon float-end *ngIf=isFavorite(restaurant.rowid) name="heart"></ion-icon>\n              <ion-icon float-end *ngIf=!isFavorite(restaurant.rowid) name="heart-outline"></ion-icon>\n              <p>\n                <span>Nom : {{restaurant.name}}</span><br>\n                Adresse : {{restaurant.location}}<br>\n                Note : {{getStringRatingFromInt(restaurant.star)}}<br>\n                Prix : {{getStringPriceFromInt(restaurant.price)}}<br>\n                Type : {{restaurant.type}}<br>\n              </p>\n              <h3>\n                  Avis : {{restaurant.review}}\n              </h3>\n    \n    \n            </ion-item>\n            <ion-item-options side="right">\n              <button ion-button color="primary" (click)="editData(restaurant.rowid)">\n                <ion-icon name="paper"></ion-icon>\n              </button>\n              <button ion-button color="danger" (click)="deleteData(restaurant.rowid)">\n                <ion-icon name="trash"></ion-icon>\n              </button>\n            </ion-item-options>\n          </ion-item-sliding>\n        </ion-list>\n  \n\n      </ion-content>'/*ion-inline-end:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\success-add\success-add.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */]])
], SuccessAddPage);

//# sourceMappingURL=success-add.js.map

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 115;

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/show-all/show-all.module": [
		274,
		2
	],
	"../pages/show-one/show-one.module": [
		275,
		1
	],
	"../pages/success-add/success-add.module": [
		276,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 156;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddPage = (function () {
    function AddPage(navCtrl, navParams, sqlite, formBuilder, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.formBuilder = formBuilder;
        this.toast = toast;
        this.navCtrl = navCtrl;
        this.formGroupAdd = this.formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            location: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            star: ['5', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            price: ['3', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            type: ['africaine', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            review: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
        });
    }
    AddPage.prototype.addRestaurantForm = function (value) {
        var _this = this;
        console.log(this.formGroupAdd.value);
        if (this.formGroupAdd.valid) {
            this.sqlite.create({
                name: 'ionicdb.db',
                location: 'default'
            }).then(function (db) {
                db.executeSql('INSERT INTO restaurants VALUES(NULL,?,?,?,?,?,?,?)', [value.name.trim(), value.location.trim(), value.star, value.price, value.type, value.review.trim(), 0])
                    .then(function (res) {
                    console.log(res);
                    _this.navCtrl.popToRoot();
                    _this.toast.show('Votre review a été sauvegardé avec succès.', '5000', 'center').subscribe(function (toast) {
                    });
                })
                    .catch(function (e) {
                    console.log(e);
                    _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                        console.log(toast);
                    });
                });
                //////////////////
            }).catch(function (e) {
                console.log(e);
                _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                    console.log(toast);
                });
            });
        }
    };
    AddPage.prototype.isValid = function (fieldName) {
        if (fieldName === "name" || fieldName === "location" || fieldName === "review") {
            switch (fieldName) {
                case "name":
                    if (this.formGroupAdd.value.name.trim() <= 0)
                        return false; //le champs est vide
                    else
                        return true;
                case "location":
                    if (this.formGroupAdd.value.location.trim() <= 0)
                        return false; //le champs est vide
                    else
                        return true;
                case "review":
                    if (this.formGroupAdd.value.review.trim() <= 0)
                        return false; //le champs est vide
                    else
                        return true;
            }
        }
        return false; //par défaut
    };
    AddPage.prototype.ngOnInit = function () {
    };
    return AddPage;
}());
AddPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add',template:/*ion-inline-start:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\add\add.html"*/'<ion-header>\n  \n<ion-navbar>\n  <ion-title>\n    Ajouter un restaurant\n  </ion-title>\n</ion-navbar>\n\n\n</ion-header>\n\n<ion-content class="round_box bg-picture"> \n\n      <form *ngIf="formGroupAdd" [formGroup]="formGroupAdd" (ngSubmit)="addRestaurantForm(formGroupAdd.value)"  >\n\n\n          <!-- nom -->\n          <ion-item>\n            <ion-label>Nom du restaurant</ion-label>\n            <ion-input type="text" formControlName="name" ></ion-input>\n          </ion-item>\n          <ion-item *ngIf=" (!isValid(\'name\') ||  formGroupAdd.controls.name.hasError(\'required\') ) && formGroupAdd.controls.name.touched">\n            <p>Désolé, le champ Nom est obligatoire !</p>\n          </ion-item>\n\n          <!-- localisation -->\n          <ion-item>\n              <ion-label for="adresse">Adresse</ion-label>\n              <ion-input type="text" formControlName="location"></ion-input>\n          </ion-item>\n\n          <ion-item *ngIf="  (!isValid(\'location\') ||  formGroupAdd.controls.location.hasError(\'required\')) && formGroupAdd.controls.location.touched">\n              <p>Désolé, le champ Adresse est obligatoire !</p>\n            </ion-item>\n\n\n          <!-- note ++ -->\n          <ion-item>\n\n              <ion-label >Note</ion-label>\n\n                <ion-select formControlName="star">\n                    <ion-option name="star" id="star-5" class="star star-5" value="5">Excellent !</ion-option>\n                    <ion-option name="star" id="star-4" class="star star-4" value="4">Bon !</ion-option>\n                    <ion-option name="star" id="star-3" class="star star-3" value="3">Pas mal !</ion-option>\n                    <ion-option name="star" id="star-2" class="star star-2" value="2">Peut mieux faire !</ion-option>\n                    <ion-option name="star" id="star-1" class="star star-1" value="1">Nul !</ion-option>\n                </ion-select>\n\n          </ion-item>\n\n\n\n\n          <!-- type ++ -->\n          <ion-item>\n              <ion-label for="type">Type de cuisine</ion-label>\n              <ion-select formControlName="type">\n                  <ion-option name="type" value="africaine">Africaine</ion-option>\n                  <ion-option name="type" value="amérique-du-nord">Amérique du Nord</ion-option>\n                  <ion-option name="type" value="amérique-du-sud">Amérique du Sud</ion-option>\n                  <ion-option name="type" value="chinoise">Chinoise</ion-option>\n                  <ion-option name="type" value="espagnole">Espagnole</ion-option>\n                  <ion-option name="type" value="europe-du-nord">Europe du Nord</ion-option>\n                  <ion-option name="type" value="europe-de-l-est">Europe de l\'Est</ion-option>\n                  <ion-option name="type" value="française">Française</ion-option>\n                  <ion-option name="type" value="fruits-de-mer">Fruits de mer</ion-option>\n                  <ion-option name="type" value="gastronomique">Gastronomique</ion-option>\n                  <ion-option name="type" value="indienne">Indienne</ion-option>\n                  <ion-option name="type" value="italienne">Italienne</ion-option>\n                  <ion-option name="type" value="japonnaise">Japonnaise</ion-option>\n                  <ion-option name="type" value="orientale">Orientale</ion-option>\n              </ion-select>\n          </ion-item>\n      \n      \n          \n          <!-- prix ++ -->\n\n          <ion-item>\n            \n            <ion-label >Prix</ion-label>\n            \n            <ion-select formControlName="price">\n                <ion-option name="price" id="price-3" class="price price-3" value="3">Cher</ion-option>\n                <ion-option name="price" id="price-2" class="price price-2" value="2">Moyen</ion-option>\n                <ion-option name="price" id="price-1" class="price price-1" value="1">Pas cher</ion-option>\n            </ion-select>\n            \n          </ion-item>\n\n          <!-- avis -->\n          <ion-item>\n            <ion-label for="review">Avis</ion-label>\n            <ion-textarea formControlName="review" name="review" ></ion-textarea>\n          </ion-item>\n        \n          <ion-item *ngIf=" (!isValid(\'review\') ||  formGroupAdd.controls.review.hasError(\'required\')) && formGroupAdd.controls.review.touched">\n            <p>Désolé, le champ Avis est obligatoire !</p>\n          </ion-item>\n\n          <button ion-button  type="submit" [disabled]="!formGroupAdd.valid || !isValid(\'name\') || !isValid(\'location\') || !isValid(\'review\')"  class="btn btn-lg btn-success form-button" block >Ajouter la review</button> \n      </form>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\add\add.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */]])
], AddPage);

//# sourceMappingURL=add.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__show_all_show_all__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__about_about__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__success_add_success_add__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




 //favoris
var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__show_all_show_all__["a" /* ShowAllPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__success_add_success_add__["a" /* SuccessAddPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_3__about_about__["a" /* AboutPage */];
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\tabs\tabs.html"*/'<ion-tabs class="ion-tabs">\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Voir tout" tabIcon="pizza"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Favoris" tabIcon="heart"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// Import ionic2-rating module
//code behind
var AboutPage = (function () {
    //rowid: number;
    function AboutPage(navCtrl, navParams, sqlite, toast, app) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.toast = toast;
        this.app = app;
        this.name = "";
        this.has_name = false;
        this.navCtrl = navCtrl;
        this.toast = toast;
        this.app = app;
        //met à jour avec les données courantes de la bdd
        this.getCurrentData();
    }
    AboutPage.prototype.ionViewWillEnter = function () {
        this.getCurrentData();
    };
    AboutPage.prototype.getCurrentData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM user', [])
                .then(function (res) {
                if (res.rows.length > 0) {
                    _this.name = res.rows.item(0).name;
                    _this.has_name = true;
                }
                else {
                    //on n'a pas encore entré de nom
                    _this.has_name = false;
                }
            })
                .catch(function (e) {
                console.log(e);
                _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                    console.log(toast);
                });
            });
        }).catch(function (e) {
            console.log(e);
            _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                console.log(toast);
            });
        });
    };
    //appelé au submit
    AboutPage.prototype.updateData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            if (_this.name.length <= 0) {
                _this.toast.show('Veuillez entrer un prénom.', '5000', 'center').subscribe(function (toast) {
                });
            }
            else if (_this.has_name) {
                db.executeSql('UPDATE user SET name=?', [_this.name.trim()])
                    .then(function (res) {
                    console.log(res);
                    _this.navCtrl.pop(); //on retire la view une fois l'update fait
                    //this.navCtrl.popToRoot();
                    //this.popView();
                    _this.toast.show('Merci ! Désormais, je vous appellerai ' + _this.name.trim() + ".", '5000', 'center').subscribe(function (toast) {
                    });
                })
                    .catch(function (e) {
                    console.log(e);
                    _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                        console.log(toast);
                    });
                });
            }
            else {
                db.executeSql('INSERT INTO user VALUES(NULL,?)', [_this.name.trim()])
                    .then(function (res) {
                    console.log(res);
                    _this.toast.show('Merci ! Désormais, je vous appellerai ' + _this.name.trim() + ".", '5000', 'center').subscribe(function (toast) {
                        //this.navCtrl.popToRoot();
                    });
                })
                    .catch(function (e) {
                    console.log(e);
                    _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                        console.log(toast);
                    });
                });
            }
            ///////////////
        }).catch(function (e) {
            console.log(e);
            _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                console.log(toast);
            });
        });
    };
    AboutPage.prototype.isValid = function () {
        if (this.name.trim().length <= 0)
            return false; //le champs est vide
        else {
            return true;
        }
    };
    return AboutPage;
}());
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        //où est défini selector ?
        selector: 'page-about',template:/*ion-inline-start:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\about\about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Vos informations</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="action-sheets-basic-page" ng-controller="AboutController">\n  <h2>Comment dois-je vous appeller ?</h2>\n\n\n\n  <form (ngSubmit)="updateData()" name="form" novalidate  >\n    \n    \n              <!-- nom -->\n        \n              \n                    <ion-item>\n                      <ion-label>Pseudo</ion-label>\n                      <ion-input type="text" name="name" [(ngModel)]="name"  ></ion-input>\n                    </ion-item>\n                    <br />\n\n                           \n                    <ion-item *ngIf="!isValid()">\n                      <p>Désolé, le champ Pseudo est obligatoire !</p>\n                    </ion-item>\n                  \n  \n  \n              <button ion-button  type="submit" [disabled]="!isValid()"  class="btn btn-lg btn-success form-button" block >Valider</button> \n            \n    </form>\n    \n\n\n\n</ion-content>\n'/*ion-inline-end:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\about\about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_show_all_show_all__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_add_add__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_about_about__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_success_add_success_add__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_edit_edit__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_show_one_show_one__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_sqlite__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_toast__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ionic2_rating__ = __webpack_require__(272);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










//pages hors tabs





//SQLite

//Toast

// Import ionic2-rating module

var SQLiteMock = (function () {
    function SQLiteMock() {
    }
    SQLiteMock.prototype.create = function (config) {
        return new Promise(function (resolve, reject) {
            resolve(new __WEBPACK_IMPORTED_MODULE_15__ionic_native_sqlite__["b" /* SQLiteObject */](new Object()));
        });
    };
    return SQLiteMock;
}());
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_show_all_show_all__["a" /* ShowAllPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_add_add__["a" /* AddPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_success_add_success_add__["a" /* SuccessAddPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_edit_edit__["a" /* EditPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_show_one_show_one__["a" /* ShowOnePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/show-all/show-all.module#ShowAllPageModule', name: 'ShowAllPage', segment: 'show-all', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/show-one/show-one.module#ShowOnePageModule', name: 'ShowOnePage', segment: 'show-one', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/success-add/success-add.module#SuccessAddPageModule', name: 'SuccessAddPage', segment: 'success-add', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_17_ionic2_rating__["a" /* Ionic2RatingModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* ReactiveFormsModule */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_show_all_show_all__["a" /* ShowAllPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_add_add__["a" /* AddPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_success_add_success_add__["a" /* SuccessAddPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_edit_edit__["a" /* EditPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_show_one_show_one__["a" /* ShowOnePage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_toast__["a" /* Toast */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\cordova\backu\MyFavoriteRestaurants-master\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\cordova\backu\MyFavoriteRestaurants-master\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditPage = (function () {
    function EditPage(navCtrl, navParams, formBuilder, sqlite, toast, app) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.sqlite = sqlite;
        this.toast = toast;
        this.app = app;
        this.data = { rowid: 0, name: "", location: "", star: 5, price: 1, type: "", review: "" };
        this.rowid = 0;
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
    EditPage.prototype.getCurrentData = function (rowid) {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM restaurants WHERE rowid=?', [rowid])
                .then(function (res) {
                if (res.rows.length > 0) {
                    //this.data.push({rowid:res.rows.item(0).rowid,name:res.rows.item(0).name, location:res.rows.item(0).location, star:res.rows.item(0).star, price:res.rows.item(0).price, type:res.rows.item(0).type,   review:res.rows.item(0).review})
                    _this.data.rowid = res.rows.item(0).rowid;
                    _this.data.name = res.rows.item(0).name;
                    _this.data.location = res.rows.item(0).location;
                    _this.data.star = res.rows.item(0).star;
                    _this.data.price = res.rows.item(0).price;
                    _this.data.type = res.rows.item(0).type;
                    _this.data.review = res.rows.item(0).review;
                }
            })
                .catch(function (e) {
                console.log(e);
                _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                    console.log(toast);
                });
            });
        }).catch(function (e) {
            console.log(e);
            _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                console.log(toast);
            });
        });
    };
    EditPage.prototype.updateData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('UPDATE restaurants SET name=?,location=?,star=?,price=?,type=?,review=?  WHERE rowid=?', [_this.data.name, _this.data.location, _this.data.star, _this.data.price, _this.data.type, _this.data.review, _this.rowid])
                .then(function (res) {
                console.log(res);
                _this.navCtrl.pop(); //on retire la view une fois l'update fait
                //this.navCtrl.popToRoot();
                //this.popView();
                _this.toast.show('Review modifiée avec succès.', '5000', 'center').subscribe(function (toast) {
                });
            })
                .catch(function (e) {
                console.log(e);
                _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                    console.log(toast);
                });
            });
        }).catch(function (e) {
            console.log(e);
            _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                console.log(toast);
            });
        });
    };
    EditPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditPage');
    };
    EditPage.prototype.popView = function () {
        this.app.getRootNav().pop();
    };
    EditPage.prototype.isValid = function (fieldName) {
        if (fieldName === "name" || fieldName === "location" || fieldName === "review") {
            switch (fieldName) {
                case "name":
                    if (this.data.name.trim().length <= 0)
                        return false; //le champs est vide
                    else
                        return true;
                case "location":
                    if (this.data.location.trim().length <= 0)
                        return false; //le champs est vide
                    else
                        return true;
                case "review":
                    if (this.data.review.trim().length <= 0)
                        return false; //le champs est vide
                    else
                        return true;
            }
        }
        return false; //par défaut
    };
    return EditPage;
}());
EditPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-edit',template:/*ion-inline-start:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\edit\edit.html"*/'<!--\n  Generated template for the EditPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Modifier une review</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding ng-controller="ExampleController">\n\n\n\n    <form  (ngSubmit)="updateData()" name="form" novalidate  >\n        \n        \n                    <!-- nom -->\n                    <ion-item>\n                      <ion-label>Nom du restaurant</ion-label>\n                      <ion-input type="text" name="name" [(ngModel)]="data.name"  ></ion-input>\n                    </ion-item>\n                    <br />\n\n                      \n                    <ion-item *ngIf="!isValid(\'name\')">\n                      <p>Désolé, le champ Nom est obligatoire !</p>\n                    </ion-item>\n\n\n                    <!-- localisation -->\n                    <ion-item>\n                        <ion-label for="adresse">Adresse</ion-label>\n                        <ion-input type="text" name="location" [(ngModel)]="data.location" ></ion-input>\n                    </ion-item>\n        \n                    <ion-item *ngIf="!isValid(\'location\')">\n                      <p>Désolé, le champ Adresse est obligatoire !</p>\n                    </ion-item>\n                  \n                    <!-- note ++ -->\n                    <ion-item>\n        \n                        <ion-label >Note</ion-label>\n        \n                          <ion-select name="star" [(ngModel)]="data.star" >\n                              <ion-option name="star" id="star-5" class="star star-5" value="5">Excellent !</ion-option>\n                              <ion-option name="star" id="star-4" class="star star-4" value="4">Bon !</ion-option>\n                              <ion-option name="star" id="star-3" class="star star-3" value="3">Pas mal !</ion-option>\n                              <ion-option name="star" id="star-2" class="star star-2" value="2">Peut mieux faire !</ion-option>\n                              <ion-option name="star" id="star-1" class="star star-1" value="1">Nul !</ion-option>\n                          </ion-select>\n        \n                    </ion-item>\n        \n        \n        \n        \n                    <!-- type ++ -->\n                    <ion-item>\n                        <ion-label for="type">Type de cuisine</ion-label>\n                        <ion-select name="type" [(ngModel)]="data.type" >\n                            <ion-option name="type" value="africaine">Africaine</ion-option>\n                            <ion-option name="type" value="amérique-du-nord">Amérique du Nord</ion-option>\n                            <ion-option name="type" value="amérique-du-sud">Amérique du Sud</ion-option>\n                            <ion-option name="type" value="chinoise">Chinoise</ion-option>\n                            <ion-option name="type" value="espagnole">Espagnole</ion-option>\n                            <ion-option name="type" value="europe-du-nord">Europe du Nord</ion-option>\n                            <ion-option name="type" value="europe-de-l-est">Europe de l\'Est</ion-option>\n                            <ion-option name="type" value="française">Française</ion-option>\n                            <ion-option name="type" value="fruits-de-mer">Fruits de mer</ion-option>\n                            <ion-option name="type" value="gastronomique">Gastronomique</ion-option>\n                            <ion-option name="type" value="indienne">Indienne</ion-option>\n                            <ion-option name="type" value="italienne">Italienne</ion-option>\n                            <ion-option name="type" value="japonnaise">Japonnaise</ion-option>\n                            <ion-option name="type" value="orientale">Orientale</ion-option>\n                        </ion-select>\n                    </ion-item>\n                \n                \n                    \n                    <!-- prix ++ -->\n        \n                    <ion-item>\n                      \n                      <ion-label >Prix</ion-label>\n                      \n                      <ion-select name="price" [(ngModel)]="data.price" >\n                          <ion-option name="price" id="price-3" class="price price-3" value="3">Cher</ion-option>\n                          <ion-option name="price" id="price-2" class="price price-2" value="2">Moyen</ion-option>\n                          <ion-option name="price" id="price-1" class="price price-1" value="1">Pas cher</ion-option>\n                      </ion-select>\n                      \n                    </ion-item>\n        \n                    <!-- avis -->\n                    <ion-item>\n                      <ion-label for="review">Avis</ion-label>\n                      <ion-textarea name="review" [(ngModel)]="data.review" ></ion-textarea>\n                    </ion-item>\n                  \n                    <ion-item *ngIf="!isValid(\'review\')">\n                      <p>Désolé, le champ Avis est obligatoire !</p>\n                    </ion-item>\n        \n                    <!-- Image -->\n                    <!--<ion-item>\n                        <ion-label>Image: </ion-label><br/>\n                        <ion-input type="file" formControlName="file"></ion-input>\n                    </ion-item>\n                  -->\n                    <button ion-button  type="submit"  [disabled]="!(isValid(\'review\') && isValid(\'location\') && isValid(\'name\'))"   class="btn btn-lg btn-success form-button" block >Valider la modification</button> \n    </form>\n</ion-content>\n'/*ion-inline-end:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\edit\edit.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
], EditPage);

//# sourceMappingURL=edit.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowOnePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__edit_edit__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ShowOnePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ShowOnePage = (function () {
    function ShowOnePage(navCtrl, navParams, sqlite, toast, app) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.toast = toast;
        this.app = app;
        this.data = { rowid: 0, name: "", location: "", star: 5, price: 1, type: "", review: "", is_favorite: 0 };
        this.navCtrl = navCtrl;
        this.toast = toast;
        this.app = app;
        this.getCurrentData(navParams.get("rowid")); //remplit le tableau data des valeurs de la review demandée
    }
    ShowOnePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ShowOnePage');
    };
    //appelé avant que la vue redevienne active (first on the stack)
    ShowOnePage.prototype.ionViewWillEnter = function () {
        this.getCurrentData(this.data.rowid);
    };
    //remplit le tableau data des valeurs de la review demandée
    ShowOnePage.prototype.getCurrentData = function (rowid) {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM restaurants WHERE rowid=?', [rowid])
                .then(function (res) {
                if (res.rows.length > 0) {
                    _this.data.rowid = res.rows.item(0).rowid;
                    _this.data.name = res.rows.item(0).name;
                    _this.data.location = res.rows.item(0).location;
                    _this.data.star = res.rows.item(0).star;
                    _this.data.price = res.rows.item(0).price;
                    _this.data.type = res.rows.item(0).type;
                    _this.data.review = res.rows.item(0).review;
                    _this.data.is_favorite = res.rows.item(0).is_favorite;
                }
            })
                .catch(function (e) {
                console.log(e);
                _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                    console.log(toast);
                });
            });
            /////////////////////////////////////////////
        }).catch(function (e) {
            console.log(e);
            _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                console.log(toast);
            });
        });
    };
    //lance la editPage, on passe en argument l'id de la ligne dans la table
    ShowOnePage.prototype.editData = function (rowid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__edit_edit__["a" /* EditPage */], {
            rowid: rowid
        });
    };
    //supprime une review
    ShowOnePage.prototype.deleteData = function (rowid) {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('DELETE FROM restaurants WHERE rowid=?', [rowid])
                .then(function (res) {
                console.log(res);
                _this.toast.show('Review supprimée avec succès', '5000', 'center').subscribe(function (toast) {
                });
                _this.navCtrl.popToRoot();
                //this.navCtrl.push(ShowAllPage);//revient à showAll
                //this.popView();
                //this.getData();
            })
                .catch(function (e) { return console.log(e); });
            //////////////////
        }).catch(function (e) { return console.log(e); });
    };
    ShowOnePage.prototype.getStringRatingFromInt = function (rating) {
        switch (rating) {
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
    };
    ShowOnePage.prototype.getStringPriceFromInt = function (price) {
        switch (price) {
            case 1:
                return "Pas cher";
            case 2:
                return "Moyen";
            case 3:
                return "Cher";
            default:
                return "Erreur price to string";
        }
    };
    ShowOnePage.prototype.popView = function () {
        this.app.getRootNav().pop();
    };
    //renvoie vrai si la review est favorite
    ShowOnePage.prototype.isFavorite = function (rowid) {
        if (this.data.is_favorite == 1)
            return true;
        return false;
    };
    //update le champs favoris dans la table favorites + update le tableau local aussi
    ShowOnePage.prototype.addToFavorite = function (is_favorite) {
        this.updateFavorite(is_favorite);
        this.data.is_favorite = is_favorite; //on update le tableau local aussi
    };
    //update le champs favoris dans la table favorites
    ShowOnePage.prototype.updateFavorite = function (is_favorite) {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('UPDATE restaurants SET is_favorite=? WHERE rowid=?', [is_favorite, _this.data.rowid])
                .then(function (res) {
                console.log(res);
                var message = "";
                if (is_favorite == 1)
                    message = "Ajouté aux favoris !";
                else {
                    message = "Retiré des favoris !";
                }
                _this.toast.show(message, '5000', 'center').subscribe(function (toast) {
                });
            })
                .catch(function (e) {
                console.log(e);
                _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                    console.log(toast);
                });
            });
        }).catch(function (e) {
            console.log(e);
            _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                console.log(toast);
            });
        });
    };
    return ShowOnePage;
}());
ShowOnePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-show-one',template:/*ion-inline-start:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\show-one\show-one.html"*/'<!--\n  Generated template for the ShowOnePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  \n    <ion-navbar>\n      <ion-title>{{data.name}}</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content padding>\n\n      <h2>Votre review concernant {{data.name}} </h2>\n      <ion-card>\n          \n            <ion-card-header></ion-card-header>\n          \n            <ion-card-content>\n\n                <ion-icon float-end *ngIf=isFavorite() name="heart" (click)="addToFavorite(0)" ></ion-icon>\n                <ion-icon float-end *ngIf=!isFavorite() name="heart-outline" (click)="addToFavorite(1)" ></ion-icon>\n\n                Adresse : {{data.location}}<br><br>\n                Note : {{getStringRatingFromInt(data.star)}}<br><br>\n                Prix : {{getStringPriceFromInt(data.price)}}<br><br>\n                Type : {{data.type}}<br><br>\n                Avis : {{data.review}}<br><br>\n\n                <button ion-button color="primary" (click)="editData(data.rowid)">\n                    <ion-icon name="paper"></ion-icon>\n                  </button>\n                <button ion-button color="danger" (click)="deleteData(data.rowid)">\n                    <ion-icon name="trash"></ion-icon>\n                </button>\n              \n            </ion-card-content>\n          \n      </ion-card>\n  \n  \n  \n  \n  \n  </ion-content>\n  '/*ion-inline-end:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\show-one\show-one.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
], ShowOnePage);

//# sourceMappingURL=show-one.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(platform, sqlite, toast, actionsheetCtrl) {
        this.platform = platform;
        this.sqlite = sqlite;
        this.toast = toast;
        this.actionsheetCtrl = actionsheetCtrl;
        this.name = "";
        this.has_name = false;
        this.getCurrentData();
    }
    HomePage.prototype.ionViewWillEnter = function () {
        this.getCurrentData();
    };
    HomePage.prototype.getCurrentData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            //CREATION de la table restaurants
            db.executeSql('CREATE TABLE IF NOT EXISTS restaurants(rowid INTEGER PRIMARY KEY, name TEXT, location TEXT, star INT, price INT, type TEXT, review TEXT, is_favorite INT)', {})
                .then(function (res) { return console.log('Executed SQL'); })
                .catch(function (e) { return console.log(e); });
            //CREATION de la table user
            db.executeSql('CREATE TABLE IF NOT EXISTS user(rowid INTEGER PRIMARY KEY, name TEXT)', {})
                .then(function (res) { return console.log('Executed SQL'); })
                .catch(function (e) { return console.log(e); });
            db.executeSql('SELECT * FROM user', [])
                .then(function (res) {
                if (res.rows.length > 0) {
                    _this.name = res.rows.item(0).name;
                    _this.has_name = true;
                }
                else {
                    //on n'a pas encore entré de nom
                    _this.has_name = false;
                    _this.name = "utilisateur";
                }
            })
                .catch(function (e) {
                console.log(e);
                _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                    console.log(toast);
                });
            });
        }).catch(function (e) {
            console.log(e);
            _this.toast.show(e, '5000', 'center').subscribe(function (toast) {
                console.log(toast);
            });
        });
    };
    HomePage.prototype.openMenu = function () {
        var actionSheet = this.actionsheetCtrl.create({
            title: 'Albums',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: function () {
                        console.log('Delete clicked');
                    }
                },
                {
                    text: 'Share',
                    icon: !this.platform.is('ios') ? 'share' : null,
                    handler: function () {
                        console.log('Share clicked');
                    }
                },
                {
                    text: 'Play',
                    icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
                    handler: function () {
                        console.log('Play clicked');
                    }
                },
                {
                    text: 'Favorite',
                    icon: !this.platform.is('ios') ? 'heart-outline' : null,
                    handler: function () {
                        console.log('Favorite clicked');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\home\home.html"*/'<ion-header class="ion-header" color="my-brown">\n  <ion-navbar>\n    <ion-title>My Restaurant Butler</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding >\n  <h2>Bienvenue dans My Restaurant Butler, <span class="italic">{{name}}</span> !</h2><br>\n  <p>\n    Bonjour <span class="italic">{{name}}</span>. Je suis <span>Geoffrey</span>, votre major d\'homme. Je suis là pour gérer toutes vos reviews des restaurants que vous avez visités.\n  </p><br>\n\n  <ion-card>\n      \n        <ion-card-header>Voici ce que je ferai pour vous :</ion-card-header>\n      \n        <ion-card-content>\n            Afficher toutes vos reviews<br><br>\n            Sauvegarder tous vos ajouts, suppressions et modifications<br><br>\n            Offrir un accès privilégié à vos restaurants favoris<br><br>\n            Retenir votre prénom\n        </ion-card-content>\n      \n  </ion-card>\n\n\n  <p>Sélectionnez un onglet pour commencer !</p>\n\n</ion-content>\n'/*ion-inline-end:"C:\cordova\backu\MyFavoriteRestaurants-master\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

},[203]);
//# sourceMappingURL=main.js.map