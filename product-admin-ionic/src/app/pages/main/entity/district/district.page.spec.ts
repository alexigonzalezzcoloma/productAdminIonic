import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DistrictPage } from './district.page';

describe('DistrictPage', () => {
  let component: DistrictPage;
  let fixture: ComponentFixture<DistrictPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
