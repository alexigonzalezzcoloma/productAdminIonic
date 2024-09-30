import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from '../../../models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
      uid: new FormControl(''),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
      name:new FormControl('',[Validators.required, Validators.minLength(4)]),
    })
  
   fireBaseSvc= inject(FirebaseService)
   UtilsSvc= inject(UtilsService)
  
    ngOnInit() {
    }
  
    async submit(){
      if(this.form.valid){
        const loading = await this.UtilsSvc.loading();
        await loading.present();
  
        this.fireBaseSvc.signUp(this.form.value as User).then(res =>{
          
          this.fireBaseSvc.updateUser(this.form.value.name)

          let uid = res.user.uid
          this.form.controls.uid.setValue(uid)

          this.setUserInfo(uid)


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
  
    async setUserInfo(uid:string){
      if(this.form.valid){
        const loading = await this.UtilsSvc.loading();
        await loading.present();

        let path= `users/${uid}`
        delete this.form.value.password
  
        this.fireBaseSvc.setDocument(path,this.form.value).then(res =>{
          this.UtilsSvc.saveInLocalStorage('user', this.form.value)
          this.UtilsSvc.routerLink('main/home')
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
