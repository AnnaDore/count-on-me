import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { GeneratePdfService } from '../../shared/services/generate-pdf.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  imports: [FormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  constructor(private generatePdfService: GeneratePdfService) {}
  nameInput: any = '';
  amountInput: any = '';
  monthInput: any = '';
  payload: any;

  generatePdf() {
    this.payload = {
      name: this.nameInput,
      amount: this.amountInput,
      monthInput: this.monthInput,
      monthPrice: this.amountInput * 20
    }
    this.generatePdfService.downloadPdf(this.payload).subscribe({
      next: (blob) => {
        console.log(blob),
          this.downloadBlob(blob, `${this.payload.name || 'report'}.pdf`)
      },
      error: (err) => {
        console.error('PDF generation request failed', err);
        alert('Failed to generate PDF (see console).');
      }
    });
  }

  private downloadBlob(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }
}
