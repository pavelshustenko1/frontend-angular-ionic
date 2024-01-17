import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewThingPage } from './new-thing.page';

describe('NewThingPage', () => {
  let component: NewThingPage;
  let fixture: ComponentFixture<NewThingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewThingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
