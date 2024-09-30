import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Injectable, inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { Observable } from 'rxjs';


export const noAuthGuard: CanActivateFn = (route, state) => {
  let firebaseSvc=inject(FirebaseService);
  let utilsSvc=inject(UtilsService)
  
    return new Promise((resolve, reject) => { 

      firebaseSvc.getAuth().onAuthStateChanged((auth)=>{
        if(!auth){
            resolve(true)
        }else{
          utilsSvc.routerLink('/main/home');
          resolve(false)
        }
      })
  });
};
