import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {

  constructor(private http: HttpClient) {}

  downloadPdf(payload: any) {
    return this.http.post('http://localhost:3000/generate-pdf', payload, {
      responseType: 'blob'
    });
  }
}
