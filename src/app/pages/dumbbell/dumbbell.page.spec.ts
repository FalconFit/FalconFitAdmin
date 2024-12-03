import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DumbbellPage } from './dumbbell.page';

describe('DumbbellPage', () => {
  let component: DumbbellPage;
  let fixture: ComponentFixture<DumbbellPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbbellPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
