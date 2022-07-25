import {Injectable, OnInit} from "@angular/core";
import * as Rx from 'rxjs';
import {AnonymousSubject} from "rxjs/internal/Subject";
import {webSocket} from 'rxjs/webSocket';
import {environment} from "../../environments/environment";

// @ts-ignore
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
    const observer = {
      error: null,
      complete: null,
      next: (data: Object) => {
        // console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(data));
      }
    };

    // @ts-ignore
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
