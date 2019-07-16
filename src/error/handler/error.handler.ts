import { Location } from '@angular/common';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorBarComponent } from '../bar/error.bar';
import { ErrorDialogComponent } from '../dialog/error.dialog';
import { ErrorModel } from '../error.model';
import { ClientErrorHandler as Compat } from './error.handler.i';

@Injectable({ providedIn: 'root' })
export class ClientErrorHandler implements Compat, ErrorHandler {

  public constructor(
    private bar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private zone: NgZone
  ) { }

  public handleError(error: any): void {
    console.error('ClientErrorHandler.handleError', error);
    this.throwError(ErrorModel.from(error));
  }

  public throwError(reason: ErrorModel): any {
    reason.path = this.location.path(true) || '/';

    if (!reason.ignored) {
      this.zone.run(() => !reason.breaking
        ? this.bar.openFromComponent(ErrorBarComponent, { data: reason })
        : this.dialog.open(ErrorDialogComponent, { data: reason })
          .afterClosed().subscribe(() => location.reload()));
    }
  }

}