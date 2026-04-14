import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Beneficio } from '../../models/beneficio.model';
import { BeneficioService } from '../../services/beneficio.service';

@Component({
  selector: 'app-lista-beneficios',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Benefícios</h2>

      <button class="btn btn-primary mb-3" (click)="novoBeneficio()">
        Novo Benefício
      </button>

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

      <div class="row" *ngIf="!loading && !error">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Ativo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let beneficio of beneficios">
                  <td>{{ beneficio.id }}</td>
                  <td>{{ beneficio.nome }}</td>
                  <td>{{ beneficio.descricao }}</td>
                  <td>R$ {{ beneficio.valor | number:'1.2-2' }}</td>
                  <td>
                    <span class="badge" [ngClass]="beneficio.ativo ? 'bg-success' : 'bg-danger'">
                      {{ beneficio.ativo ? 'Ativo' : 'Inativo' }}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary me-2"
                            (click)="editarBeneficio(beneficio.id!)">
                      Editar
                    </button>
                    <button class="btn btn-sm btn-outline-danger me-2"
                            (click)="deletarBeneficio(beneficio.id!)">
                      Deletar
                    </button>
                    <button class="btn btn-sm btn-outline-info"
                            (click)="transferir(beneficio.id!)">
                      Transferir
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { margin-top: 20px; }
    .table { margin-top: 20px; }
  `]
})
export class ListaBeneficiosComponent implements OnInit {
  beneficios: Beneficio[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private beneficioService: BeneficioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarBeneficios();
  }

  carregarBeneficios(): void {
    this.loading = true;
    this.error = null;

    this.beneficioService.listarBeneficios().subscribe({
      next: (beneficios) => {
        this.beneficios = beneficios;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  novoBeneficio(): void {
    this.router.navigate(['/beneficios/novo']);
  }

  editarBeneficio(id: number): void {
    this.router.navigate(['/beneficios/editar', id]);
  }

  deletarBeneficio(id: number): void {
    if (confirm('Tem certeza que deseja deletar este benefício?')) {
      this.beneficioService.deletarBeneficio(id).subscribe({
        next: () => {
          this.carregarBeneficios(); // Recarregar lista
        },
        error: (error) => {
          alert('Erro ao deletar benefício: ' + error.message);
        }
      });
    }
  }

  transferir(id: number): void {
    this.router.navigate(['/beneficios/transferir', id]);
  }
}
