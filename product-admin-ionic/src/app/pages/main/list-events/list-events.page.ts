import { Component, OnInit, inject } from '@angular/core';
import { where } from 'firebase/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.page.html',
  styleUrls: ['./list-events.page.scss'],
})
export class ListEventsPage implements OnInit {
  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  events
  periods

  constructor(private _router: Router) { }
  getEvents(event) {
    let period = event.detail.value
    let path = `/eventRequest`
    let query = [where('period','==',period)]
    let sub = this.firebaseSvc.getCollectionData(path,query).subscribe({
      next: (res: any) => {
        this.events = res;
        sub.unsubscribe()
      }
    })
  }

  navigateToPage(id) {
    this._router.navigate(["main/event-request", id])
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

  ngOnInit() {
    // this.getEvents()
    this.getPeriods()
  }

}
