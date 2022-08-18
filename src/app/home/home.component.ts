import {AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
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

  async subscribe() {
    this.chatService.messages.subscribe(async (message) => {
      const {event, status, data} = message;
      console.log('Response from server: ', message)
      if (event === 'AUTH' && status === 'error' && message.mes === 'User not Login') {
        const token = this.authenticationService.getToken();
        if (token) {
          await this.chatService.reLogin(token);
        } else {
          this.authenticationService.removeToken();
          await this.router.navigateByUrl('/login')
        }
      } else if (event === environment.event.RE_LOGIN) {
        await this.handleReLogin(message);
      } else if (event === environment.event.SEND_CHAT) {
        await this.receiveChat(message);
      } else if (event === environment.event.GET_USER_LIST) {
        await this.connectRooms(message);
      } else if (event === environment.event.GET_PEOPLE_CHAT_MES) {
        await this.convertResponseToPeopleChat(message);
      } else if (event === environment.event.GET_ROOM_CHAT_MES) {
        await this.convertResponseToGroupChat(message);
      } else if (event === environment.event.CREATE_ROOM) {
        await this.handleCreateRoom(message);
      } else if (event === environment.event.JOIN_ROOM) {
        await this.handleJoinRoom(message);
      } else {
        if (this.ready) clearInterval(this.ready);
      }
    });
  }

  async connectRooms(message: any) {
    if (message.status !== 'success' || !message.data) return;
    this.rooms = message.data.map((room: any) => {
      const name: any = room.name;
      const type: string = room.type === 0 ? 'people' : 'room';
      const item: Room = {name, type, messages: []}
      return item;
    });
    this.rooms.forEach((room: Room) => this.getMessages(room.name, 1, room.type))
    this.activeRoom = this.rooms[0]
  }

  async getMessages(name: string, page: number, type: string) {
    if (type === 'people') this.chatService.getPeopleMessage(name, page);
    else if (type === 'room') this.chatService.getRoomMessage(name, page);
  }

  async convertResponseToPeopleChat(message: any) {
    if (message.status !== 'success') return;
    const response = message.data[0];
    if (response) {
      for (const room of this.rooms) {
        const condition1 = room.name === response.name || room.name === response.to;
        const condition2 = this.user?.name === response.name || this.user?.name === response.to;
        if (condition1 && condition2 && this.user?.name !== room.name && room.type === 'people') {
          room.messages = message.data.filter((message: any) => {
            if (message.mes) {
              message.createAt = this.timeService.changeTimeZone(message.createAt, "Asia/Ho_Chi_Minh");
              return message;
            }
          }).reverse();
          break;
        }
      }
    }
  }

  async convertResponseToGroupChat(message: any) {
    if (message.status !== 'success') return;
    const messages = message.data.chatData;
    if (messages && messages.length > 0) {
      for (const room of this.rooms) {
        if (room.name === messages[0].to && room.type === 'room') {
          room.messages = messages.filter((message: any) => {
            if (message.mes) {
              message.createAt = this.timeService.changeTimeZone(message.createAt, "Asia/Ho_Chi_Minh");
              return message;
            }
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

  async addPeople(name: string) {
    console.log('home', name);
    this.chatService.joinRoom(name);
  }

  async joinRoom(name: string) {
    console.log('home', name);
    this.chatService.joinRoom(name);
  }

  async handleJoinRoom(message: any) {

  }

  async createRoom(name: string) {
    console.log('home', name);
    this.chatService.createRoom(name);
  }

  async handleCreateRoom(message: any) {

  }

  async sendChat(message: string) {
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

  async receiveChat(message: any) {
    if (message.status === 'success') {
      const data = message.data;
      data.createAt = this.timeService.changeTimeZone(data.createAt, 'Asia/Ho_Chi_Minh');
      for (const room of this.rooms) {
        if (room.name === data.to) {
          room.messages.push(data);
          break;
        }
      }
    }
  }

  async searchChat(searching: string) {
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
