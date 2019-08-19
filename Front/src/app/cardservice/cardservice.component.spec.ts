import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardserviceComponent } from './cardservice.component';

describe('CardserviceComponent', () => {
  let component: CardserviceComponent;
  let fixture: ComponentFixture<CardserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
