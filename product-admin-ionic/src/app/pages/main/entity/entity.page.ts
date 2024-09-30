import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { where } from 'firebase/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.page.html',
  styleUrls: ['./entity.page.scss'],
})
export class EntityPage implements OnInit {
  
  districts

  isModalOpen=false

  fireBaseSvc= inject(FirebaseService)
  UtilsSvc= inject(UtilsService)

  form = new FormGroup({
    districtId:new FormControl('',[Validators.required]),
    district:new FormControl([],[]),
    })
  constructor() { }

  ngOnInit() {
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

  setOpen(value){
    this.isModalOpen=value
  }

  exitModal(event){

  }

  
}
