import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CrudServiceService } from 'src/app/shared/services/crud-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  cep: any;

  constructor(
    private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'senha': new FormControl(null, [Validators.required])
    })
  }

  login() {
    if (this.form.invalid) {
      alert('Formulário inválido')
      return
    }
    this.authService.login(this.form.value);
  }

  cadastro() {
    this.route.navigate(['signup'])
  }





}
