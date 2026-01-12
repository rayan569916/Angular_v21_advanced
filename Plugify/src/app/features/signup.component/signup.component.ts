import { Component,OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from './password-match.validator'

@Component({
  selector: 'app-signup.component',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit{

  signUpGroup!:FormGroup;

  constructor(private formBuilder:FormBuilder){}

  ngOnInit(){
    this.buildForm();
  }
  

  private buildForm(): void{
  const STRONG_PASSWORD =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  this.signUpGroup=this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    newPassword:['',[Validators.required,Validators.pattern(STRONG_PASSWORD)]],
    ConfirmPassword:['',[Validators.required]]},
    {
      validators: passwordMatchValidator
    }
  );
  }

  onSubmit(){
    if(this.signUpGroup.invalid){
      this.signUpGroup.markAllAsTouched();
      return;
    }
  }

}
