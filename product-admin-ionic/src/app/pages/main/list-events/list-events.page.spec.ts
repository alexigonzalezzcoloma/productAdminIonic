import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListEventsPage } from './list-events.page';

describe('ListEventsPage', () => {
  let component: ListEventsPage;
  let fixture: ComponentFixture<ListEventsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
