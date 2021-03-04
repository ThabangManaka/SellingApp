import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdvertPage } from './advert.page';

describe('AdvertPage', () => {
  let component: AdvertPage;
  let fixture: ComponentFixture<AdvertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdvertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
