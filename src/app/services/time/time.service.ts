import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  public timeZone: string = "Asia/Ho_Chi_Minh";

  constructor() {
  }

  public changeTimeZone(date: string) {
    return new Date(new Date(date).toLocaleString('en-US', {timeZone: this.timeZone}))

  }

  public now() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
  }
}
