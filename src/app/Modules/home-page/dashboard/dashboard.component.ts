import { Component, OnInit, ChangeDetectorRef, OnDestroy, Inject, AfterViewInit } from '@angular/core';
import { NavigationStart, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { AuthenticationService } from 'src/app/Shared/Services/authentication.service';
import { UserService } from 'src/app/Shared/Services/user.service';
import { HttpClient } from '@angular/common/http';
import { TOKEN_NAME } from 'src/app/Shared/Services/auth.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import Typed from 'typed.js';
import { ThemeService } from 'src/app/Shared/Services/theme.service';
import { Observable } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  htmlSnippet: string = "Ⓥⓞⓖⓤⓔ";
  value: string;
  isLogged: boolean;
  loading: boolean;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  isDarkTheme: Observable<boolean>;
  isDark: boolean;

  constructor(private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private themeService: ThemeService,
    public userService: UserService) {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationStart) {
        this.loading = true;
        this.spinner.show();
      } else if (evt instanceof NavigationEnd) {
        this.loading = false;
        this.spinner.hide();
      }
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // setInterval(() => { this.checkSession(); }, 1000);
  }

  authentication() {
    if (this.isLogged)
      this.logout();
    else
      this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialog, {
      width: '500px',
      data: {
        isLogged: this.isLogged,
        isDark: this.isDark
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  ngOnInit(): void {
    this.themeService.isDarkTheme.subscribe(theme => {
      this.isDark = theme;
      if(theme)
        localStorage.setItem('dark-theme', "true");
      else{
        localStorage.setItem('dark-theme', "false");
      }
    });
    if(localStorage.getItem('dark-theme').includes("true")){
      this.themeService.setDarkTheme(true); 
    } else {
      this.themeService.setDarkTheme(false); 
    }
    this.themeService.isDarkTheme.subscribe(theme => this.isDark = theme);

    const options = {
      strings: ['My project includes: <i>Angular</i> as frontend', 'My project includes: <strong>Spring Boot</strong> as backend', 'Many third party libraries like: <i><strong>typed.js</stronG></i>'],
      typeSpeed: 100,
      backSpeed: 0,
      smartBackspace: true, // this is a default
      loop: true,
      showCursor: true,
      cursorChar: '|',
    };

    const typed = new Typed('.typed-element', options);

    this.isLogged = false;
    this.checkUserSession();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.userService.logout();
    if (!localStorage.getItem(TOKEN_NAME)) {
      this.router.navigate(['/']);
    }
    location.reload();
  }

  checkUserSession(): void {
    if (localStorage.getItem(TOKEN_NAME)) {
      if (!this.userService.checkToken())
        this.isLogged = true;
      else {
        this.isLogged = false;
        this.logout();
      }
    }
    else
      this.isLogged = false;
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
  styleUrls: ['./login-dialog.scss'],
  animations: [
    trigger('errorAnimations', [
      transition(':enter', [
        query('p', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
  ]
})
export class LoginDialog implements OnInit {
  matCardTitle = 'Vogue';
  public credential = { 'username': '', 'password': '' };
  public loggedIn = false;
  htmlSnippet = '<i class="fa fa-warning"></i><b> Bad Username OR Password</b>';
  errorMessage: boolean = false;
  loading = false;
  error = '';
  redirectUrl: string;
  isSignUp: boolean;
  signIn: string = '<i class="fa fa-sign-in" aria-hidden="true"></i> Sign in</button>'
  signingIn: string = '<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> Signing In'
  usernameExists: boolean = false;
  emailSent: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  signinForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ])
  });

  constructor(public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private overlayContainer: OverlayContainer) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  onSubmit() {
    this.credential.username = this.loginForm.get("username").value;
    this.credential.password = this.loginForm.get("password").value;

    console.log(this.credential)

    this.loading = true;

    this.authenticationService.login(this.credential.username, this.credential.password)
      .subscribe(
        result => {
          if (result) {
            this.userService.login(result);
            this.data.isLogged = true;
            location.reload();
            this.navigateAfterSuccess();
          } else {
            this.data.isLogged = false;
            this.errorMessage = true;
            this.error = 'Username or password is incorrect';
          }
        },
        error => {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      );
  }

  ngOnInit() {
    if(this.data.isDark)
      this.overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    else {
      this.overlayContainer.getContainerElement().classList.remove('unicorn-dark-theme');
    }
    this.userService.logout();
    this.isSignUp = false;
  }

  onSignUp() {
    this.isSignUp = true;
  }

  onSignIn() {
    this.isSignUp = false;
  }

  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/']);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onNewAccount() {
    this.userService.newUser(this.signinForm.get("username").value, this.signinForm.get("firstName").value, this.signinForm.get("lastName").value).subscribe(
      res => {
        console.log(res);
        this.emailSent = true;
      },
      error => {
        console.log(error);
        this.usernameExists = true;
      }
    );
  }
}
