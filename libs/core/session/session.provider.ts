import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CoreSettings } from '../utils/settings';
import { SessionModel } from './session.model';

@Injectable({ providedIn: 'root' })
export class SessionProvider {

  private session: BehaviorSubject<SessionModel>;

  public get value(): Observable<SessionModel> {
    return this.session.pipe(filter(Boolean));
  }

  public constructor(
    coreSettings: CoreSettings,
    localStorage: LocalStorage
  ) {
    const start = new SessionModel();
    start.language = coreSettings.language;
    this.session = new BehaviorSubject(start);

    localStorage.getItem<SessionModel>('clientSession', {
      schema: SessionModel.schema
    }).pipe(
      map((session: SessionModel) => session || this.session.value),
      tap((session: SessionModel) => this.session.next(session))
    ).subscribe(() => this.value.subscribe((session) =>
      localStorage.setItemSubscribe('clientSession', session)));
  }

  public like(id: string): void {
    if (!this.isLiked(id)) {
      this.session.next(Object.assign(this.session.value, {
        likes: this.session.value.likes.concat(id)
      }));
    }
  }

  public isLiked(id: string): boolean {
    return this.session.value.likes.includes(id);
  }

  public changeLanguage(language: string): void {
    this.session.next(Object.assign(this.session.value, {
      language: language
    }));
  }

  public acceptCookies(acceptCookies: boolean): void {
    this.session.next(Object.assign(this.session.value, {
      acceptCookies: acceptCookies
    }));
  }


}
