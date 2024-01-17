import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewContainerPage } from './new-container.page';

describe('NewContainerPage', () => {
  let component: NewContainerPage;
  let fixture: ComponentFixture<NewContainerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewContainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
