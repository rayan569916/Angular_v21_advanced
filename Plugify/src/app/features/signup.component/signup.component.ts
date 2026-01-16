import { Component,OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from './password-match.validator'
import { Nba } from '../../services/nba';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup.component',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit{

  signUpGroup!:FormGroup;

  constructor(private formBuilder:FormBuilder,private service: Nba,private router:Router){}

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
    this.service.signupFlaskAPI({email:this.signUpGroup.get("email")?.value,password:this.signUpGroup.get("newPassword")?.value}).subscribe(res=>{
      console.log(res)
      this.router.navigate(['/dashboard']);
    })
  }

}
