import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ErrorMessage } from '../classes/errors.class';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  public handleError(error: ErrorMessage): void {
    const { message, action, config } = error.setSnackBar();
    this.snackBar.open(message, action, config as MatSnackBarConfig);
  }
}
