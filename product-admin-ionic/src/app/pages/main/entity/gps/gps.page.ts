import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from '../../../../models/user.model';
import { District} from '../../../../models/dictrict.model';
import { UtilsService } from 'src/app/services/utils.service';
import { where } from 'firebase/firestore';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
})
export class GpsPage implements OnInit {
  districts
  churchs
  gps

  form = new FormGroup({
    districtId:new FormControl({}),
    district:new FormControl({}),
    church:new FormControl({}),
    churchId:new FormControl('',[Validators.required]),
    name:new FormControl('',[Validators.required]),
  })
  firebaseSvc= inject(FirebaseService)
  UtilsSvc= inject(UtilsService)
  constructor() { }

  ngOnInit() {
    this.getDistricts()
  }

  getDistricts(){
    let path = `/ditricts`
    let query=[
      where('fieldId','==','iKxOs0kK6XQT4RpGmjyD')
    ]
    let sub = this.firebaseSvc.getCollectionData(path,query).subscribe({
      next: (res:any) =>{
        this.districts = res;
        sub.unsubscribe()
      }
    })
  }

  getGps(church,onlyId){
    if(!onlyId){
      church=church.detail.value.id
    }
    let path = `/gps`
    let query=[where('churchId','==',church)]
    let sub = this.firebaseSvc.getCollectionData(path,query).subscribe({
      next: (res:any) =>{
        this.gps = res;
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

  getChurchs(district,onlyId){
    if(!onlyId){
      district = district.detail.value.id
    }
    let path = `/churchs`
    let query=[where('districtId','==',district)]
    let sub = this.firebaseSvc.getCollectionData(path,query).subscribe({
      next: (res:any) =>{
        this.churchs = res;
        sub.unsubscribe()
      }
    })
  }

  confirmDeleteGPS(gps){
    this.UtilsSvc.presentAlert({
      header: 'Eliminar GPS!',
      message: 'Deseas eliminar GPS?',
      mode:'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Si, eliminar',
          handler: () => {
           this.deleteGPS(gps)
          }
        }
      ]
    });  
  }

  exitModal(){
    this.UtilsSvc.dismissModal({success:true})
  }

  async save(){
    const loading = await this.UtilsSvc.loading();
    await loading.present();
    let path = `/gps`
    delete this.form.value.district
    delete this.form.value.church
    delete this.form.value.districtId
    this.firebaseSvc.addDocument(path,this.form.value).then(res =>{
      this.UtilsSvc.dismissModal({success:true})
      this.UtilsSvc.presentToast({
        message:'GPS creado exitosamente',
        duration:1500,
        color:'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })
    }).catch(error =>{
      console.log(error)

    }).finally(()=>{
      loading.dismiss();
      this.getGps(this.form.value.churchId,true);
    })
  }

  async deleteGPS(gps){
    let path = `/gps/${gps.id}`
    const loading = await this.UtilsSvc.loading();
    await loading.present();

    this.firebaseSvc.deleteDocument(path).then(res =>{
      this.districts = this.districts.filter(d=>d.id !== gps.id);
      this.UtilsSvc.dismissModal({success:true})
      this.UtilsSvc.presentToast({
        message:'GPS eliminado',
        duration:1500,
        color:'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })
    }).catch(error =>{
      console.log(error)

    }).finally(()=>{
      loading.dismiss();
      // console.log(this.form.value.districtId)
      this.getGps(this.form.value.churchId,true);
    })
  }

}
