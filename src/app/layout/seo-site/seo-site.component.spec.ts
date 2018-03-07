import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoSiteComponent } from './seo-site.component';

describe('SeoSiteComponent', () => {
  let component: SeoSiteComponent;
  let fixture: ComponentFixture<SeoSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeoSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeoSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
