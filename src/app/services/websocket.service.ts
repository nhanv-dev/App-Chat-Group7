import {Injectable} from "@angular/core";
import * as Rx from 'rxjs';
import {AnonymousSubject} from "rxjs/internal/Subject";
import {Observer} from "rxjs";

@Injectable()
export class WebsocketService {
  public subject: AnonymousSubject<MessageEvent> | undefined;

  constructor() {
  }

  public connect(url: string): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url: string): AnonymousSubject<MessageEvent> {
    const ws = new WebSocket(url);
    const observable = new Rx.Observable((obs: Rx.Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    const observer: Observer<MessageEvent<any>> = {
      error: (err) => {
        this.subject?.unsubscribe();
      },
      complete: () => {
        this.subject?.unsubscribe();
      },
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(data));
      }
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }

  public close() {
    this.subject?.unsubscribe();
  }
}
