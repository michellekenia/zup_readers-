import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CrudServiceService } from 'src/app/shared/services/crud-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private crudService: CrudServiceService,
    private route: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'senha': new FormControl(null, [Validators.required]),
      'nome': new FormControl(null, [Validators.required])      
    })
  }

  signup(){
    if (this.form.invalid) {
      alert('Formulário inválido')
      return
    }
    this.crudService.post(environment.BASE_PATH + 'usuarios', this.form.value).subscribe(resp => {

      this.authService.login({email: this.form.value.email, senha: this.form.value.senha});

    });
  }

  goToLogin() {
    this.route.navigate(['login']);
  }

}
