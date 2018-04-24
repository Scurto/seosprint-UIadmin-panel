import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsePageComponent } from './parse-page.component';

describe('BlankPageComponent', () => {
    let component: ParsePageComponent;
    let fixture: ComponentFixture<ParsePageComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [ParsePageComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ParsePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
