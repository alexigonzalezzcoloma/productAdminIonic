import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute,Router } from '@angular/router';
import { where } from 'firebase/firestore';

@Component({
  selector: 'app-event-request',
  templateUrl: './event-request.page.html',
  styleUrls: ['./event-request.page.scss'],
})
export class EventRequestPage implements OnInit {
  @Input() id?;
  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)
  periods
  fatherData
  titleEvent="Crear Evento"
  event:any

  form = new FormGroup({
    name:new FormControl('',[Validators.required, Validators.minLength(4)]),
    description:new FormControl('',[Validators.required, Validators.minLength(20)]),
    period:new FormControl('',[Validators.required, Validators.minLength(7)]),
    imageQuantity:new FormControl(0,[Validators.required, Validators.min(0)]),
    documentQuantity:new FormControl(0,[Validators.required, Validators.min(0)]),
  })

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getPeriods()
    this.id =  this._route.snapshot.paramMap.get('id');
    if(this.id){
      this.titleEvent="Ver Evento"
      this.getEventRequestById(this.id)
    }
  }

  getPeriods() {
    let path = `/periods`
    let query = []
    let sub = this.firebaseSvc.getCollectionData(path,query).subscribe({
      next: (res: any) => {
        this.periods = res;
        sub.unsubscribe()
      }
    })
  }

  async getEventRequestById(id: string) {
    const path = '/eventRequest'; // Ruta de la colección
    const event = await this.firebaseSvc.getEventRequestById(path, id);
    if (event) {
      console.log('Evento encontrado:', event);
      this.event=event
      this.form.patchValue(event)
      this.disableControlls()
    } else {
      console.log('Evento no encontrado');
    }
  }

  disableControlls(){
    this.form.get('name').disable();
    this.form.get('description').disable();
    this.form.get('period').disable();
    this.form.get('imageQuantity').disable();
    this.form.get('documentQuantity').disable();
  }

  async submit(){
    const loading = await this.utilsSvc.loading();
    await loading.present();
    let path = `/eventRequest`

    this.firebaseSvc.addDocument(path,this.form.value).then(res =>{
      this.utilsSvc.dismissModal({success:true})
      this.utilsSvc.presentToast({
        message:'Evento Guardado',
        duration:1500,
        color:'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })
      this.form.patchValue({})
    }).catch(error =>{
      console.log(error)

    }).finally(()=>{
      loading.dismiss();
    })
  }

}
