import {Component, OnInit} from '@angular/core';
import {ChatService, Message, Room, User} from "../services/chat.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public user: User | undefined;
  public rooms: Room[] = [];
  public activeRoom: Room = {name: '', type: '', messages: []};
  public page: number = 1;
  private ready: any;

  constructor(private chatService: ChatService, private authenticationService: AuthenticationService, private router: Router) {
    this.subscribe();
  }

  ngOnInit(): void {
    const token: any = this.authenticationService.getToken()
    if (token && !this.authenticationService.isUserAuthenticated) {
      clearInterval(this.ready)
      this.ready = setInterval(() => this.chatService.reLogin(token), 500);
    }
    this.chatService.getUserList();
    this.user = {name: token.user, type: 'people'};
  }

  private subscribe() {
    this.chatService.messages.subscribe(async (message) => {
      const {event, status, data} = message;
      if (event === 'AUTH' && status === 'error' && data.mes === 'User not Login') {
        this.chatService.reLogin(this.authenticationService.getToken());
      } else if (event === environment.event.RE_LOGIN) {
        this.handleReLogin(message);
      } else if (event === environment.event.SEND_CHAT && status === 'success') {
        await this.handleSendChat(data);
      } else if (event === environment.event.GET_USER_LIST && status === 'success') {
        await this.setUsers(data);
      } else if (event === environment.event.GET_PEOPLE_CHAT_MES && status === 'success') {
        await this.convertResponseToPeopleChat(message);
      } else if (event === environment.event.GET_ROOM_CHAT_MES && status === 'success') {
        await this.convertResponseToGroupChat(message);
      } else {
        if (this.ready) clearInterval(this.ready);
      }
    });
  }


  async setUsers(data: Room[]) {
    // @ts-ignore
    this.rooms = data?.map((room) => {
      if (room) {
        const name: any = room.name;
        const type: string = room.type === 0 ? 'people' : 'room';
        return {name, type, messages: []};
      }
    });
    this.rooms.forEach(room => {
      if (room) this.getMessages(room.name, 1, room.type);
    })
    this.activeRoom = this.rooms[1];
  }

  getMessages(name: string, page: number, type: string) {
    if (type === 'people') this.chatService.getPeopleMessage(name, page);
    else if (type === 'room') this.chatService.getRoomMessage(name, page);
  }


  async convertResponseToPeopleChat(message: any) {
    const response = message.data[0];
    for (const room of this.rooms) {
      const condition1 = room.name === response.name || room.name === response.to;
      const condition2 = this.user?.name === response.name || this.user?.name === response.to;
      if (condition1 && condition2 && this.user?.name !== room.name && room.type === 'people') {
        // @ts-ignore
        room.messages = message.data.map((item: Message) => {
          if (item.mes) return item;
        }).reverse();
        break;
      }
    }
  }


  async convertResponseToGroupChat(message: any) {
    const messages = message.data.chatData;
    if (messages && messages.length > 0) {
      for (const room of this.rooms) {
        if (room.name === messages[0].to && room.type === 'room') {
          room.messages = messages.reverse();
          console.log(room);
          break;
        }
      }
    }
  }

  async changeRoom(room: Room) {
    this.activeRoom = room;
    this.page = 1;
    this.getMessages(this.activeRoom.name, this.page, this.activeRoom.type);
  }

  async sendChat(message: any) {
    this.chatService.sendChat({});
  }

  async handleSendChat(data: any) {

  }

  handleReLogin(message: any) {
    if (message.status === 'success') {
      const data = {user: this.authenticationService.getToken()?.user, code: message.data.RE_LOGIN_CODE};
      this.authenticationService.setToken(JSON.stringify(data));
      this.chatService.getUserList();
    } else {
      this.handleLogout();
    }
    clearInterval(this.ready);
  }

  handleLogout() {
    this.authenticationService.removeToken();
    this.chatService.logout();
    this.router.navigateByUrl('/login').then(() => {
      this.chatService.messages.complete();
    });
  }
}
