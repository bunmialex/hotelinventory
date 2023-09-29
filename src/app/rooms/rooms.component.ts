import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  SkipSelf,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Room, RoomList } from './rooms';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';
import { RoomsListComponent } from './rooms-list/rooms-list.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked {

  hotelName = 'Hilton Hotel';

  numberOfRooms = 10;

  hideRooms = true;

  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title = 'Room List';

  roomList: RoomList[] = [];

  totalBytes = 0;

  subscription!: Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  priceFilter = new FormControl(0);

  roomsCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length));

  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  constructor(
    @SkipSelf() private roomsService: RoomsService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request successful!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
      }
    });

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
    });
    // this.roomList = this.roomsService.getRooms();
    this.stream.subscribe((data) => console.log(data));
    // this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // })
  }

  // ngDoCheck(){
  //     console.log('on changes is called.');
  // }

  ngAfterViewInit() {
    this.headerComponent.title = 'Rooms View';

    console.log((this.headerChildrenComponent.last.title = 'Last Title'));
  }

  ngAfterViewChecked() {}

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: 4,
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://images.unsplash.com/photo-1518791841217-8f162f1e11131',
      checkingTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };

    // this.roomList.push(room);

    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: 3,
      roomType: 'Deluxe Room',
      amenities: '1135tsting1234, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://images.unsplash.com/photo-1518791841217-8f162f1e11131',
      checkingTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.delete('8').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
