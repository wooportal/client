import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from '@wooportal/core';
import { MatPagerIntl } from '@wooportal/forms';
import { RealmModule } from '../../realm/realm.module';
import { AdminComponent } from './admin.component';
import { AdminRouter } from './admin.router';
import { DeleteDialogComponent } from './dialogs/delete.dialog';
import { ReloginDialogComponent } from './dialogs/relogin.dialog';
import { RequestDialogComponent } from './dialogs/request.dialog';
import { AccountPanelComponent } from './panels/account/account.panel';
import { ApplicationPanelComponent } from './panels/application/application.panel';
import { OrganisationPanelComponent } from './panels/organisation/organisation.panel';
import { PositioningPanelComponent } from './panels/positioning/positioning.panel';
import { PrivilegesPanelComponent } from './panels/privileges/privileges.panel';

const dialogs: Type<any>[] = [
  DeleteDialogComponent,
  ReloginDialogComponent,
  RequestDialogComponent
];

const panels: Type<any>[] = [
  AccountPanelComponent,
  ApplicationPanelComponent,
  OrganisationPanelComponent,
  PositioningPanelComponent,
  PrivilegesPanelComponent
];

const materials: Type<any>[] = [
  FontAwesomeModule,
  MatBadgeModule,
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatListModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatTabsModule,
  ScrollingModule
];

@NgModule({
  entryComponents: [
    ...dialogs,
    ...panels
  ],
  declarations: [
    ...dialogs,
    ...panels,
    AdminComponent
  ],
  imports: [
    ...materials,
    AdminRouter,
    CommonModule,
    CoreModule,
    RealmModule
  ],
  providers: [
    { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } },
    { provide: MatPaginatorIntl, useClass: MatPagerIntl }
  ]
})

export class AdminModule { }
