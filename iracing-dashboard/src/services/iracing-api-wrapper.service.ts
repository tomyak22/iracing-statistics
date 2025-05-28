import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import sha256 from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class IracingApiWrapperService {

  private iracingApiBaseUrl = 'https://members-ng.iracing.com/data/'; // Actual iRacing API
  private pythonApiBaseUrl = 'http://localhost:5000';

    constructor(private http: HttpClient) { }

    // Example: Get recent races (replace with actual API calls)
      getRecentRaces(cust_id: number) {
        const url = `${this.pythonApiBaseUrl}/api/recentRaces?cust_id=${cust_id}`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          //  Include the auth_cookie.  You'll need to get this after login and store it.
          //  For this example, I'm assuming you have a method to retrieve it.
        });

        return this.http.get(url, { headers, observe: 'response' , withCredentials: true  }).pipe(
          catchError(this.handleError)
        );
    }

      getFomulaLeaderboard() {
        const url = `${this.pythonApiBaseUrl}/api/formulaLeaderboard`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          //  Include the auth_cookie.  You'll need to get this after login and store it.
          //  For this example, I'm assuming you have a method to retrieve it.
        });

        return this.http.get(url, { headers, observe: 'response' , withCredentials: true  }).pipe(
          catchError(this.handleError)
        );
    }

    getSportsCarLeaderboard() {
        const url = `${this.pythonApiBaseUrl}/api/sportsCarLeaderboard`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          //  Include the auth_cookie.  You'll need to get this after login and store it.
          //  For this example, I'm assuming you have a method to retrieve it.
        });

        return this.http.get(url, { headers, observe: 'response' , withCredentials: true  }).pipe(
          catchError(this.handleError)
        );
    }

    // Example: Get member data
    getMemberData(cust_id: any) {
        const url = `${this.pythonApiBaseUrl}/api/recentRaces`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get(url, { observe: 'response', withCredentials: true }).pipe(
            catchError(this.handleError)
        );
    }

    getMemberInfo(searchInput: any) {
        const url = `${this.pythonApiBaseUrl}/api/memberSearch?search_term=${searchInput}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get(url, { observe: 'response', withCredentials: true }).pipe(
            catchError(this.handleError)
        );
    }

    // Example:  Authentication (you might move this to a separate auth service)
    login(email: string, password: string) {
        const url = `${this.pythonApiBaseUrl}/api/login`;;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        //  The password needs to be hashed.  This is handled on the Python
        //  side in your original code.  You'll need to replicate that
        //  hashing logic here in TypeScript, or, preferably, handle the
        //  authentication on your own backend server.
        //  DO NOT SEND RAW PASSWORDS FROM THE FRONT END
        const body = { email: email, password: btoa(password) }; //  You'll need to implement hashedPassword
        return this.http.post(url, body, { headers, observe: 'response', withCredentials: true }).pipe(
          catchError(this.handleError)
        );
    }

      private hashPassword(password: string, email:string): string{
        //  Simplified version of the password hashing.  THIS IS NOT SECURE.
        //  Use a proper cryptographic library (like CryptoJS) and ideally,
        //  handle this on the server.  This is ONLY for demonstration.
        const passwordEmail = password + email.toLowerCase();
        const hash = sha256.SHA256(passwordEmail).toString(); // Use SHA256
        return btoa(hash);
    }

    //  Get the auth cookie from wherever you've stored it (e.g., localStorage, a service)
    private getAuthCookie(): string {
        //  Replace this with your actual cookie retrieval logic
        const authCookie = localStorage.getItem('auth_cookie');
        return authCookie || '';  //  Return empty string if not found.
    }

    private handleError(error: any) {
        // In a real-world app, you might need to handle different error scenarios.
        console.error('iRacing API Error:', error);
        return throwError(() => new Error('Something went wrong with the iRacing API.'));
    }
}
