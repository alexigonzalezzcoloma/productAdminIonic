import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User} from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    {title:'Inicio',url:'/main/home',icon:'home-outline'},
    {title:'Perfil',url:'/main/profile',icon:'person-outline'},
    {title:'Entidades',url:'/main/entity',icon:'business-outline'},
    {title:'Crear Evento',url:'/main/event-request',icon:'document-text-outline'},
    {title:'Ver Eventos',url:'/main/event-response',icon:'documents-outline'}
  ]

  router = inject(Router);
  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  currentPath:string='';
  ngOnInit() {
    this.router.events.subscribe((event:any)=>{
      if(event?.url) this.currentPath = event.url;
    })
  }

  signOut(){
    this.firebaseSvc.signOut();
  }

  user (){
    return this.utilsSvc.getFromLocalStorage('user')
  }

}

//ionic g page pages/auth/forgot_password
//ionic g module shared
//ionic g c shared/components/header