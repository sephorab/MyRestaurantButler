webpackJsonp([2],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowAllPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_add__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__edit_edit__ = __webpack_require__(156);
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
    function ShowAllPage(navCtrl, navParams, sqlite) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.restaurants = [];
        this.name = "";
        this.location = "";
        this.star = 1;
        this.price = 1;
        this.type = "";
        this.review = "";
        this.navCtrl = navCtrl;
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
            //CREATION de la table restaurants
            db.executeSql('CREATE TABLE IF NOT EXISTS restaurants(rowid INTEGER PRIMARY KEY, name TEXT, location TEXT, star INT, price INT, type TEXT, review TEXT)', {})
                .then(function (res) { return console.log('Executed SQL'); })
                .catch(function (e) { return console.log(e); });
            //RECUPERE tous les restaurants dans l'ordre décroissant des id
            db.executeSql('SELECT * FROM restaurants ORDER BY rowid DESC', {})
                .then(function (res) {
                _this.restaurants = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.restaurants.push({ rowid: res.rows.item(i).rowid, name: res.rows.item(i).name, location: res.rows.item(i).location, star: res.rows.item(i).star, price: res.rows.item(i).price, type: res.rows.item(i).type, review: res.rows.item(i).review });
                }
            })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    ShowAllPage.prototype.addData = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__add_add__["a" /* AddPage */]);
    };
    //on passe en argument l'id de la ligne dans la table
    ShowAllPage.prototype.editData = function (rowid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__edit_edit__["a" /* EditPage */], {
            rowid: rowid
        });
    };
    ShowAllPage.prototype.deleteData = function (rowid) {
        var _this = this;
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
        }).catch(function (e) { return console.log(e); });
    };
    return ShowAllPage;
}());
ShowAllPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-show-all',template:/*ion-inline-start:"C:\cordova\Kitshake\src\pages\show-all\show-all.html"*/'<!--\n  Generated template for the ShowAllPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Voir tout</ion-title>\n\n    <ion-buttons end>\n        <button ion-button icon-only (click)="addData()">\n          <ion-icon name="add-circle"></ion-icon>\n        </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n    <h2>Toutes les reviews</h2>\n    <ion-list>\n      <ion-item-sliding *ngFor="let restaurant of restaurants; let i=index">\n        <ion-item nopadding>\n          <p>\n            <span>Nom : {{restaurant.name}}</span><br>\n            Adresse : {{restaurant.location}}<br>\n            Note : {{restaurant.star}}<br>\n            Prix : {{restaurant.price}}<br>\n            Type : {{restaurant.type}}<br>\n          </p>\n          <h3 item-end>\n              Avis : {{restaurant.review}}\n          </h3>\n        </ion-item>\n        <ion-item-options side="right">\n          <button ion-button color="primary" (click)="editData(restaurant.rowid)">\n            <ion-icon name="paper"></ion-icon>\n          </button>\n          <button ion-button color="danger" (click)="deleteData(restaurant.rowid)">\n            <ion-icon name="trash"></ion-icon>\n          </button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n  </ion-content>'/*ion-inline-end:"C:\cordova\Kitshake\src\pages\show-all\show-all.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
], ShowAllPage);

//# sourceMappingURL=show-all.js.map

/***/ }),

