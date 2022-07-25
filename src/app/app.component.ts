//src\app\app.component.ts
import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "./services/websocket.service";
import {ChatService} from "./services/chat.service";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [WebsocketService, ChatService, AuthenticationService]
})

export class AppComponent implements OnInit {
  public title = 'App Chat';

  constructor() {

  }

  ngOnInit() {
  }
}
