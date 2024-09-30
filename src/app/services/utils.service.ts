import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router)
  modalCtrl = inject(ModalController)
  alertCtrl = inject(AlertController)
  loading(){
    return this.loadingCtrl.create({spinner:'crescent'})
  }

   async takePicture (promptLabelHeader){
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source:CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto:'Selecciona una imágen',
      promptLabelPicture:'Toma una foto'
    });
  };

  async presentAlert(opts?:AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
    await alert.present();
  }

  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  routerLink(url:string){
    return this.router.navigateByUrl(url)
  }


  //guardar elemento en localStorage
  saveInLocalStorage(key:string, value:any){
    return localStorage.setItem(key, JSON.stringify(value))
  }

  //obtener un elemento en localStorage
  getFromLocalStorage(key:string){
    return JSON.parse(localStorage.getItem(key))
  }

  //modal
  async presentModal(opts:ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if(data) return data;
  }

  dismissModal(data?:any){
    return this.modalCtrl.dismiss(data)
  }
}