/***/ 113:
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
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/show-all/show-all.module": [
		273,
		1
	],
	"../pages/success-add/success-add.module": [
		274,
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
webpackAsyncContext.id = 154;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(11);
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
    function EditPage(navCtrl, navParams, formBuilder, sqlite, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.sqlite = sqlite;
        this.toast = toast;
        this.rowid = 0;
        this.navCtrl = navCtrl;
        this.formGroupEdit = this.formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            location: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            star: ['5', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            price: ['3', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            type: ['africaine', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            review: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
        });
        //met à jour avec les données courantes de la bdd
        this.rowid = navParams.get("rowid");
        this.getCurrentData(navParams.get("rowid"));
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
                    //this.data.rowid = res.rows.item(0).rowid;
                    _this.formGroupEdit.value.name = res.rows.item(0).name;
                    _this.formGroupEdit.value.location = res.rows.item(0).location;
                    _this.formGroupEdit.value.star = res.rows.item(0).star;
                    _this.formGroupEdit.value.price = res.rows.item(0).price;
                    _this.formGroupEdit.value.type = res.rows.item(0).type;
                    _this.formGroupEdit.value.review = res.rows.item(0).review;
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
            db.executeSql('UPDATE restaurants SET name=?,location=?,star=?,price=?,type=?,review=?  WHERE rowid=?', [_this.formGroupEdit.value.name, _this.formGroupEdit.value.location, _this.formGroupEdit.value.star, _this.formGroupEdit.value.price, _this.formGroupEdit.value.type, _this.formGroupEdit.value.review, _this.rowid])
                .then(function (res) {
                console.log(res);
                _this.toast.show('Data updated', '5000', 'center').subscribe(function (toast) {
                    _this.navCtrl.popToRoot();
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
    return EditPage;
}());
EditPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-edit',template:/*ion-inline-start:"C:\cordova\Kitshake\src\pages\edit\edit.html"*/'<!--\n  Generated template for the EditPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Modifier une review</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n\n\n    <form *ngIf="formGroupAdd" [formGroup]="formGroupAdd" (ngSubmit)="updateData()"  >\n        \n        \n                    <!-- nom -->\n                    <ion-item>\n                      <ion-label>Nom du restaurant</ion-label>\n                      <ion-input type="text" formControlName="name" ></ion-input>\n                    </ion-item>\n                    <ion-item *ngIf="formGroupAdd.controls.name.hasError(\'required\') && formGroupAdd.controls.name.touched">\n                      <p>Désolé, le champ Nom est obligatoire !</p>\n                    </ion-item>\n        \n                    <!-- localisation -->\n                    <ion-item>\n                        <ion-label for="adresse">Adresse</ion-label>\n                        <ion-input type="text" formControlName="location"></ion-input>\n                    </ion-item>\n        \n                    <ion-item *ngIf="formGroupAdd.controls.location.hasError(\'required\') && formGroupAdd.controls.location.touched">\n                      <p>Désolé, le champ Adresse est obligatoire !</p>\n                    </ion-item>\n        \n                    <!-- note ++ -->\n                    <ion-item>\n        \n                        <ion-label >Note</ion-label>\n        \n                          <ion-select formControlName="star">\n                              <ion-option name="star" id="star-5" class="star star-5" value="5">Excellent !</ion-option>\n                              <ion-option name="star" id="star-4" class="star star-4" value="4">Bon !</ion-option>\n                              <ion-option name="star" id="star-3" class="star star-3" value="3">Pas mal !</ion-option>\n                              <ion-option name="star" id="star-2" class="star star-2" value="2">Peut mieux faire !</ion-option>\n                              <ion-option name="star" id="star-1" class="star star-1" value="1">Nul !</ion-option>\n                          </ion-select>\n        \n                    </ion-item>\n        \n        \n        \n        \n                    <!-- type ++ -->\n                    <ion-item>\n                        <ion-label for="type">Type de cuisine</ion-label>\n                        <ion-select formControlName="type">\n                            <ion-option name="type" value="africaine">Africaine</ion-option>\n                            <ion-option name="type" value="amérique-du-nord">Amérique du Nord</ion-option>\n                            <ion-option name="type" value="amérique-du-sud">Amérique du Sud</ion-option>\n                            <ion-option name="type" value="chinoise">Chinoise</ion-option>\n                            <ion-option name="type" value="espagnole">Espagnole</ion-option>\n                            <ion-option name="type" value="europe-du-nord">Europe du Nord</ion-option>\n                            <ion-option name="type" value="europe-de-l-est">Europe de l\'Est</ion-option>\n                            <ion-option name="type" value="française">Française</ion-option>\n                            <ion-option name="type" value="fruits-de-mer">Fruits de mer</ion-option>\n                            <ion-option name="type" value="gastronomique">Gastronomique</ion-option>\n                            <ion-option name="type" value="indienne">Indienne</ion-option>\n                            <ion-option name="type" value="italienne">Italienne</ion-option>\n                            <ion-option name="type" value="japonnaise">Japonnaise</ion-option>\n                            <ion-option name="type" value="orientale">Orientale</ion-option>\n                        </ion-select>\n                    </ion-item>\n                \n                \n                    \n                    <!-- prix ++ -->\n        \n                    <ion-item>\n                      \n                      <ion-label >Prix</ion-label>\n                      \n                      <ion-select formControlName="price">\n                          <ion-option name="price" id="price-3" class="price price-3" value="3">Cher</ion-option>\n                          <ion-option name="price" id="price-2" class="price price-2" value="2">Moyen</ion-option>\n                          <ion-option name="price" id="price-1" class="price price-1" value="1">Pas cher</ion-option>\n                      </ion-select>\n                      \n                    </ion-item>\n        \n                    <!-- avis -->\n                    <ion-item>\n                      <ion-label for="review">Avis</ion-label>\n                      <ion-textarea formControlName="review" name="review" ></ion-textarea>\n                    </ion-item>\n                  \n                    <ion-item *ngIf="formGroupAdd.controls.review.hasError(\'required\') && formGroupAdd.controls.review.touched">\n                      <p>Désolé, le champ Avis est obligatoire !</p>\n                    </ion-item>\n        \n                    <!-- Image -->\n                    <!--<ion-item>\n                        <ion-label>Image: </ion-label><br/>\n                        <ion-input type="file" formControlName="file"></ion-input>\n                    </ion-item>\n                  -->\n                    <button ion-button  type="submit" [disabled]="!formGroupAdd.valid"  class="btn btn-lg btn-success form-button" block >Ajouter la review</button> \n                </form>\n</ion-content>\n'/*ion-inline-end:"C:\cordova\Kitshake\src\pages\edit\edit.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */]])
], EditPage);

