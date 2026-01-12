import { Component,OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login.component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;

  constructor(private formBuilder :FormBuilder){}

  ngOnInit(){
    this.buildForm();
  }

  private buildForm(): void{
    this.loginForm= this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }

  onSubmit(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
  }

}
