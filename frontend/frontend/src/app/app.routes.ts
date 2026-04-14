import { Routes } from '@angular/router';
import { ListaBeneficiosComponent } from './components/lista-beneficios/lista-beneficios.component';
import { FormBeneficioComponent } from './components/form-beneficio/form-beneficio.component';
import { TransferenciaComponent } from './components/transferencia/transferencia.component';

export const routes: Routes = [
  { path: '', redirectTo: '/beneficios', pathMatch: 'full' },
  { path: 'beneficios', component: ListaBeneficiosComponent },
  { path: 'beneficios/novo', component: FormBeneficioComponent },
  { path: 'beneficios/editar/:id', component: FormBeneficioComponent },
  { path: 'beneficios/transferir/:id', component: TransferenciaComponent },
  { path: '**', redirectTo: '/beneficios' }
];
