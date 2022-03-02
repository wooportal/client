import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LabelModule } from '../../core';
import { PartsModule } from '../parts/module';
import { CommunityComponent } from './community/community.component';
import { CommunityFormComponent } from './community/community.form';
import { CommunityListingComponent } from './community/community.listing';
import { FileUploadComponent } from './community/file-upload/file-upload.component';
import { EventsComponent } from './events/events.component';
import { EventsListingComponent } from './events/events.listing';
import { FavoritesListingComponent } from './favorites/favorites.listing';
import { IndexComponent } from './index/index.component';
import { MapComponent } from './map/map.component';
import { PortalComponent } from './portal.component';
import { PortalRouter } from './portal.router';
import { SitemapComponent } from './sitemap/sitemap.component';
import { StaticPageComponent } from './static-page/static-page.component';

const components: Type<any>[] = [
  CommunityComponent,
  CommunityFormComponent,
  CommunityListingComponent,
  EventsComponent,
  EventsListingComponent,
  FavoritesListingComponent,
  FileUploadComponent,
  MapComponent,
  IndexComponent,
  PortalComponent,
  SitemapComponent,
  StaticPageComponent
];

const materials: Type<any>[] = [
  CKEditorModule,
  FontAwesomeModule,
  LabelModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  PartsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [
    ...components
  ],
  entryComponents: [
    ...components
  ],
  imports: [
    ...materials,
    CommonModule,
    PortalRouter
  ]
})

export class PortalModule { }
