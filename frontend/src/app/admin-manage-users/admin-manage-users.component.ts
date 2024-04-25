// admin-manage-users.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MuserService } from '../_services/muser.service';
import { Muser } from '../models/muser.model';

@Component({
  selector: 'app-admin-manage-users',
  templateUrl: './admin-manage-users.component.html',
  styleUrls: ['./admin-manage-users.component.css']
})
export class AdminManageUsersComponent implements OnInit {
  musers: Muser[] = [];
  userId!: string;
  user!: Muser;

  constructor(private route: ActivatedRoute, private userService: MuserService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.getUserDetails();
    this.loadUsers(); 
  }
  
  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (musers) => {
        this.musers = musers; 
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  getUserDetails(): void {
    this.userService.getUser(this.userId).subscribe((user) => {
      this.user = user;
    });
  }

  createNewUser(): void {
    const newUser: Muser = {
      username: 'new_username',
      email: 'new_email@example.com',
      password: 'new_password',
      roles: ['user'],
      phone: 1234567890,
      address: 'New Address',
      _id: ''
    };
  
    this.userService.createUser(newUser).subscribe(
      (createdUser) => {
        console.log('User created successfully:', createdUser);

      },
      (error) => {
        console.error('Error creating user:', error);

      }
    );
  }
  
  deleteUser(user: Muser): void {
    const userId = user._id;
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          console.log('User deleted successfully');
          this.loadUsers(); 
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  getRoleName(roleIds: string[]): string {

    const roleNamesMap: { [key: string]: string } = {
      '653047f4ddcbdc763a5b3f47': 'User',
      '653047f4ddcbdc763a5b3f48': 'Moderator',
      '653047f4ddcbdc763a5b3f49': 'Admin'

    };

    const roleNames = roleIds.map((roleId) => roleNamesMap[roleId] || roleId);

    return roleNames.join(', ');
  }


  promoteUser(user: Muser): void {
    const moderatorRoleId = '653047f4ddcbdc763a5b3f48';
    const hasModeratorRole = user.roles.includes(moderatorRoleId);
  
    if (!hasModeratorRole) {
      const updatedUser = { ...user, roles: [moderatorRoleId] };
      this.userService.updateUser(user._id, updatedUser).subscribe(
        () => {
          console.log('User promoted to Moderator successfully');
          this.loadUsers(); 
        },
        (error) => {
          console.error('Error promoting user to Moderator:', error);
        }
      );
    }
  }
  
  demoteUser(user: Muser): void {
    const userRoleId = '653047f4ddcbdc763a5b3f47';
    const hasUserRole = user.roles.includes(userRoleId);
  
    if (!hasUserRole) {
      const updatedUser = { ...user, roles: [userRoleId] };
      this.userService.updateUser(user._id, updatedUser).subscribe(
        () => {
          console.log('User demoted to User successfully');
          this.loadUsers(); 
        },
        (error) => {
          console.error('Error demoting user to User:', error);
        }
      );
    }
  }
}
