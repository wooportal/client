import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogpostProvider, RoutingComponent, TopicModel, TopicProvider } from '../../../core';

@Component({
  styleUrls: ['community.form.sass'],
  templateUrl: 'community.form.html'
})

export class CommunityFormComponent
  extends RoutingComponent {

  public topics: Observable<TopicModel[]>;

  protected get routing(): Route {
    return {
      path: 'blogpost'
    };
  }

  public constructor(
    private blogpostProvider: BlogpostProvider,
    private topicProvider: TopicProvider,
    private fb: FormBuilder
  ) {
    super();
  }

  public ngOnInit(): void {
    this.topics = this.topicProvider.readAll();
  }

}