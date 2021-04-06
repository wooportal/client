import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActivityModel, BloggerModel, Box, OrganisationModel, SessionProvider, SubscriptionProvider, TopicModel } from '../../../../core';
import { BasePiece } from '../base.piece';

@Component({
  selector: 'follow-piece',
  styleUrls: ['../base.piece.sass', 'follow.piece.sass'],
  templateUrl: 'follow.piece.html'
})

export class FollowPieceComponent
  extends BasePiece {

  public get disabled(): boolean {
    return this.sessionProvider.getSubscriptionId() === 'blocked';
  }

  public get followed(): boolean {
    return this.sessionProvider.getFollowed(this.item.id);
  }

  public constructor(
    private router: Router,
    private sessionProvider: SessionProvider,
    private subscriptionProvider: SubscriptionProvider
  ) {
    super();
  }

  public toggle(): void {
    if (!this.sessionProvider.getSubscriptionId()) {
      from(this.router.navigate(['/', 'notifications', 'register'])).pipe(
        filter((ok) => ok && this.router.url.startsWith('/notifications'))
      ).subscribe(() => this.follow());
    } else {
      this.followed ? this.unfollow() : this.follow();
    }
  }

  private follow(): void {
    (() => {
      switch (this.item.constructor) {
        case ActivityModel:
          return this.subscriptionProvider.linkActivity;

        case BloggerModel:
          return this.subscriptionProvider.linkBlogger;

        case OrganisationModel:
          return this.subscriptionProvider.linkOrganisation;

        case TopicModel:
          return this.subscriptionProvider.linkTopic;
      }
    })()(
      this.sessionProvider.getSubscriptionId(),
      Box(this.item.id)
    ).subscribe(() => {
      this.sessionProvider.setFollowed(this.item.id);
    });
  }

  private unfollow(): void {
    (() => {
      switch (this.item.constructor) {
        case ActivityModel:
          return this.subscriptionProvider.unlinkActivities;

        case BloggerModel:
          return this.subscriptionProvider.unlinkBloggers;

        case OrganisationModel:
          return this.subscriptionProvider.unlinkOrganisations;

        case TopicModel:
          return this.subscriptionProvider.unlinkTopics;
      }
    })()(
      this.sessionProvider.getSubscriptionId(),
      [this.item.id]
    ).subscribe(() => {
      this.sessionProvider.delFollowed(this.item.id);
    });
  }

}
