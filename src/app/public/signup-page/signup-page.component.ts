import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudServiceService } from 'src/app/shared/services/crud-service.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private crudService: CrudServiceService,
    private route: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'senha': new FormControl(null, [Validators.required]),
      'nome': new FormControl(null, [Validators.required])      
    })
  }

  signup(){
  }

  goToLogin() {
    this.route.navigate(['login']);
  }

}
