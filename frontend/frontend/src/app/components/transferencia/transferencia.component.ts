import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficio } from '../../models/beneficio.model';
import { BeneficioService } from '../../services/beneficio.service';

@Component({
  selector: 'app-transferencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Transferir Valor</h2>

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

      <div class="row" *ngIf="success">
        <div class="col-12">
          <div class="alert alert-success">{{ success }}</div>
        </div>
      </div>

      <form *ngIf="!loading && beneficioOrigem" (ngSubmit)="transferir()" #transferForm="ngForm">
        <div class="card mb-4">
          <div class="card-header">
            <h5>Benefício de Origem</h5>
          </div>
          <div class="card-body">
            <p><strong>ID:</strong> {{ beneficioOrigem.id }}</p>
            <p><strong>Nome:</strong> {{ beneficioOrigem.nome }}</p>
            <p><strong>Valor Atual:</strong> R$ {{ beneficioOrigem.valor | number:'1.2-2' }}</p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="beneficioDestino" class="form-label">Benefício de Destino *</label>
              <select class="form-control" id="beneficioDestino"
                      [(ngModel)]="beneficioDestinoId" name="beneficioDestino" required>
                <option value="">Selecione...</option>
                <option *ngFor="let beneficio of beneficiosDisponiveis"
                        [value]="beneficio.id"
                        [disabled]="beneficio.id === beneficioOrigem.id">
                  {{ beneficio.nome }} (ID: {{ beneficio.id }})
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="valor" class="form-label">Valor a Transferir *</label>
              <input type="number" class="form-control" id="valor"
                     [(ngModel)]="valorTransferencia" name="valor"
                     step="0.01" min="0.01" required>
            </div>
          </div>
        </div>

        <div class="alert alert-info" *ngIf="beneficioOrigem && valorTransferencia > 0">
          <strong>Resumo da Transferência:</strong><br>
          De: {{ beneficioOrigem.nome }} → Para: {{ getNomeBeneficioDestino() }}<br>
          Valor: R$ {{ valorTransferencia | number:'1.2-2' }}<br>
          Saldo após transferência: R$ {{ (beneficioOrigem.valor - valorTransferencia) | number:'1.2-2' }}
        </div>

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-success"
                  [disabled]="!transferForm.form.valid || transferring || valorTransferencia <= 0 || !beneficioDestinoId">
            {{ transferring ? 'Transferindo...' : 'Transferir' }}
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
export class TransferenciaComponent implements OnInit {
  beneficioOrigem: Beneficio | null = null;
  beneficiosDisponiveis: Beneficio[] = [];
  beneficioDestinoId: number | null = null;
  valorTransferencia = 0;
  loading = false;
  transferring = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private beneficioService: BeneficioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.carregarBeneficioOrigem(+id);
      this.carregarBeneficiosDisponiveis();
    }
  }

  carregarBeneficioOrigem(id: number): void {
    this.loading = true;
    this.beneficioService.obterBeneficio(id).subscribe({
      next: (beneficio) => {
        this.beneficioOrigem = beneficio;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  carregarBeneficiosDisponiveis(): void {
    this.beneficioService.listarBeneficios().subscribe({
      next: (beneficios) => {
        this.beneficiosDisponiveis = beneficios;
      },
      error: (error) => {
        console.error('Erro ao carregar benefícios:', error);
      }
    });
  }

  getNomeBeneficioDestino(): string {
    const beneficio = this.beneficiosDisponiveis.find(b => b.id === this.beneficioDestinoId);
    return beneficio ? beneficio.nome : 'Desconhecido';
  }

  transferir(): void {
    if (!this.beneficioOrigem || !this.beneficioDestinoId || this.valorTransferencia <= 0) {
      this.error = 'Dados inválidos para transferência!';
      return;
    }

    if (this.valorTransferencia > this.beneficioOrigem.valor) {
      this.error = 'Saldo insuficiente para transferência!';
      return;
    }

    this.transferring = true;
    this.error = null;
    this.success = null;

    this.beneficioService.transferir(
      this.beneficioOrigem.id!,
      this.beneficioDestinoId,
      this.valorTransferencia
    ).subscribe({
      next: (response) => {
        this.success = response || 'Transferência realizada com sucesso!';
        this.transferring = false;
        // Recarregar dados após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/beneficios']);
        }, 2000);
      },
      error: (error) => {
        this.error = error.message;
        this.transferring = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/beneficios']);
  }
}
