import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, Type, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ActivityModel, CrudJoiner, MetatagService, PlatformProvider, ScheduleModel, SessionProvider } from '../../../../core';
import { MapsConnection } from '../../../maps/maps.connection';
import { BaseObject } from '../base.object';

@Component({
  styleUrls: ['../base.object.sass', 'activity.object.sass'],
  templateUrl: 'activity.object.html'
})

export class ActivityObjectComponent
  extends BaseObject<ActivityModel>
  implements OnInit, AfterViewInit {

  public dateFilter: (date: Date) => boolean = ((date: Date) => {
    return this.match(date) ? true : false;
  }).bind(this);

  public schedule: ScheduleModel;

  public source: SafeResourceUrl | string;

  protected joiner: CrudJoiner = CrudJoiner.of(ActivityModel, {
    required: true
  }).with('address').yield('suburb')
    .with('category')
    .with('images')
    .with('organisation').yield('address').yield('suburb')
    .with('organisation').yield('images')
    .with('provider')
    .with('schedules')
    .with('targetGroups');

  protected model: Type<ActivityModel> = ActivityModel;

  protected path: string = 'activities';

  private connection: MapsConnection;

  @ViewChild('frame', { read: ElementRef, static: false })
  private frame: ElementRef<HTMLIFrameElement>;

  public get startAt(): Date {
    return this.item.schedules.length
      ? this.item.schedules[0].start
      : new Date();
  }

  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;

  public constructor(
    private dateAdapter: DateAdapter<Date>,
    private sanitizer: DomSanitizer,
    private sessionProvider: SessionProvider,
    metatagService: MetatagService,
    platformProvider: PlatformProvider,
    route: ActivatedRoute,
    router: Router,
    private renderer: Renderer2
  ) {
    super(router, platformProvider, metatagService, route);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.dateAdapter.getFirstDayOfWeek = () => 1;
    this.dateAdapter.setLocale(this.sessionProvider.getLanguage());

    this.source = this.sanitizer.bypassSecurityTrustResourceUrl(
      ['android', 'ios'].includes(this.platformProvider.name)
        ? `#/mapview/${this.item.id}?embed=true`
        : `/mapview/${this.item.id}?embed=true`
    );
  }

  public ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  public click(event: Event): void {
    const cell = (event.target as HTMLElement).parentElement;

    if (cell.classList.contains('mat-calendar-body-disabled')) {
      this.schedule = null;
    }
  }

  public select(date: Date): void {
    this.schedule = this.match(date);
  }

  private match(date: Date): ScheduleModel {
    return this.item.schedules.find((schedule) =>
      !(schedule.start.setHours(0, 0, 0, 0).valueOf() - date.valueOf()));
  }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

}
