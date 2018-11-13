import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { AlertController, ToastController } from "@ionic/angular";

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    token: string;

    constructor(private alertController: AlertController, private location: Location, private toastController: ToastController) { }

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
                        this.token = token;
                    })

                this.presentLoginToast();

                this.location.replaceState('/auth-home');
                this.location.go('/auth-home');
                this.location.back();
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
                this.token = null;
                this.location.replaceState('/home');
                this.location.go('/home');
                this.location.back()
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

    getToken() {
        if (firebase.auth().currentUser) {
            firebase.auth()
                .currentUser
                .getIdToken()
                .then((token: string) => {
                    this.token = token;
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
                })

        } else {
            this.token = '';
        }

        return this.token;
    }

    isAuthenticated() {
        return this.token && this.token !== '';
    }

    getOwnerId() {
        return firebase.auth().currentUser.uid;
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