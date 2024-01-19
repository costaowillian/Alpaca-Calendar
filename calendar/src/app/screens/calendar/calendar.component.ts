import { Component, signal, ChangeDetectorRef } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import ptLocale from '@fullcalendar/core/locales/pt';
import { AlertModalServiceService } from '../../components/modal/modal-service.service';
import { FormGroup } from '@angular/forms';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  calendarVisible = signal(true);

  // Opções de configuração para o FullCalendar
  calendarOptions = signal<CalendarOptions>({
    locales: [ptLocale],
    locale: 'pt',
    plugins: [interactionPlugin, dayGridPlugin, listPlugin, bootstrap5Plugin],
    themeSystem: 'bootstrap5',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    contentHeight: 'auto',
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(
    private changeDetector: ChangeDetectorRef,
    private alertService: AlertModalServiceService
  ) {}

  // Alternar a visibilidade do calendário
  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  // Alternar a visibilidade dos fins de semana
  handleWeekendsToggle() {
    this.calendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }

  // Lidar com a seleção de datas no calendário
  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // Limpar seleção de data

    // Exibir modal para criar evento
    const resutl$ = this.alertService.ShowCreateEvent();
    console.log(selectInfo.allDay);

    // Assinar resultados do modal
    resutl$.asObservable().subscribe((form: FormGroup) => {
      // Formatar datas e horas para o formato desejado
      const start = this.formatDate(
        selectInfo.startStr,
        form.value.start,
        false
      );
      const end = this.formatDate(
        selectInfo.endStr,
        form.value.end,
        selectInfo.allDay
      );

      // Adicionar evento ao calendário
      const title = form.value.description;
      const color = form.value.color;
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: start,
        end: end,
        allDay: false,
        backgroundColor: color,
      });
    });
  }

  // Formatar data e hora para o formato desejado
  formatDate(date: string, newHour: string, isAllDay: boolean): string {
    if (isAllDay) {
      let [year, mouth, day] = date.split('-');
      day = String(parseInt(day, 10) - 1);
      const newDate = `${year}-${String(mouth).padStart(2, '0')}-${String(
        day
      ).padStart(2, '0')}T${newHour}:00-03:00`;

      return newDate;
    }

    const [year, mouth, day] = date.split('-');
    const newDate = `${year}-${String(mouth).padStart(2, '0')}-${String(
      day
    ).padStart(2, '0')}T${newHour}:00-03:00`;

    return newDate;
  }

  // handleEventClick(clickInfo: EventClickArg) {
  //   if (
  //     confirm(
  //       `Are you sure you want to delete the event '${clickInfo.event.title}'`
  //     )
  //   ) {
  //     clickInfo.event.remove();
  //   }
  // }

  // Lidar com o clique em eventos no calendário
  handleEventClick(clickInfo: EventClickArg) {
    const eventTitle = clickInfo.event.title;
    const eventStart = clickInfo.event.start;
    const eventEnd = clickInfo.event.end;

    alert(`Event Title: ${eventTitle}\nStart: ${eventStart}\nEnd: ${eventEnd}`);
  }

  // Lidar com a atualização de eventos no calendário
  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
