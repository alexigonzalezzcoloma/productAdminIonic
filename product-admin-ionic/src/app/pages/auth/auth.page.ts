import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from '../../models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

 fireBaseSvc= inject(FirebaseService)
 UtilsSvc= inject(UtilsService)

  ngOnInit() {
  }

  async submit(){
    if(this.form.valid){
      const loading = await this.UtilsSvc.loading();
      await loading.present();

      this.fireBaseSvc.signIn(this.form.value as User).then(res =>{
        this.getUserInfo(res.user.uid)
      }).catch(error =>{
        console.log(error)

        this.UtilsSvc.presentToast({
          message:error.message,
          duration:2500,
          color:'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }
    // console.log(this.form.value)
  }

  async getUserInfo(uid:string){
    if(this.form.valid){
      const loading = await this.UtilsSvc.loading();
      await loading.present();

      let path= `users/${uid}`

      this.fireBaseSvc.getDocument(path).then((user:User) =>{
        this.UtilsSvc.saveInLocalStorage('user', user)
        this.UtilsSvc.routerLink('main/home')
        this.UtilsSvc.presentToast({
          message:`Te damos la bienvenida ${user.name}`,
          duration:1500,
          color:'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

        this.form.reset()
      }).catch(error =>{
        console.log(error)

        this.UtilsSvc.presentToast({
          message:error.message,
          duration:2500,
          color:'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }
    // console.log(this.form.value)
  }

}
