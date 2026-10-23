import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiLoading } from './api-loading';

describe('ApiLoading', () => {
  let component: ApiLoading;
  let fixture: ComponentFixture<ApiLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiLoading],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiLoading);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
