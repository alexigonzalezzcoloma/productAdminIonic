import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent  implements OnInit {
  @Input() product:Product
  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required, Validators.min(0)]),
    price:new FormControl(null,[Validators.required, Validators.min(0)]),
    soldUnits:new FormControl(null,[Validators.required, Validators.min(0)]),
  })

  
 fireBaseSvc= inject(FirebaseService)
 UtilsSvc= inject(UtilsService)
 user = {} as User
 ngOnInit() {
  this.user = this.UtilsSvc.getFromLocalStorage('user');
  if(this.product) this.form.setValue(this.product)
}
 //seleccionar foto
 async takeImage(){
  const dataUrl = (await this.UtilsSvc.takePicture('Imágen del producto')).dataUrl;
  this.form.controls.image.setValue(dataUrl)
 }


 submit(){
  if(this.form.valid){
    if(this.product) this.updateProduct();
    else this.createProduct()
  }
 }

 setNumberInputs(){
  let {soldUnits,price} = this.form.controls
  if(soldUnits.value) soldUnits.setValue(parseFloat(soldUnits.value))
  if(price.value) price.setValue(parseFloat(price.value))
 }
  async createProduct(){
      let path = `users/${this.user.uid}/products`

      const loading = await this.UtilsSvc.loading();
      await loading.present();

      //subir imagen y obtener url

      let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.fireBaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue((imageUrl))

      delete this.form.value.id

      this.fireBaseSvc.addDocument(path,this.form.value).then(res =>{

        this.UtilsSvc.dismissModal({success:true})

        this.UtilsSvc.presentToast({
          message:'Producto creado exitosamente',
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
    
    // console.log(this.form.value)
  }

  async updateProduct(){
      let path = `users/${this.user.uid}/products/${this.product.id}`
      const loading = await this.UtilsSvc.loading();
      await loading.present();
      //subir imagen y obtener url
    if(this.form.value.image!==this.product.image){
      let dataUrl = this.form.value.image;
      let imagePath = await this.fireBaseSvc.getFilePath(this.product.image);
      let imageUrl = await this.fireBaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue((imageUrl))
    }
      delete this.form.value.id
      this.fireBaseSvc.updateDocument(path,this.form.value).then(res =>{

        this.UtilsSvc.dismissModal({success:true})

        this.UtilsSvc.presentToast({
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
    // console.log(this.form.value)
  
}
