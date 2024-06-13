// src/app/services/master.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../leave-management/admin-dashboard/components/employee/employee.component';
import { map, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private isLoggedInVar: boolean = false;

  private adminId: any;
  private userId: any;
  private userDetails: any;
  private selectedEmployeeID:any
  private baseUrl = 'http://localhost:3001/users';
  private apiUrl = 'http://localhost:3001/users';
  private apiUrl2='http://localhost:3001';
  private userApiUrl2 = `${this.apiUrl}/users/post`; // User API URL for posting new user data


  private userDetailsSubject = new BehaviorSubject<any>(null);
  userDetails$ = this.userDetailsSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      this.userDetailsSubject.next(decodedToken);
    }
  }





  setLogin(status: boolean): void {
    this.isLoggedInVar = status;
  }

  // Method to check login status
  isLoggedIn(): boolean {
    return this.isLoggedInVar;
  }
  setAdminId(AdminId: any): void {
    this.adminId = AdminId;
  }

  getAdminId(): any {
    return this.adminId;
  }

  setUserId(UserId: any): void {
    this.userId = UserId;
  }

  getUserId(): any {
    return this.userId;
  }

  // UserId(): number | null {
  //   const token = localStorage.getItem('token'); // Ensure 'token' is the key used to store the JWT
  //   if (token) {
  //     const decoded: any = jwtDecode(token);
  //     return decoded.userId; // Adjust the property name based on your token structure
  //   }
  //   return null;
  // }

  login(credentials: { email: string, password: string }): Observable<any> {
    console.log(credentials.email);
    console.log(credentials.password);
    return this.http.post('http://localhost:3001/auth/login', credentials);
  }
  logout(): void {
    localStorage.removeItem('token');
    this.userDetailsSubject.next(null);
  }
  getUserDetails(): Observable<any> {
    const url = `${this.baseUrl}/${this.userId}`;
    return this.http.get<any>(url).pipe(
      tap(details => this.userDetails = details) // Store user details when fetched
    );
  }
  getAdminDetails(): Observable<any> {
    const url = `${this.baseUrl}/${this.adminId}`;
    return this.http.get<any>(url).pipe(
      tap(details => this.userDetails = details) // Store user details when fetched
    );
  }

  getStoredUserDetails(): any {
    return this.userDetails;
  }


  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      tap(employees => console.log('Fetched employees:', employees)),
      map(employees => employees.sort((a, b) => a.first_name.localeCompare(b.first_name)))
    );
  }


  setSelectedEmployeeID(employeeID:any){
    this.selectedEmployeeID=employeeID;
  }
  

  getEmployeeById(): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${this.selectedEmployeeID}`);
  }

  
  addEmployee(employeeData: any): Observable<any> {
    console.log("Sending data to backend: ", employeeData);
    return this.http.post<any>('http://localhost:3001/users/post', employeeData);
  }

  // Fetches all locations from the backend
  getAllLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl2}/locations`);
  }


  getHolidays(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3001/holidays');
  }


  getPendingLeaves(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3001/user-leaves/pending');
  }

  // Updates leave status
  updateLeaveStatus(leaveId: number, status: string): Observable<any> {
    return this.http.patch<any>(`http://localhost:3001/user-leaves/${leaveId}/status/${status}`, {});
  }

  getTodaysLeaves(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3001/user-leaves/todysLeave');
  }


  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3001/users/role/admin`);
  }
  
}
