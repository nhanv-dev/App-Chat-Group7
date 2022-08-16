import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService, Message, Room, User} from "../services/chat/chat.service";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {TimeService} from "../services/time/time.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user: User | undefined;
  rooms: Room[] = [];
  activeRoom: Room = {name: '', type: '', messages: []};
  page: number = 1;
  searching: string = '';
  ready: any = false;
  @ViewChild('sidebar') sidebar: any;

  constructor(
    private chatService: ChatService,
    private authenticationService: AuthenticationService,
    private timeService: TimeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscribe().then(async () => {
      const token: any = this.authenticationService.getToken()
      if (!token) {
        await this.handleLogout()
      } else {
        if (AuthenticationService.isAuthenticated) {
          this.user = {name: token.user, type: 'people'};
          this.chatService.getUserList();
        } else {
          this.ready = setInterval(() => this.chatService.reLogin(token), 300);
        }
      }
    });
  }

  private async subscribe() {
    this.chatService.messages.subscribe(async (message) => {
      const {event, status, data} = message;
      console.log('Response from server: ', message)
      if (event === 'AUTH' && status === 'error' && data.mes === 'User not Login') {
        await this.chatService.reLogin(this.authenticationService.getToken());
      } else if (event === environment.event.RE_LOGIN) {
        await this.handleReLogin(message);
      } else if (event === environment.event.SEND_CHAT) {
        await this.handleSendChat(message);
      } else if (event === environment.event.GET_USER_LIST && status === 'success') {
        await this.connectRooms(data);
      } else if (event === environment.event.GET_PEOPLE_CHAT_MES && status === 'success') {
        await this.convertResponseToPeopleChat(message);
      } else if (event === environment.event.GET_ROOM_CHAT_MES && status === 'success') {
        await this.convertResponseToGroupChat(message);
      } else {
        if (this.ready) clearInterval(this.ready);
      }
    });
  }

  async connectRooms(data: Room[]) {
    if (!data) return;
    this.rooms = data.map((room: any) => {
      const name: any = room.name;
      const type: string = room.type === 0 ? 'people' : 'room';
      const item: Room = {name, type, messages: []}
      return item;
    });
    this.rooms.forEach((room: Room) => {
      this.getMessages(room.name, 1, room.type);
    })
    this.activeRoom = this.rooms[0]
  }

  getMessages(name: string, page: number, type: string) {
    if (type === 'people') this.chatService.getPeopleMessage(name, page);
    else if (type === 'room') this.chatService.getRoomMessage(name, page);
  }

  async convertResponseToPeopleChat(message: any) {
    const response = message.data[0];
    if (response) {
      for (const room of this.rooms) {
        const condition1 = room.name === response.name || room.name === response.to;
        const condition2 = this.user?.name === response.name || this.user?.name === response.to;
        if (condition1 && condition2 && this.user?.name !== room.name && room.type === 'people') {
          room.messages = (message.data.map((item: any) => {
            if (item.mes) {
              item.createAt = this.timeService.changeTimeZone(item.createAt);
              return item;
            }
          }).reverse());
          break;
        }
      }
    }
  }

  async convertResponseToGroupChat(message: any) {
    const messages = message.data.chatData;
    if (messages && messages.length > 0) {
      for (const room of this.rooms) {
        if (room.name === messages[0].to && room.type === 'room') {
          room.messages = messages.map((message: any) => {
            message.createAt = this.timeService.changeTimeZone(message.createAt);
            return message;
          }).reverse();
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

  async sendChat(message: string) {
    console.log('Send message')
    const data: Message = {
      id: 0,
      name: this.user?.name,
      mes: message,
      to: this.activeRoom.name,
      type: this.activeRoom.type === 'people' ? 0 : 1,
      createAt: this.timeService.now(),
    };
    this.activeRoom.messages.push(data);
    this.rooms = this.rooms.filter(room => room != this.activeRoom);
    this.rooms.unshift(this.activeRoom);
    this.chatService.sendChat({type: this.activeRoom.type, to: this.activeRoom.name, mes: data.mes});
  }

  async handleSendChat(message: any) {
    console.log('Receive message')
    if (message.status === 'success') {
      const data = message.data;
      data.createAt = this.timeService.now();
      console.log(data)
      for (const room of this.rooms) {
        if (room.name === data.name) {
          room.messages.push(data);
          break;
        }
      }
    }
  }

  searchChat(searching: string) {
    this.searching = searching;
  }

  async handleReLogin(message: any) {
    if (message.status === 'success') {
      const token = this.authenticationService.getToken();
      this.authenticationService.setToken(JSON.stringify({...token, code: message.data.RE_LOGIN_CODE}));
      this.user = {name: token.user, type: 'people'};
      this.chatService.getUserList();
    } else {
      await this.handleLogout();
    }
    clearInterval(this.ready);
  }

  async handleLogout() {
    this.authenticationService.removeToken();
    this.chatService.logout();
    await this.router.navigateByUrl('/login')
  }
}
