import { Component, model, signal } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatCalendar } from '@angular/material/datepicker';
import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-calendar',
  imports: [MatDatepickerModule, MatCardModule, MatCalendar],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  selected = model<Date | null>(null);
  showLessonDate = signal<any>('');

  chooseLessonDate() {
    console.log(typeof(this.selected()));
    
    this.showLessonDate.set(this.selected());
  }
}
