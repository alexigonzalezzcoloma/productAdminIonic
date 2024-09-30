import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityPage } from './entity.page';

describe('EntityPage', () => {
  let component: EntityPage;
  let fixture: ComponentFixture<EntityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
