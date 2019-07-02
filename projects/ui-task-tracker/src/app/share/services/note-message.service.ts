import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { NoteMessage } from '../classes/note-message.class';

@Injectable({
  providedIn: 'root'
})
export class NoteMessageService {

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  public handleError(error: NoteMessage): void {
    const { message, action, config } = error.setSnackBar();
    this.snackBar.open(message, action, config as MatSnackBarConfig);
  }

}
