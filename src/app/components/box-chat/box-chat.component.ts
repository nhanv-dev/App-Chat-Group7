import {
  AfterViewChecked,
  Component,
  Input,
  Output,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';
import {Room, User} from "../../services/chat/chat.service";
import {HostListener} from '@angular/core';
import {ForwardComponent} from "../forward/forward.component";

@Component({
  selector: 'app-box-chat',
  templateUrl: './box-chat.component.html',
  styleUrls: ['./box-chat.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BoxChatComponent implements OnInit, AfterViewChecked {
  @Input() user: User | undefined;
  @Input() activeRoom: Room | undefined;
  @ViewChild('boxChat') boxChat: any;
  @Input() rooms: Room [] | undefined;
  @Input() isOpenForward: boolean=false;
  @Output() forwardMessage = new EventEmitter();
  public isOpened: boolean = false;
   content: any | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }


  @HostListener('scroll', ['$event'])
  onScroll($event: any) {
    console.log($event)
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.boxChat.nativeElement.scrollTop = this.boxChat.nativeElement.scrollHeight;
  }

  compareDate(index: any): boolean {
    if (index === 0) return true;
    const prev: any = this.activeRoom?.messages[index - 1].createAt;
    const current: any = this.activeRoom?.messages[index].createAt;
    const prevDate = new Date(prev);
    const currentDate = new Date(current);
    return prevDate.getDate() !== currentDate.getDate() ||
      prevDate.getMonth() !== currentDate.getMonth() ||
      prevDate.getFullYear() !== currentDate.getFullYear();
  }

  getMess(value: any) {
    this.forwardMessage.emit({isOpenForward:true,content:value});
  }

  resetValue() {
    this.isOpened = !this.isOpened;
    console.log(this.isOpened);


  }

  forward(mess: any) {

  }
  mess(){
    console.log("Sent"+this.content);
    return  this.content;
  }

}
