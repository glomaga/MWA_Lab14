import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { DbService } from '../db/db.service';


@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.component.html',
  styleUrls: ['./data-driven.component.css']
})
export class DataDrivenComponent implements OnInit {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private DbService: DbService) { 
    this.myForm = formBuilder.group({
      'userData': formBuilder.group({
        'name': ['', [Validators.required]],
        'email': ['', [
          Validators.required,
          Validators.email]]
      }),
      'post': ['Testing', Validators.required]
    });

    this.myForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );

  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.myForm);
  }
  
  getData(){
    console.log("GET DATA");

    this.DbService.getUser()
    .subscribe(
      response => {
        this.myForm.patchValue({
          userData:{name: response.name, email: response.email}
        });
        },
      error => console.log(error),
      () => console.log("Operation Completed!")
    );

    this.DbService.getPost()
    .subscribe(
      response => {
        this.myForm.patchValue({
          post:response[2].body
        });
        },
      error => console.log(error),
      () => console.log("Operation Completed!")
    );




  }

}
