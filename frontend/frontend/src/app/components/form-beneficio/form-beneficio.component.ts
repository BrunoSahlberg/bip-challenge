import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficio } from '../../models/beneficio.model';
import { BeneficioService } from '../../services/beneficio.service';

@Component({
  selector: 'app-form-beneficio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>{{ isEditing ? 'Editar Benefício' : 'Novo Benefício' }}</h2>

      <div class="row" *ngIf="loading">
        <div class="col-12">
          <div class="alert alert-info">Carregando...</div>
        </div>
      </div>

      <div class="row" *ngIf="error">
        <div class="col-12">
          <div class="alert alert-danger">{{ error }}</div>
        </div>
      </div>

      <form *ngIf="!loading" (ngSubmit)="salvar()" #beneficioForm="ngForm">
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="nome" class="form-label">Nome *</label>
              <input type="text" class="form-control" id="nome"
                     [(ngModel)]="beneficio.nome" name="nome" required>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="valor" class="form-label">Valor *</label>
              <input type="number" class="form-control" id="valor"
                     [(ngModel)]="beneficio.valor" name="valor" step="0.01" required>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="descricao" class="form-label">Descrição</label>
          <textarea class="form-control" id="descricao" rows="3"
                    [(ngModel)]="beneficio.descricao" name="descricao"></textarea>
        </div>

        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="ativo"
                 [(ngModel)]="beneficio.ativo" name="ativo">
          <label class="form-check-label" for="ativo">Ativo</label>
        </div>

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-primary"
                  [disabled]="!beneficioForm.form.valid || saving">
            {{ saving ? 'Salvando...' : 'Salvar' }}
          </button>
          <button type="button" class="btn btn-secondary" (click)="cancelar()">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container { margin-top: 20px; max-width: 800px; }
  `]
})
export class FormBeneficioComponent implements OnInit {
  beneficio: Beneficio = {
    nome: '',
    descricao: '',
    valor: 0,
    ativo: true
  };
  isEditing = false;
  loading = false;
  saving = false;
  error: string | null = null;

  constructor(
    private beneficioService: BeneficioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.carregarBeneficio(+id);
    }
  }

  carregarBeneficio(id: number): void {
    this.loading = true;
    this.beneficioService.obterBeneficio(id).subscribe({
      next: (beneficio) => {
        this.beneficio = beneficio;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  salvar(): void {
    if (!this.beneficio.nome || this.beneficio.valor <= 0) {
      this.error = 'Nome e valor são obrigatórios!';
      return;
    }

    this.saving = true;
    this.error = null;

    const operacao = this.isEditing
      ? this.beneficioService.atualizarBeneficio(this.beneficio.id!, this.beneficio)
      : this.beneficioService.criarBeneficio(this.beneficio);

    operacao.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/beneficios']);
      },
      error: (error) => {
        this.error = error.message;
        this.saving = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/beneficios']);
  }
}
