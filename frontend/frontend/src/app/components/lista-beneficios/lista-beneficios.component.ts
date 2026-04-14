import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Beneficio } from '../../models/beneficio.model';
import { BeneficioService } from '../../services/beneficio.service';

@Component({
  selector: 'app-lista-beneficios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-beneficios.component.html',
  styleUrls: ['./lista-beneficios.component.scss']
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
