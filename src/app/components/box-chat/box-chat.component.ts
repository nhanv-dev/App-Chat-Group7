import {
  AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Room, User} from "../../services/chat/chat.service";
import {HostListener} from '@angular/core';

@Component({
  selector: 'app-box-chat',
  templateUrl: './box-chat.component.html',
  styleUrls: ['./box-chat.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BoxChatComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() user: User | undefined;
  @Input() activeRoom: Room | undefined;
  @Input() dataRetrieved: boolean | undefined;
  @Output() loadHistory = new EventEmitter();
  @ViewChild('boxChat') boxChat: any;
  private isChangedRoom: boolean = false;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeRoom']) this.isChangedRoom = true;
  }

  ngOnInit(): void {

  }

  onScroll(event: any) {
    if (event.target.scrollTop <= 500) this.loadHistory.emit()
  }

  ngAfterViewChecked() {
    console.log(this.dataRetrieved, this.isChangedRoom);
    if (this.dataRetrieved || this.isChangedRoom) {
      this.isChangedRoom = this.scrollToBottom();
      this.dataRetrieved = false;
    }
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
    return prevDate.getDate() !== currentDate.getDate() ||
      prevDate.getMonth() !== currentDate.getMonth() ||
      prevDate.getFullYear() !== currentDate.getFullYear();
  }
}
