import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChurchPage } from './church.page';

describe('ChurchPage', () => {
  let component: ChurchPage;
  let fixture: ComponentFixture<ChurchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChurchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
