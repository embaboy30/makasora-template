import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserDetailResolverService {

  constructor(private authService: AuthService) {
   }

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return await this.authService.getUserDetailAsync();
  }
  
}
