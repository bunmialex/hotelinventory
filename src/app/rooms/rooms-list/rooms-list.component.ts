import { ChangeDetectionStrategy, Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() rooms: RoomList[] = [];

  @Input() title: string = '';

  @Input() price: any;

  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']){
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnInit(): void { }

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }

  ngOnDestroy(): void {
      console.log('ng on destroy is called.')
  }

}
