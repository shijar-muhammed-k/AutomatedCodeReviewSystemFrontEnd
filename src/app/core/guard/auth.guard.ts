import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core'
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'

export const authGuard: CanActivateFn = (route, state) => {
  
  const userService = inject(UserService);
  const router = inject(Router);


  let loggeduser;

  userService.getUser().subscribe((user) => {
    loggeduser = user
  })

  if(loggeduser) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};