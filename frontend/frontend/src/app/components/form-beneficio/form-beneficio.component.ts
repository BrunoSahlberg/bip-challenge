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
  templateUrl: './form-beneficio.component.html',
  styleUrls: ['./form-beneficio.component.scss']
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
