import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from '../../../models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
  })

 fireBaseSvc= inject(FirebaseService)
 UtilsSvc= inject(UtilsService)

  ngOnInit() {
  }

  async submit(){
    if(this.form.valid){
      const loading = await this.UtilsSvc.loading();
      await loading.present();

      this.fireBaseSvc.sendRecoveryEmail(this.form.value.email).then(res =>{

        this.UtilsSvc.presentToast({
          message:'Correo enviado con éxito',
          duration:1500,
          color:'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

        this.UtilsSvc.routerLink('/auth')
        this.form.reset();

      }).catch(error =>{
        console.log(error)
        this.UtilsSvc.presentToast({
          message:error.message,
          duration:2500,
          color:'danger',
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
