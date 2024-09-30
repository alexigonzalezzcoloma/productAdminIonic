import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { where } from 'firebase/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-church',
  templateUrl: './church.page.html',
  styleUrls: ['./church.page.scss'],
})
export class ChurchPage implements OnInit {
  churchs
  districts
  firebaseSvc= inject(FirebaseService)
  utilsSvc= inject(UtilsService)
  router = inject(Router);
  constructor() { }

  form = new FormGroup({
    district:new FormControl([],[]),
    districtId:new FormControl('',[Validators.required]),
    name:new FormControl('',[Validators.required]),
    })

    getDistricts(){
      let path = `/ditricts`
      let query=[
        where('fieldId','==','iKxOs0kK6XQT4RpGmjyD') //por defecto ASACh
      ]
      let sub = this.firebaseSvc.getCollectionData(path,query).subscribe({
        next: (res:any) =>{
          this.districts = res;
          console.log(this.districts)
          sub.unsubscribe()
        }
      })
    }

  ngOnInit() {
    this.getDistricts()
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

  setDistrictId(event){
    let districtId = event.detail.value.id 
    this.form.patchValue({districtId:districtId})
  }

  async save(){
    const loading = await this.utilsSvc.loading();
    await loading.present();
    let path = `/churchs`
    delete this.form.value.district
    this.firebaseSvc.addDocument(path,this.form.value).then(res =>{
      this.utilsSvc.dismissModal({success:true})
      this.utilsSvc.presentToast({
        message:'Iglesia creada exitosamente',
        duration:1500,
        color:'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })
    }).catch(error =>{
      console.log(error)

    }).finally(()=>{
      loading.dismiss();
      this.getChurchs(this.form.value.districtId,true);
    })
  }

  exitModal(){
    this.utilsSvc.dismissModal({success:true})
  }

  confirmDeleteChurch(church){
    this.utilsSvc.presentAlert({
      header: 'Eliminar Iglesia!',
      message: 'Deseas eliminar iglesia?',
      mode:'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Si, eliminar',
          handler: () => {
           this.deleteChurch(church)
          }
        }
      ]
    });  
  }

  async deleteChurch(church){
    let path = `/churchs/${church.id}`
    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.firebaseSvc.deleteDocument(path).then(res =>{
      this.districts = this.districts.filter(d=>d.id !== church.id);
      this.utilsSvc.dismissModal({success:true})
      this.utilsSvc.presentToast({
        message:'Iglesia eliminada correctamente',
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
      this.getChurchs(this.form.value.districtId,true);
    })
  }

}
