import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../_services/booking.service';
import { EventService } from '../_services/event.service';
import { Event } from '../models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  currentUser: any;
  bookingForm!: FormGroup;
  eventName!: string;
  eventDetails: Event = {};
  totalAmount: number = 0;
  eventSubscription: Subscription | undefined;

  constructor(
    private bookingService: BookingService,
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.eventName = this.route.snapshot.paramMap.get('event_name')!;
    this.currentUser = this.storageService.getUser();

    this.eventSubscription = this.eventService
      .findByEventName(this.eventName)
      .subscribe(
        (data: any) => {
          this.eventDetails = data;

          this.bookingForm = this.formBuilder.group({
            event_id: [this.eventDetails.event_id, Validators.required],
            user_id: [this.currentUser._id, Validators.required],
            seat_type: ['', Validators.required],
            seat_price: [10, Validators.required],
            ticket_numbers: [1, [Validators.required, Validators.min(1)]],
            food_options: this.formBuilder.group({
              popcorn: [false],
              jus: [false],
              eau: [false],
            }),
            num_carte: ['', Validators.required],
            code_carte: ['', Validators.required],
            total_cost: [0, Validators.required],
          });
        },
        (error: any) => {
          console.error('Error fetching event details', error);
        }
      );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  submitBooking(): void {
    console.log('Form submitted');
    if (this.bookingForm.valid) {
      const bookingData = this.bookingForm.value;

      this.bookingService.create(bookingData).subscribe({
        next: (response) => {
          console.log('Booking successful', response);
          this.calculateTotalAmount();
          console.log('Form submitted');
        },
        error: (error) => {
          console.error('Booking failed', error);
          if (error.error && error.error.message) {
            console.error('Server error message:', error.error.message);
          }
        },
      });
    }
  }

  toggleFoodOption(option: string): void {
    const foodOptions = this.bookingForm.get('food_options') as FormGroup;

    const currentOptionValue = foodOptions.get(option)?.value;
    foodOptions.get(option)?.setValue(!currentOptionValue);

    this.calculateTotalAmount();
  }

  isFoodOptionSelected(option: string): boolean {
    const foodOptions = this.bookingForm.get('food_options') as FormGroup;
    return foodOptions.get(option)?.value;
  }

  calculateTotalAmount(): void {
    const seatType = this.bookingForm.value.seat_type;
    const ticketNumber = this.bookingForm.value.ticket_numbers;
    const seatPrice = this.bookingForm.value.seat_price || 0;

    this.totalAmount = seatPrice * ticketNumber;
  }
}
