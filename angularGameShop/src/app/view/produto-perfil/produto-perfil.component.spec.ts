import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoPerfilComponent } from './produto-perfil.component';

describe('ProdutoPerfilComponent', () => {
  let component: ProdutoPerfilComponent;
  let fixture: ComponentFixture<ProdutoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
