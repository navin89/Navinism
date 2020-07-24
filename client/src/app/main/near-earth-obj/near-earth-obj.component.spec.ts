import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearEarthObjComponent } from './near-earth-obj.component';

describe('NearEarthObjComponent', () => {
  let component: NearEarthObjComponent;
  let fixture: ComponentFixture<NearEarthObjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearEarthObjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearEarthObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
