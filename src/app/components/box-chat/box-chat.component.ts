import {
  AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild,
  ViewEncapsulation
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
export class BoxChatComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() user: User | undefined;
  @Input() activeRoom: Room | undefined;
  @Input() dataRetrieved: any | undefined;
  @Input() isOpenForward: boolean = false;
  @Output() forwardMessage = new EventEmitter();
  @Output() loadHistory = new EventEmitter();
  @ViewChild('boxChat') boxChat: any;
  private scroll: boolean = true;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.scroll = !!(changes['activeRoom'] || changes['dataRetrieved']);
  }

  ngOnInit(): void {

  }

  onScroll(event: any) {
    if (event.target.scrollTop <= 500) this.loadHistory.emit()
  }

  ngAfterViewChecked() {
    if (this.scroll) this.scroll = this.scrollToBottom();
  }

  scrollToBottom(): boolean {
    const nativeElement = this.boxChat.nativeElement;
    nativeElement.scrollTop = nativeElement.scrollHeight;
    return nativeElement.scrollTop === 0;
  }

  divideDate(index: any): boolean {
    if (index === 0) return true;
    const prev: any = this.activeRoom?.messages[index - 1].createAt;
    const current: any = this.activeRoom?.messages[index].createAt;
    const prevDate = new Date(prev);
    const currentDate = new Date(current);
    if (prevDate.getDate() !== currentDate.getDate() ||
      prevDate.getMonth() !== currentDate.getMonth() ||
      prevDate.getFullYear() !== currentDate.getFullYear()) {
      return true;
    }
    // console.log(this.activeRoom?.messages[index - 1].mes, prev, this.activeRoom?.messages[index].mes, current)
    return false;
  }

  handleForwardMessage(value: any) {
    this.forwardMessage.emit({isOpenForward: true, content: value});
  }
}
