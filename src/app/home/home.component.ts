import {Component, OnInit} from '@angular/core';
import {ChatService} from "../services/chat.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {FormControl, FormGroup} from "@angular/forms";

export interface User {
  name: any,
  type: any,
}

export interface Message {
  id: number,
  name: string,
  type: number,
  to: string,
  mes: string,
  createAt: string,
}

export interface Room {
  users: User[],
  messages: Message[],
  name: string,
  type: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public emoji = false;
  public screen = true;
  public toggleStatus: any[] = [];
  public user: User | undefined;
  public room: Room = {users: [], messages: [], type: '', name: ''};
  public users: User[] = [];
  public groups: any[] = [];
  public messageForm = new FormGroup({
    to: new FormControl(),
    mes: new FormControl(),
  })

  private ready: any;

  constructor(private chatService: ChatService, private authenticationService: AuthenticationService, private router: Router) {

  }

  ngOnInit(): void {
    const dataUser: any = this.authenticationService.getToken()
    if (dataUser && !this.authenticationService.isUserAuthenticated) {
      clearInterval(this.ready)
      this.ready = setInterval(() => {
        this.chatService.reLogin(dataUser).then(() => {
          this.user = {name: dataUser.user, type: 'people'};
        });
      }, 500);
    }
    this.setup().then(() => {
      this.user = {name: dataUser.user, type: 'people'};
    });
    this.toggleStatus.push(this.screen);
  }

  private async subscribe() {
    await this.chatService.messages.subscribe((message) => {
      const {event, status, data} = message

      if (event === 'AUTH' && status === 'error' && data.mes === 'User not Login') {
        this.chatService.reLogin(this.authenticationService.getToken())
      } else if (event === environment.event.RE_LOGIN) {
        if (status === 'success') {
          this.handleRefreshPage({
            user: {user: this.authenticationService.getToken()?.user, code: data.RE_LOGIN_CODE}
          })
        } else {
          this.logout();
        }
        clearInterval(this.ready);
      } else if (event === environment.event.SEND_CHAT && status === 'success') {
        this.handleSendChat(data);
      } else if (event === environment.event.GET_USER_LIST && status === 'success') {
        this.setUsers(data);
      } else if (event === environment.event.GET_PEOPLE_CHAT_MES && status === 'success') {
        this.room.messages = [...data].reverse();
        this.room.type = 'people';
      } else if (event === environment.event.GET_ROOM_CHAT_MES && status === 'success') {
        console.log("Response from websocket: ", message);
        this.room.messages = [...message.data.chatData];
        this.room.type = 'room';
      } else {
        if (this.ready) clearInterval(this.ready)
      }
    });
  }

  async setup() {
    await this.subscribe();
    await this.chatService.getUserList();
  }


  async handleRefreshPage(data: any) {
    await this.authenticationService.setToken(JSON.stringify(data.user));
    await this.chatService.getUserList();
  }

  handleSendChat(data: any) {

  }

  setMessagesUser(data: any) {
    if (data instanceof Array) {
      data.forEach((item) => {

      })
    }
  }

  async setUsers(data: any) {
    // @ts-ignore
    this.users = data?.map((user: any) => {
      console.log(user)
      const name: string = user.name;
      const type: string = user.type === 0 ? 'people' : 'room';
      if (name && type) return {name, type};
    });

    // this.room.users.push(this.users[0]);
    this.users.forEach(user => {
      this.getMessages(user?.name, 1, user?.type);
    })
  }


  async connectChat(name: string, type: string) {
    await this.getMessages(name, 1, type);
  }

  async getMessages(name: string, page: number, type: string) {
    if (type === 'people') await this.chatService.getPeopleMessage(name, page);
    else if (type === 'room') await this.chatService.getRoomMessage(name, page);
  }


  sendChat() {
    this.chatService.sendChat({
      type: 'people',
      to: this.messageForm.controls.to.value,
      mes: this.messageForm.controls.mes.value
    });
  }


  logout() {
    this.authenticationService.removeToken();
    this.chatService.logout();
    this.router.navigateByUrl('/login');
  }

  public toggleEmoji(){
      this.emoji = !this.emoji;
  }
  public toggleScreen() {
    this.screen = !this.screen;
    this.toggleStatus.push(this.screen);
    console.log(this.toggleStatus[this.toggleStatus.length - 1])
  }
}
