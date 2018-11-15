import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { AlertController, ToastController } from "@ionic/angular";
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private alertController: AlertController, private location: Location, private storage: Storage, private toastController: ToastController) { }

    register(email: string, password: string) {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.login(email, password);
            })
            .catch((err) => {
                this.alertController.create({
                    header: 'Error!',
                    message: `${JSON.stringify(err.message)}`,
                    buttons: [
                        {
                            text: 'Dismiss',
                            handler: () => {
                            }
                        }
                    ]
                }).then(a => a.present());
            });
    }

    login(email: string, password: string) {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                firebase.auth()
                    .currentUser
                    .getIdToken()
                    .then((token: string) => {
                        this.presentLoginToast();
                        this.storage.set('auth-token', token);
                        this.storage.set('uid', firebase.auth().currentUser.uid).then(() => {
                            this.location.replaceState('auth-home');
                            this.location.go('auth-home');
                            this.location.back();
                        });
                    })
            })
            .catch((err) => {
                this.alertController.create({
                    header: 'Error!',
                    message: `${JSON.stringify(err.message)}`,
                    buttons: [
                        {
                            text: 'Dismiss',
                            handler: () => {
                            }
                        }
                    ]
                }).then(a => a.present());
            });
    }

    logout() {
        firebase.auth().signOut()
            .then(() => {
                this.storage.remove('auth-token').then(() => {
                    this.storage.remove('uid').then(() => {
                        this.location.replaceState('home');
                        this.location.go('home');
                        this.location.back();
                    })
                });
            })
            .catch((err) => {
                this.alertController.create({
                    header: 'Error!',
                    message: `${JSON.stringify(err.message)}`,
                    buttons: [
                        {
                            text: 'Dismiss',
                            handler: () => {
                            }
                        }
                    ]
                }).then(a => a.present());
            });
    }

    async isAuthenticated() {
        return (await this.storage.get('auth-token')) as boolean;
    }

    async getOwnerId() {
        return (await this.storage.get('uid')) as string;
    }

    async presentLoginToast() {
        const toast = await this.toastController.create({
            message: 'You have successfully logged in!',
            duration: 2000,
            position: 'top',
            translucent: true,
            showCloseButton: true,
            cssClass: 'success-toast'
        });

        toast.present();
    }
}