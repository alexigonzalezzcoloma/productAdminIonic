import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  router = inject(Router);
  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  constructor() { }

  ngOnInit() {
  }

  //seleccionar foto
  async takeImage() {
    let user = this.user()
    let path = `users/${user.uid}}`
   
    const dataUrl = (await this.utilsSvc.takePicture('Imágen del perfil')).dataUrl;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let imagePath = `${user.uid}/profile`;
    user.image = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
    
    this.firebaseSvc.updateDocument(path,{image:user.image}).then(res =>{

      this.utilsSvc.saveInLocalStorage('user',user)

      this.utilsSvc.presentToast({
        message:'Imágen actualizada correctamente',
        duration:1500,
        color:'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })
    }).catch(error =>{
      console.log(error)

    }).finally(()=>{
      loading.dismiss();
    })
  }


  user() {
    return this.utilsSvc.getFromLocalStorage('user')
  }

}
