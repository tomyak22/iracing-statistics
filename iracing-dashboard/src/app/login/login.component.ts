import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { IracingApiWrapperService } from '../../services/iracing-api-wrapper.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule],
  providers: [HttpClient, IracingApiWrapperService] // Add HttpClient to providers
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private iracingService: IracingApiWrapperService, private router: Router) { // Inject HttpClient
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.loginError = null;

    try {
      const response: any = await this.iracingService.login(this.loginForm.value.email, this.loginForm.value.password).toPromise();
      console.log('Full response:', response); // Debug: Print the entire response
      console.log('Response Headers: ', response.headers.keys())
      const cookies = response.headers.get('Set-Cookie')
      console.log(cookies)
      if (response) {
        // Check if auth_cookie and cust_id are present
        if (response) {
          const cookies = response.headers.get('set-cookie')
          console.log(cookies)
          //localStorage.setItem('auth_cookie', response.auth_cookie);
        } else {
          console.warn('auth_cookie not found in response');
          this.loginError = 'Authentication was successful, but could not retrieve authentication cookie.';
        }

        if (response.body.cust_id) {
          localStorage.setItem('cust_id', response.body.cust_id.toString());
        } else {
          console.warn('cust_id not found in response');
          this.loginError = this.loginError ? this.loginError + '  Could not retrieve customer ID.' : 'Could not retrieve customer ID.';
        }
        if (!this.loginError) {
          this.navigateToDisplayData();
        }


      } else {
        this.loginError = 'Login failed. Please try again.';
      }
    } catch (error: any) {
      if (error instanceof Error) {
        this.loginError = error.message || 'An error occurred during login.';
      } else {
        this.loginError = error.message || 'An unexpected error occurred.';
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  handleReset() {
    this.loginForm.reset();
    this.loginError = null;
  }

  navigateToDisplayData() {
    this.router.navigate(['/display-data']);
  }
}
