import { Component, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import ptLocale from '@fullcalendar/core/locales/pt';
import { AlertModalServiceService } from '../../components/modal/modal-service.service';
import { FormGroup } from '@angular/forms';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { EventServiceService } from 'src/app/services/event-service.service';
import { IEvent } from 'src/app/models/event';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
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
    initialEvents: this.handleGetEvents.bind(this),
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    displayEventEnd: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
    eventsSet: this.handleEvents.bind(this),
    contentHeight: 'auto',
  });
  currentEvents: EventApi[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private alertService: AlertModalServiceService,
    private eventService: EventServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.handleGetEvents();
  }

  // Obtendo eventos do serviço
  async handleGetEvents() {
    const events = await this.eventService.getAllEvents();

    // Mapeando os eventos e renomeando a propriedade 'description' para 'title'
    const eventsWithTitle = events.map((event) => ({
      ...event,
      title: event.description,
      description: undefined,
    }));

    return eventsWithTitle;
  }

  // Alternar a visibilidade do calendário
  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  async handleEventDrop(info: { event: EventApi }) {
    // Adicionar evento ao calendário e banco de dados
    const event = {
      id: info.event.id,
      description: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      _userId: '',
    };

    await this.handleEditEvent(event);
  }

  // Lidar com a seleção de datas no calendário
  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // Limpar seleção de data]

    // Exibir modal para criar evento
    const resutl$ = this.alertService.ShowCreateEvent({
      start: selectInfo.start.toLocaleDateString(),
      end: selectInfo.end.toLocaleDateString(),
    });

    // Assinar resultados do modal
    resutl$.asObservable().subscribe(async (form: FormGroup) => {
      // Adicionar evento ao calendário ebanco de dados
      const event: IEvent = {
        description: form.value.description,
        start: this.formatDate(selectInfo.startStr, form.value.start, false),
        end: this.formatDate(
          selectInfo.endStr,
          form.value.end,
          selectInfo.allDay
        ),
        _userId: '',
      };

      const result = await this.eventService.createEvent(event);

      if (result && typeof result !== 'string') {
        calendarApi.addEvent({
          id: result.id,
          title: result.description,
          start: result.start,
          end: result.end,
        });
        this.showSuccess('Sucesso', 'Evento adicionado a agenda!');
      } else if (result == 'erro 422') {
        this.showError('Falha ao criar', 'Já existe um evento nesse horario!');
      }
    });
  }

  showSuccess(title: string, message: string) {
    this.toastr.success(message, title);
  }

  showError(title: string, message: string) {
    this.toastr.error(message, title);
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

  //Método para converter Date para string
  convertToHourString(hour: Date) {
    return `${hour?.getHours().toLocaleString().padStart(2, '0')}:${hour
      ?.getMinutes()
      .toLocaleString()
      .padStart(2, '0')}`;
  }

  // Função para formatar a data
  formatDateString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // Lidar com o clique em eventos no calendário e abre o modal apra edição ou exclusão!
  handleEventClick(clickInfo: EventClickArg) {
    const eventTitle = clickInfo.event.title;
    const eventStart = this.formatDateString(clickInfo.event.start!);
    const eventEnd = this.formatDateString(clickInfo.event.end!);
    const id = clickInfo.event.id;

    // Chama modal para edição.
    const resutl$ = this.alertService.ShowEditEvent(
      eventTitle,
      this.convertToHourString(clickInfo.event.start!),
      this.convertToHourString(clickInfo.event.end!),
      id,
      {
        start: clickInfo.event.start!.toLocaleDateString(),
        end: clickInfo.event.end!.toLocaleDateString(),
      }
    );

    // Assinar resultados do modal
    resutl$.asObservable().subscribe(async (form: FormGroup) => {
      let event: IEvent;
      // Adicionar evento ao calendário ebanco de dados
      if (eventStart && eventEnd) {
        event = {
          id: id,
          description: form.value.description,
          start: this.formatDate(eventStart, form.value.start, false),
          end: this.formatDate(eventEnd, form.value.end, false),
          _userId: '',
        };
      }

      this.handleEditEvent(event!);
    });
  }

  //Métodi para editar o evento!
  async handleEditEvent(event: IEvent) {
    //Chama o serviço para atualizar o evento e verifica se retornou sucesso ou erro
    const result = await this.eventService.patchEvent(event);
    if (result && typeof result !== 'string') {
      this.showSuccess('Sucesso', 'Evento atualizado na agenda!');
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else if (result == 'error 422') {
      this.showError(
        'Falha ao atualizar',
        'Já existe um evento nesse horario!'
      );
    }
  }

  // Lidar com a atualização de eventos no calendário
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}
