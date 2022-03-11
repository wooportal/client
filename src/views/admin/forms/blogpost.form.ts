import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { BlogpostModel, BlogpostProvider, Box, CoreSettings, TokenProvider, TopicModel, TranslationProvider } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { EditorFieldComponent } from '../fields/editor.field';
import { ImageFieldComponent } from '../fields/image.field';
import { InputFieldComponent } from '../fields/input.field';
import { SelectFieldComponent } from '../fields/select.field';

@Component({
  selector: 'blogpost-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'content'">
          <i18n>content</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'title'">
          <i18n>title</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'titleImage'">
          <i18n>titleImage</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'topic'">
          <i18n>topic</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `,`
  <ng-container *ngIf="superuser | async">
    <ng-container *ngSwitchCase="'author'">
      <i18n>author</i18n>
    </ng-container>
  </ng-container>
`)
})

export class BlogpostFormComponent
  extends BaseForm<BlogpostModel> {

  public fields: FormField[] = [
    {
      name: 'author',
      input: InputFieldComponent,
      locked: true
    },
    {
      name: 'title',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'topic',
      input: SelectFieldComponent,
      label: 'name',
      model: TopicModel,
      tests: [Validators.required]
    },
    {
      name: 'content',
      input: EditorFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'titleImage',
      input: ImageFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<BlogpostModel> = BlogpostModel;

  public get author(): string {
    return this.item.author;
  }


  public get superuser(): Observable<boolean> {
    return this.tokenProvider.value.pipe(map((t) => t.access.superuser));
  }

  public constructor(
    private blogpostProvider: BlogpostProvider,
    route: ActivatedRoute,
    private settings: CoreSettings,
    tokenProvider: TokenProvider,
    translationProvider: TranslationProvider
  ) {
    super(route, tokenProvider, translationProvider);
  }

  public persist(): Observable<any> {
    this.item.topicId = this.group.get('topic').value.id;

    return super.persist().pipe(
      mergeMap((item) => this.tokenProvider.refresh().pipe(map(() => item)))
    );
    //return this.superuser.pipe(take(1), mergeMap((su) => super.persist(!su)));

  }

  // public ngPostInit(): void {
  //   console.log(this.author);
  //   if(this.superuser) {
  //     this.group.controls['author'].enable();
  //   }
  // }

  protected ngPostInit(): void {

    if(this.superuser){
      Object.assign(this.fields.find((field) => field.name === 'author'), {
        locked: false,
        value: this.author
      });
    } else {
      Object.assign(this.fields.find((field) => field.name === 'author'), {
        locked: true,
        value: this.author
      });
    }

  }

  protected cascade(item: BlogpostModel): Observable<any> {
    const links = [];

    const image = this.group.get('titleImage').value;
    links.push(this.blogpostProvider.pasteImage(item.id, image));

    const images = this.updated('images');
    if (images.add.length) { links.push(this.blogpostProvider
      .pasteImages(item.id, images.add)); }
    if (images.del.length) { links.push(this.blogpostProvider
      .unlinkImages(item.id, images.del.map((i) => i.id))); }

    if (this.item.id) {
      const tId = this.item.topic && this.item.topic.id;
      if (tId !== this.item.topicId) { links.push(this.blogpostProvider
        .relinkTopic(item.id, Box(this.item.topicId))); }
    }

    return forkJoin([super.cascade(item), ...links]).pipe(map((i) => i[0]));
  }

  public fillUserData(){
    // this.blogpostProvider.readOne(this.token.id).subscribe((user) => {
    //   this.group.get('contactName').patchValue(user.name);
    //   this.group.get('mail').patchValue(user.username);
    //   this.group.get('phone').patchValue(user.phone);
    // });
  }

}
