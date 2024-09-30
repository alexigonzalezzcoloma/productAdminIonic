import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { where } from 'firebase/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.page.html',
  styleUrls: ['./district.page.scss'],
})
export class DistrictPage implements OnInit {
  districts
  firebaseSvc= inject(FirebaseService)
  utilsSvc= inject(UtilsService)
  router = inject(Router);
  updating=false


  form = new FormGroup({
    fieldId:new FormControl('',[Validators.required]),
    districtId:new FormControl('',[Validators.required]),
    district:new FormControl([],[]),
    name:new FormControl('',[Validators.required]),
    })

  constructor() { }

  ngOnInit() {
    this.getDistricts()
    this.form.patchValue({fieldId:'iKxOs0kK6XQT4RpGmjyD'}) //por defecto ASACh
  }

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

  async saveDistrict(){
    const loading = await this.utilsSvc.loading();
    await loading.present();
    let path = `/ditricts`
    this.firebaseSvc.addDocument(path,this.form.value).then(res =>{

      this.utilsSvc.dismissModal({success:true})

      this.utilsSvc.presentToast({
        message:'Distrito creado exitosamente',
        duration:1500,
        color:'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })
    }).catch(error =>{
      console.log(error)

    }).finally(()=>{
      loading.dismiss();
      this.getDistricts();
    })
  }


  exitModal(){
    this.utilsSvc.dismissModal({success:true})
  }

  confirmUpdateDistrict(district){
    this.updating=true
  }

  async confirmDeleteDistrict(district) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar Distrito!',
      message: 'Deseas eliminar distrito?',
      mode:'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Si, eliminar',
          handler: () => {
           this.deleteDistrict(district)
          }
        }
      ]
    });  
  }

  async deleteDistrict(district){
    let path = `/ditricts/${district.id}`
    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.firebaseSvc.deleteDocument(path).then(res =>{
      this.districts = this.districts.filter(d=>d.id !== district.id);
      this.utilsSvc.dismissModal({success:true})
      this.utilsSvc.presentToast({
        message:'Distrito eliminado correctamente',
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

  async updateDistrict(district){
    let path = `/ditricts/${district.id}`
    const loading = await this.utilsSvc.loading();
    await loading.present();
    // delete this.form.value.id
    delete this.form.value.fieldId
    delete this.form.value.districtId
    delete this.form.value.district
    this.firebaseSvc.updateDocument(path,this.form.value).then(res =>{
      this.utilsSvc.dismissModal({success:true})

      this.utilsSvc.presentToast({
        message:'Producto actualizado correctamente',
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
}




