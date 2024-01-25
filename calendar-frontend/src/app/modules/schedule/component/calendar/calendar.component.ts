import { ChangeDetectionStrategy, Component } from '@angular/core';
import moment from 'moment';

@Component({
    selector: 'app-calendar',
    templateUrl: `./calendar.component.html`,
    styleUrl: './calendar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
    currentDate!: moment.Moment;
    daysOfWeek: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    calendarDays: { day: number; date: moment.Moment }[] = [];
    selectedDate!: moment.Moment;

    ngOnInit(): void {
        this.currentDate = moment();
        this.generateCalendar();
    }

    generateCalendar(): void {
        const startOfMonth = this.currentDate.clone().startOf('month');
        const endOfMonth = this.currentDate.clone().endOf('month');

        const startOfWeek = startOfMonth.clone().startOf('week');
        const endOfWeek = endOfMonth.clone().endOf('week');

        const calendarDays: { day: number; date: moment.Moment }[] = [];

        let currentDay = startOfWeek.clone();

        while (currentDay.isSameOrBefore(endOfWeek, 'day')) {
            calendarDays.push({
                day: currentDay.date(),
                date: currentDay.clone()
            });

            currentDay.add(1, 'day');
        }

        this.calendarDays = calendarDays;
    }

    previousMonth(): void {
        this.currentDate.subtract(1, 'month');
        this.generateCalendar();
    }

    nextMonth(): void {
        this.currentDate.add(1, 'month');
        this.generateCalendar();
    }

    selectDate(day: { day: number; date: moment.Moment }): void {
        this.selectedDate = day.date;
    }

    get monthYear(): string {
        return this.currentDate.format('MMMM YYYY');
    }
}
