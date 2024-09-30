import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from '../../../models/user.model';
import { District} from '../../../models/dictrict.model';
import { UtilsService } from 'src/app/services/utils.service';
import { where } from 'firebase/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public  districts: Array<District>
  public churchs
  public gps

  form = new FormGroup({
      uid: new FormControl(''),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
      name:new FormControl('',[Validators.required, Validators.minLength(4)]),
      district:new FormControl({}),
      church:new FormControl({}),
      gps:new FormControl({}),
      districtId:new FormControl('',[Validators.required]),
      churchId:new FormControl('',[Validators.required]),
      gpsId:new FormControl('',[Validators.required]),
      userType:new FormControl('JA',[Validators.required])
    })
  
   fireBaseSvc= inject(FirebaseService)
   UtilsSvc= inject(UtilsService)
  
    ngOnInit() {
        this.getDistricts()
    }

    async submit(){
      if(this.form.valid){
        const loading = await this.UtilsSvc.loading();
        await loading.present();
        delete this.form.value.district
        delete this.form.value.church
        delete this.form.value.gps
        console.log(this.form.value)
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
    }
  
    async setUserInfo(uid:string){
      if(this.form.valid){
        const loading = await this.UtilsSvc.loading();
        await loading.present();

        let path= `users/${uid}`
        delete this.form.value.password
        delete this.form.value.district
        delete this.form.value.church
        delete this.form.value.gps
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

    
  getDistricts(){
    let path = `/ditricts`
    let query=[
      where('fieldId','==','iKxOs0kK6XQT4RpGmjyD')
    ]
    let sub = this.fireBaseSvc.getCollectionData(path,query).subscribe({
      next: (res:any) =>{
        this.districts = res;
        sub.unsubscribe()
      }
    })
  }

  setDistrictId(event){
    let districtId = event.detail.value.id 
    this.form.patchValue({districtId:districtId})
  }

  setChurchId(event){
    let churchId = event.detail.value.id 
    this.form.patchValue({churchId:churchId})
  }

  setGpsId(event){
    let gpsId = event.detail.value.id 
    this.form.patchValue({gpsId:gpsId})
  }

  getChurchs(district){
    district = district.detail.value.id
    let path = `/churchs`
    let query=[where('districtId','==',district)]
    let sub = this.fireBaseSvc.getCollectionData(path,query).subscribe({
      next: (res:any) =>{
        this.churchs = res;
        sub.unsubscribe()
      }
    })
  }

  getGps(church){
    church=church.detail.value.id
    let path = `/gps`
    let query=[where('churchId','==',church)]
    let sub = this.fireBaseSvc.getCollectionData(path,query).subscribe({
      next: (res:any) =>{
        this.gps = res;
        sub.unsubscribe()
      }
    })
  }

  //
}
