import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private crudService: CrudServiceService,
    private route: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
    this.crudService.get('https://viacep.com.br/ws/73015108/json/').subscribe(ceps => {
      this.cep = ceps;
    })
  }

  login() {
    if (this.form.invalid)  {
      alert('ta invalido esse negocio')
      return
    }
    alert('o email é ' + this.form.value.email + 'a senha é' + this.form.value.password);
    this.crudService.post('http://localhost:8080/login', this.form.value).subscribe(res => {
      if (res) {
        this.route.navigate(['feed'])
      }

    })   

  }



}
