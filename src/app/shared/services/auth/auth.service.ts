import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { User } from '../../models/user/user.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly SESSION_STORAGE_ITEM_USER = 'user';

  public currentUser$: Observable<User | null>;
  private currentUserBehaviorSubject: BehaviorSubject<User | null>;

  constructor(private userService: UserService) {
    const storedUser = sessionStorage.getItem(this.SESSION_STORAGE_ITEM_USER);
    this.currentUserBehaviorSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null,
    );
    this.currentUser$ = this.currentUserBehaviorSubject.asObservable();
  }

  signIn(email: string, password: string): Observable<boolean> {
    return this.userService.getByEmailAndPassword(email, password).pipe(
      map((users) => this.login(users.length > 0 ? users[0] : null)),
      catchError(() => of(false)),
    );
  }

  signUp(user: User): Observable<boolean> {
    return this.userService.add(user).pipe(
      map((newUser) => this.login(newUser)),
      catchError(() => of(false)),
    );
  }

  login(user: User | null): boolean {
    if (user) {
      sessionStorage.setItem(
        this.SESSION_STORAGE_ITEM_USER,
        JSON.stringify({ id: user.id, email: user.email }),
      );
      this.currentUserBehaviorSubject.next(user);
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  logout(): void {
    sessionStorage.removeItem(this.SESSION_STORAGE_ITEM_USER);
    this.currentUserBehaviorSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserBehaviorSubject.value != null;
  }
}
