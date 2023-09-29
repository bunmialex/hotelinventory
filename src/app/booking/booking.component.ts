import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomid');
    this.bookingForm = this.fb.group(
      {
        roomId: new FormControl(
          { value: roomId, disabled: true },
          { validators: [Validators.required] }
        ),
        guestEmail: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required, Validators.email],
        }),
        checkinDate: new FormControl(''),
        checkoutDate: new FormControl(''),
        bookingStatus: new FormControl(''),
        bookingAmount: new FormControl(''),
        bookingDate: new FormControl(''),
        mobileNumber: new FormControl('', {
          updateOn: 'blur',
        }),
        guestName: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          CustomValidator.ValidateName,
          CustomValidator.ValidateSpecialChar('*')
        ]),
        address: this.fb.group({
          AddressLine1: new FormControl('', {
            validators: [Validators.required],
          }),
          AddressLine2: new FormControl(''),
          City: new FormControl('', { validators: [Validators.required] }),
          State: new FormControl('', { validators: [Validators.required] }),
          Country: new FormControl(''),
          ZipCode: new FormControl(''),
        }),
        guests: this.fb.array([this.addGuestControl()]),
        tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
      }, {updateOn: 'blur', validators: [CustomValidator.Validatedate]}
      // { updateOn: 'blur' }
    );

    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data) => {
    //   // console.log(data);
    //   this.bookingService.bookRoom(data).subscribe((data) => {});
    // });

    this.bookingForm.valueChanges
      .pipe(exhaustMap((data) => this.bookingService.bookRoom(data)))
      .subscribe((data) => console.log(data));
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    // this.bookingService
    //   .bookRoom(this.bookingForm.getRawValue())
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        AddressLine1: '',
        AddressLine2: '',
        City: '',
        State: '',
        Country: '',
        ZipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  getBookingData() {
    this.bookingForm.patchValue({
      guestEmail: 'test@test.com',
      checkinDate: new Date('10-feb-2023'),
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        AddressLine1: '',
        AddressLine2: '',
        City: '',
        State: '',
        Country: '',
        ZipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  addGuest() {
    this.guests.push(this.addGuestControl());
  }

  addGuestControl() {
    return this.fb.group({
      guestName: new FormControl('', { validators: [Validators.required] }),
      age: new FormControl(''),
    });
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}
