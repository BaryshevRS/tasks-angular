export class NoteMessage {

  constructor(
    public message: string,
    public action: string
  ) {
  }

  setSnackBar() {
    return {
      message: this.message,
      action: this.action,
      config: { duration: 2000, verticalPosition: 'top' }
    };
  }

}
