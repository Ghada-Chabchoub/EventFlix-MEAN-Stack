import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EventUpdateComponent } from './components/event-update/event-update.component';
import { BookingComponent } from './booking/booking.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { UserEventListComponent } from './user-event-list/user-event-list.component';
import { AdminEventListComponent } from './admin-event-list/admin-event-list.component';
import { AdminAuthoriseEventComponent } from './admin-authorise-event/admin-authorise-event.component';
import { AdminManageUsersComponent } from './admin-manage-users/admin-manage-users.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },

  // moderartor *******************************************
  { path: 'event-list', component: EventsListComponent },
  { path: 'add-event', component: AddEventComponent },
  { path: 'events/:event_name', component: EventDetailsComponent },
  { path: 'edit-event/:event_name', component: EventUpdateComponent },


  // user ****************************************************
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'cart/:event_name', component: BookingComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'usereventlist', component: UserEventListComponent},


    // admin ****************************************************
    { path: 'admineventlist', component: AdminEventListComponent},
    { path: 'adminauthoriseevent/:event_name', component: AdminAuthoriseEventComponent},
    
    { path: 'adminmanageusers', component: AdminManageUsersComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
