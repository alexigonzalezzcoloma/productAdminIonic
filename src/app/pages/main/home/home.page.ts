import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { orderBy, where } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  products: Product[] = []
  loading: Boolean=false

  ngOnInit() {
  }

  user(){
    return this.utilsSvc.getFromLocalStorage('user')
  }

  ionViewWillEnter(){
    this.getProducts();
  }

  doRefresh(event){
    setTimeout(()=>{
      this.getProducts();
      event.target.complete();
    },1000);
  }

  getProfits(){
    return this.products.reduce((index,product) => index + product.price * product.soldUnits,0)
  }

  getProducts(){
    this.loading=true
    let path = `users/${this.user().uid}/products`
    this.firebaseSvc.getCollectionData(path)

    let query=[
      orderBy('soldUnits','desc'),
      // where('soldUnits','>','3')
    ]
    
    

    let sub = this.firebaseSvc.getCollectionData(path,query).subscribe({
      next: (res:any) =>{
        console.log(res);
        this.products = res;
        this.loading=false
        sub.unsubscribe()
      }
    })
  }

  signOut(){
    this.firebaseSvc.signOut()
  }

  async addUpdateProduct(product?:Product){
    let success = await this.utilsSvc.presentModal({
      component:AddUpdateProductComponent,
      cssClass:'add-update-modal',
      componentProps: {product},
    })
    if(success) this.getProducts()


  }

  async deleteProduct(product:Product){
    let path = `users/${this.user().uid}/products/${product.id}`
    const loading = await this.utilsSvc.loading();
    await loading.present();

    let imagePath = await this.firebaseSvc.getFilePath(product.image);
    await this.firebaseSvc.deleteDocument(imagePath)

    this.firebaseSvc.deleteDocument(path).then(res =>{
      this.products = this.products.filter(p=>p.id !== product.id);
      this.utilsSvc.dismissModal({success:true})
      this.utilsSvc.presentToast({
        message:'Producto eliminado correctamente',
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

  async confirmDeleteProduct(product:Product) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar Producto!',
      message: 'Deseas aleminar producto?',
      mode:'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Si, eliminar',
          handler: () => {
           this.deleteProduct(product)
          }
        }
      ]
    });  
  }
}
