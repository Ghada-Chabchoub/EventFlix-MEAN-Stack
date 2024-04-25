import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GalleryLightboxComponent } from './gallery-lightbox/gallery-lightbox.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventUpdateComponent } from './components/event-update/event-update.component';
//import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventDetailsComponent } from './EventDetails/EventDetails.component';
import { BookingComponent } from './booking/booking.component';
import { UserEventListComponent } from './user-event-list/user-event-list.component';
import { AdminEventListComponent } from './admin-event-list/admin-event-list.component';
import { AdminAuthoriseEventComponent } from './admin-authorise-event/admin-authorise-event.component';
import { AdminManageUsersComponent } from './admin-manage-users/admin-manage-users.component';
import { AdminCreateUsersComponent } from './admin-create-users/admin-create-users.component';
import { AdminEditUsersComponent } from './admin-edit-users/admin-edit-users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    GalleryLightboxComponent,
    AddEventComponent,
    EventsListComponent,
    EventUpdateComponent,
    EventDetailsComponent,
    BookingComponent,
    UserEventListComponent,
    AdminEventListComponent,
    AdminEventListComponent,
    AdminAuthoriseEventComponent,
    AdminManageUsersComponent,
    AdminCreateUsersComponent,
    AdminEditUsersComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
