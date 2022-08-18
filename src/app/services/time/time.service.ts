import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() {
  }

  public changeTimeZone(date: string, timeZone: string) {
    const time = new Date(date).toLocaleString('en-US', {timeZone});
    const localDate = this.convertUTCDateToLocalDate(new Date(time));
    return localDate.toLocaleString();
  }

  public now() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
  }

  public convertUTCDateToLocalDate(date: Date) {
    let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    let offset = date.getTimezoneOffset() / 60;
    let hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }
}
