import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../../../components/services/master.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  addPersonForm: FormGroup;
  loggedInUserId: number | null = null;
  locations: any[] = [];

  constructor(
    private masterService: MasterService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.addPersonForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      mobile_no: [''],
      country_code: [''],
      location: [''],
      is_active: [false],
      date_of_joining: ['']
    });
  }

  ngOnInit(): void {
    this.fetchLocations();
   
      this.loggedInUserId = this.masterService.getAdminId();
    
  }

  onSubmit(): void {
    if (this.addPersonForm.valid) {
      // Log the form data to the console
      console.log("Form Data:", this.addPersonForm.value);
  
      // Prepare the form data to be sent to the backend
      const formData = {
        ...this.addPersonForm.value,
        created_by: this.loggedInUserId,
        updated_by: this.loggedInUserId,
        created_at: new Date(),
        updated_at: new Date(),
      };
  
      // Log the final form data to be sent to the backend
      console.log("Form Data to be sent to backend:", formData);
  
      // Call the service method to add the employee
      this.masterService.addEmployee(formData).subscribe(
        (response) => {
          // Log the backend response
          console.log('Backend Response:', response);
          // Show success message to the user
          alert('User added successfully');
          // Reset the form
          this.addPersonForm.reset();
          // Navigate to the desired page
          // this.router.navigate(['/leave-management/admindashboard']);
        },
        (error) => {
          // Log any errors that occur during the service call
          console.error('Error adding user:', error);
        }
      );
    } else {
      // If the form is invalid, log an error message
      console.error('Form is invalid');
    }
  }
  
  fetchLocations(): void {
    this.masterService.getAllLocations().subscribe(
      (data) => {
        this.locations = data;
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }
}
