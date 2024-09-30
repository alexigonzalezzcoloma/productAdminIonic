import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventRequestPage } from './event-request.page';

describe('EventRequestPage', () => {
  let component: EventRequestPage;
  let fixture: ComponentFixture<EventRequestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
