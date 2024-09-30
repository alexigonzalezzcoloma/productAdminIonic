import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventResponsePage } from './event-response.page';

describe('EventResponsePage', () => {
  let component: EventResponsePage;
  let fixture: ComponentFixture<EventResponsePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventResponsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
