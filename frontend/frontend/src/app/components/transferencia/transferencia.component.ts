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
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss']
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
