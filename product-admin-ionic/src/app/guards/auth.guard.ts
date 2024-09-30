import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Injectable, inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { Observable } from 'rxjs';




export const authGuard: CanActivateFn = (route, state) => {
  
  let user = localStorage.getItem('user');
  let firebaseSvc=inject(FirebaseService);
  let utilsSvc=inject(UtilsService)
  
    return new Promise((resolve, reject) => { 

      firebaseSvc.getAuth().onAuthStateChanged((auth)=>{
        if(auth){
          if(user){
            resolve(true)
          }
        }else{
          firebaseSvc.signOut()
          resolve(false)
        }
      })
  });
};


// @Injectable({
//   providedIn:'root'
// })

// export class AuthGuard implements CanActivate{
  
//   firebaseSvc=inject(FirebaseService);
//   utilsSvc=inject(UtilsService)

//   CanActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise <boolean | UrlTree> | boolean | UrlTree {

//       return new Promise((resolve)=>{
//         this.firebaseSvc.getAuth().onAuthStateChanged((auth)=>{
//           if(auth){
//             resolve(true)
//           }
//         })
//       })

//   }
// };
