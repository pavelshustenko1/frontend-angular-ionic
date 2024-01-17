import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContainersPage } from './containers.page';

describe('ContainersPage', () => {
  let component: ContainersPage;
  let fixture: ComponentFixture<ContainersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContainersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
