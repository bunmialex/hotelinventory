import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss'],
})
export class RoomsBookingComponent {
  id: number = 0;

  // id$ = this.router.params.pipe(map((params) => params['roomid']));
  id$ = this.router.paramMap.pipe(map((params)=>params.get('roomid')));

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    // this.router.params.subscribe((params)=>{
    //   this.id = params['roomid'];
    // })
    // this.id = this.router.snapshot.params['roomid'];
    // this.router.paramMap.subscribe((parmas) => {
    //   parmas.get('roomid');
    // });
    // this.id$ =
  }
}
