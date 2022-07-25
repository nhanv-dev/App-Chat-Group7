import {Injectable, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import * as Rx from 'rxjs';
import {WebsocketService} from "./websocket.service";
import {AnonymousSubject} from "rxjs/internal/Subject";


@Injectable({providedIn: 'root'})
export class ChatService {
  messages: AnonymousSubject<any>;

  constructor(private wsService: WebsocketService) {
    this.messages = <AnonymousSubject<any>>this.wsService.connect(environment.CHAT_URL).pipe(
      Rx.map((response: MessageEvent): any => JSON.parse(response.data))
    );
  }


  async login(data: any) {
    const {user, pass} = data;
    const message = {action: environment.action, data: {event: environment.event.LOGIN, data: {user, pass}}};
    await this.messages.next(message);
  }


  async reLogin(data: any) {
    const {user, code} = data;
    if (user && code) {
      const message = {action: environment.action, data: {event: environment.event.RE_LOGIN, data: {user, code}}};
      await this.messages.next(message);
    }
  }

  async logout() {
    const message = {action: environment.action, data: {event: environment.event.LOGOUT}}
    this.messages.next(message);
  }

  async register(data: any) {
    const {user, pass} = data;
    const message = {action: environment.action, data: {event: environment.event.REGISTER, data: {user, pass}}};
    await this.messages.next(message);
  }

  async sendChat(data: any) {
    const {type, to, mes} = data;
    const message = {action: environment.action, data: {event: environment.event.SEND_CHAT, data: {type, to, mes}}};
    await this.messages.next(message);
  }

  async createRoom(name: string) {
    const message = {action: environment.action, data: {event: environment.event.CREATE_ROOM, data: {name}}};
    await this.messages.next(message);
  }

  async getRoomMessage(name: string, page: number) {
    const message = {action: environment.action, data: {event: environment.event.GET_ROOM_CHAT_MES, data: {name, page}}}
    await this.messages.next(message);
  }

  async joinRoom(name: string) {
    const message = {action: environment.action, data: {event: environment.event.JOIN_ROOM, data: {name}}}
    await this.messages.next(message);
  }

  async getPeopleMessage(name: string, page: number) {
    const message = {
      action: environment.action,
      data: {event: environment.event.GET_PEOPLE_CHAT_MES, data: {name, page}}
    }
    await this.messages.next(message);
  }

  async checkUser(data: any) {
    const {user} = data;
    const message = {action: environment.action, data: {event: environment.event.CHECK_USER, data: {user}}}
    await this.messages.next(message);
  }

  async getUserList() {
    const message = {action: environment.action, data: {event: environment.event.GET_USER_LIST}};
    await this.messages.next(message);
  }
}