//# sourceMappingURL=edit.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__show_all_show_all__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_add__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__about_about__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__show_all_show_all__["a" /* ShowAllPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__add_add__["a" /* AddPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__about_about__["a" /* AboutPage */];
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\cordova\Kitshake\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Voir tout" tabIcon="pizza"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Ajouter un restaurant" tabIcon="add-circle"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"C:\cordova\Kitshake\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


//code behind
var AboutPage = (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.counter = 0;
        this.button_label = "Increment!";
        this.enable_increment = false;
    }
    //async ?
    AboutPage.prototype.increment = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.enable_increment = !this.enable_increment;
                        _a.label = 1;
                    case 1:
                        if (!this.enable_increment) return [3 /*break*/, 3];
                        this.button_label = "Stop!";
                        //Thread sleep for 500ms
                        return [4 /*yield*/, this.sleep(500)];
                    case 2:
                        //Thread sleep for 500ms
                        _a.sent();
                        this.counter++;
                        return [3 /*break*/, 1];
                    case 3:
                        this.button_label = "Increment!";
                        return [2 /*return*/];
                }
            });
        });
    };
    AboutPage.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    return AboutPage;
}());
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        //où est défini selector ?
        selector: 'page-about',template:/*ion-inline-start:"C:\cordova\Kitshake\src\pages\about\about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Test compteur\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n  <!-- les tabs sont ajoutés dans pages/tabs.html-->\n\n\n<ion-content padding>\n\n  <p>{{counter}}</p>\n  <!-- on bind la fonction "increment" à l\'action de click sur le bouton -->\n  <p>\n    <button ion-button block (click)="increment();" class = "center">{{button_label}}</button>\n    <button ion-button class="red_bg">Bouton 2 </button>\n  </p>\n</ion-content>\n'/*ion-inline-end:"C:\cordova\Kitshake\src\pages\about\about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuccessAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(82);
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
 * Generated class for the SuccessAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SuccessAddPage = (function () {
    function SuccessAddPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.name = window.localStorage.getItem('name');
        this.location = window.localStorage.getItem('location');
        this.star = window.localStorage.getItem('star');
        this.price = window.localStorage.getItem('price');
        this.type = window.localStorage.getItem('type');
        this.review = window.localStorage.getItem('review');
        this.price = this.getPriceToString(this.price);
        this.star = this.getStarToString(this.star);
        console.log("DANS SUCCESSADD - NOM DU RESTO : ****************", name);
        // window.localStorage.setItem('file', value.file);
    }
    SuccessAddPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SuccessAddPage');
    };
    SuccessAddPage.prototype.getPriceToString = function (priceInt) {
        switch (priceInt) {
            case ("3"):
                return "Cher";
            case ("2"):
                return "Moyen";
            case ("1"):
                return "Pas cher";
        }
        return "Erreur prix";
    };
    SuccessAddPage.prototype.getStarToString = function (starInt) {
        switch (starInt) {
            case ("5"):
                return "Excellent !";
            case ("4"):
                return "Bon !";
            case ("3"):
                return "Pas mal !";
            case ("2"):
                return "Peut mieux faire !";
            case ("1"):
                return "Nul !";
        }
        return "Erreur star (rating)";
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
        selector: 'page-success-add',template:/*ion-inline-start:"C:\cordova\Kitshake\src\pages\success-add\success-add.html"*/'<!--\n  Generated template for the SuccessAddPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Nouvelle review ajoutée avec succès</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <h1>Welcome {{username}}</h1>\n  <p>Nom : <br/>\n    {{name}}\n  </p>\n  <p>Adresse : <br/>\n    {{location}}\n  </p>\n\n\n  <p>Note : <br/>\n    {{star}}\n  </p>\n\n\n  <p>Type : <br/>\n    {{type}}\n  </p>\n\n\n  <p>Prix : <br/>\n    {{price}}\n  </p>\n\n\n  <p>Avis : <br/>\n    {{review}}\n  </p>\n\n\n\n\n  <button ion-button full color="primary" style="margin-top: 20px;" (click)="backToHome()">Retour à l\'accueil</button>\n</ion-content>'/*ion-inline-end:"C:\cordova\Kitshake\src\pages\success-add\success-add.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], SuccessAddPage);

//# sourceMappingURL=success-add.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_show_all_show_all__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_add_add__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_about_about__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_success_add_success_add__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_edit_edit__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_sqlite__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_toast__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ionic2_rating__ = __webpack_require__(271);
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
            resolve(new __WEBPACK_IMPORTED_MODULE_14__ionic_native_sqlite__["b" /* SQLiteObject */](new Object()));
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
            __WEBPACK_IMPORTED_MODULE_11__pages_edit_edit__["a" /* EditPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/show-all/show-all.module#ShowAllPageModule', name: 'ShowAllPage', segment: 'show-all', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/success-add/success-add.module#SuccessAddPageModule', name: 'SuccessAddPage', segment: 'success-add', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_16_ionic2_rating__["a" /* Ionic2RatingModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* ReactiveFormsModule */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_show_all_show_all__["a" /* ShowAllPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_add_add__["a" /* AddPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_success_add_success_add__["a" /* SuccessAddPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_edit_edit__["a" /* EditPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_toast__["a" /* Toast */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(198);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\cordova\Kitshake\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\cordova\Kitshake\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(11);
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
                db.executeSql('INSERT INTO restaurants VALUES(NULL,?,?,?,?,?,?)', [value.name, value.location, value.star, value.price, value.type, value.review])
                    .then(function (res) {
                    console.log(res);
                    _this.toast.show('Data saved', '5000', 'center').subscribe(function (toast) {
                        _this.navCtrl.popToRoot();
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
        }
        //this.navCtrl.push(SuccessAddPage);
    };
    AddPage.prototype.ngOnInit = function () {
    };
    return AddPage;
}());
AddPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add',template:/*ion-inline-start:"C:\cordova\Kitshake\src\pages\add\add.html"*/'<ion-header>\n    \n  <ion-navbar>\n    <ion-title>\n      Ajouter un restaurant\n    </ion-title>\n  </ion-navbar>\n\n  \n</ion-header>\n\n<ion-content class="round_box bg-picture">\n  <h1 >Ajouter un restaurant</h1>\n\n        <form *ngIf="formGroupAdd" [formGroup]="formGroupAdd" (ngSubmit)="addRestaurantForm(formGroupAdd.value)"  >\n\n\n            <!-- nom -->\n            <ion-item>\n              <ion-label>Nom du restaurant</ion-label>\n              <ion-input type="text" formControlName="name" ></ion-input>\n            </ion-item>\n            <ion-item *ngIf="formGroupAdd.controls.name.hasError(\'required\') && formGroupAdd.controls.name.touched">\n              <p>Désolé, le champ Nom est obligatoire !</p>\n            </ion-item>\n\n            <!-- localisation -->\n            <ion-item>\n                <ion-label for="adresse">Adresse</ion-label>\n                <ion-input type="text" formControlName="location"></ion-input>\n            </ion-item>\n\n            <ion-item *ngIf="formGroupAdd.controls.location.hasError(\'required\') && formGroupAdd.controls.location.touched">\n              <p>Désolé, le champ Adresse est obligatoire !</p>\n            </ion-item>\n\n            <!-- note ++ -->\n            <ion-item>\n\n                <ion-label >Note</ion-label>\n\n                  <ion-select formControlName="star">\n                      <ion-option name="star" id="star-5" class="star star-5" value="5">Excellent !</ion-option>\n                      <ion-option name="star" id="star-4" class="star star-4" value="4">Bon !</ion-option>\n                      <ion-option name="star" id="star-3" class="star star-3" value="3">Pas mal !</ion-option>\n                      <ion-option name="star" id="star-2" class="star star-2" value="2">Peut mieux faire !</ion-option>\n                      <ion-option name="star" id="star-1" class="star star-1" value="1">Nul !</ion-option>\n                  </ion-select>\n\n            </ion-item>\n\n\n\n\n            <!-- type ++ -->\n            <ion-item>\n                <ion-label for="type">Type de cuisine</ion-label>\n                <ion-select formControlName="type">\n                    <ion-option name="type" value="africaine">Africaine</ion-option>\n                    <ion-option name="type" value="amérique-du-nord">Amérique du Nord</ion-option>\n                    <ion-option name="type" value="amérique-du-sud">Amérique du Sud</ion-option>\n                    <ion-option name="type" value="chinoise">Chinoise</ion-option>\n                    <ion-option name="type" value="espagnole">Espagnole</ion-option>\n                    <ion-option name="type" value="europe-du-nord">Europe du Nord</ion-option>\n                    <ion-option name="type" value="europe-de-l-est">Europe de l\'Est</ion-option>\n                    <ion-option name="type" value="française">Française</ion-option>\n                    <ion-option name="type" value="fruits-de-mer">Fruits de mer</ion-option>\n                    <ion-option name="type" value="gastronomique">Gastronomique</ion-option>\n                    <ion-option name="type" value="indienne">Indienne</ion-option>\n                    <ion-option name="type" value="italienne">Italienne</ion-option>\n                    <ion-option name="type" value="japonnaise">Japonnaise</ion-option>\n                    <ion-option name="type" value="orientale">Orientale</ion-option>\n                </ion-select>\n            </ion-item>\n        \n        \n            \n            <!-- prix ++ -->\n\n            <ion-item>\n              \n              <ion-label >Prix</ion-label>\n              \n              <ion-select formControlName="price">\n                  <ion-option name="price" id="price-3" class="price price-3" value="3">Cher</ion-option>\n                  <ion-option name="price" id="price-2" class="price price-2" value="2">Moyen</ion-option>\n                  <ion-option name="price" id="price-1" class="price price-1" value="1">Pas cher</ion-option>\n              </ion-select>\n              \n            </ion-item>\n\n            <!-- avis -->\n            <ion-item>\n              <ion-label for="review">Avis</ion-label>\n              <ion-textarea formControlName="review" name="review" ></ion-textarea>\n            </ion-item>\n          \n            <ion-item *ngIf="formGroupAdd.controls.review.hasError(\'required\') && formGroupAdd.controls.review.touched">\n              <p>Désolé, le champ Avis est obligatoire !</p>\n            </ion-item>\n\n            <!-- Image -->\n            <!--<ion-item>\n                <ion-label>Image: </ion-label><br/>\n                <ion-input type="file" formControlName="file"></ion-input>\n            </ion-item>\n          -->\n            <button ion-button  type="submit" [disabled]="!formGroupAdd.valid"  class="btn btn-lg btn-success form-button" block >Ajouter la review</button> \n        </form>\n  \n\n</ion-content>\n'/*ion-inline-end:"C:\cordova\Kitshake\src\pages\add\add.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */]])
], AddPage);

//# sourceMappingURL=add.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
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
    function HomePage(platform, actionsheetCtrl) {
        this.platform = platform;
        this.actionsheetCtrl = actionsheetCtrl;
    }
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\cordova\Kitshake\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>My Favorite Restaurants</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="action-sheets-basic-page">\n  <h2>Bienvenue dans My Favorite Restaurants !</h2>\n  <p>\n    Gérez vos reviews des restaurants que vous avez visités.\n  </p>\n  <p>\n    Vous pouvez parcourir toutes les reviews, en ajouter, supprimer et les modifier. Sélectionnez un onglet pour commencer.\n\n  </p>\n\n  <button ion-button block (click)="openMenu()">\n    Show Action Sheet\n  </button>\n\n</ion-content>\n'/*ion-inline-end:"C:\cordova\Kitshake\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

},[202]);
//# sourceMappingURL=main.js.map