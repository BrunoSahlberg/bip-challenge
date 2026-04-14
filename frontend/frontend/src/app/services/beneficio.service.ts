import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Beneficio } from '../models/beneficio.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {
  private apiUrl = 'http://localhost:8080/api/v1/beneficios';

  constructor(private http: HttpClient) { }

  // Listar todos os benefícios
  listarBeneficios(): Observable<Beneficio[]> {
    return this.http.get<Beneficio[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Obter benefício por ID
  obterBeneficio(id: number): Observable<Beneficio> {
    return this.http.get<Beneficio>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Criar novo benefício
  criarBeneficio(beneficio: Beneficio): Observable<Beneficio> {
    return this.http.post<Beneficio>(this.apiUrl, beneficio)
      .pipe(catchError(this.handleError));
  }

  // Atualizar benefício
  atualizarBeneficio(id: number, beneficio: Beneficio): Observable<Beneficio> {
    return this.http.put<Beneficio>(`${this.apiUrl}/${id}`, beneficio)
      .pipe(catchError(this.handleError));
  }

  // Deletar benefício
  deletarBeneficio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Transferir valores entre benefícios
  transferir(fromId: number, toId: number, amount: number): Observable<string> {
    const params = `fromId=${fromId}&toId=${toId}&amount=${amount}`;
    return this.http.post<string>(`${this.apiUrl}/transfer?${params}`, {})
      .pipe(catchError(this.handleError));
  }

  // Tratamento de erros
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido!';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado servidor
      if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.status) {
        errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }

    console.error('Erro na API:', error);
    return throwError(() => new Error(errorMessage));
  }
}
