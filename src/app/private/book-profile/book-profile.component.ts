import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, never } from 'rxjs';
import { GenderEnum } from 'src/app/shared/enums/gender.enum';
import { BookInterface } from 'src/app/shared/interfaces/book.interface';
import { CrudServiceService } from 'src/app/shared/services/crud-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-profile',
  templateUrl: './book-profile.component.html',
  styleUrls: ['./book-profile.component.scss']
})
export class BookProfileComponent implements OnInit {
  @Input()
  openProfile!: BehaviorSubject<boolean>;
  @Input()
  currentBook!: BehaviorSubject<any>;
  open = true;

  currentBookData: BookInterface | null | undefined;

  gender = GenderEnum;
  genders: any[] = [];

  form: FormGroup = new FormGroup({});

  constructor(private crudService: CrudServiceService) { }

  ngOnInit(): void {
    this.genders = Object.keys(this.gender);
    this.buildForm()
    this.currentBook.subscribe(data => {
      if (data) {
        this.currentBookData = data;
        console.log(this.currentBookData)
        this.form.patchValue(this.currentBookData!)
      }
      
    })
  }

  close() {
    this.currentBook.next(null);
    this.openProfile.next(false);
  }

  buildForm() {
    this.form = new FormGroup({
      'id': new FormControl(null),
      'nome': new FormControl(null, [Validators.required]),
      'autor': new FormControl(null, [Validators.required]),      
      'tags': new FormControl(null, [Validators.required]),
      'genero': new FormControl(null, [Validators.required]),
      'imagem': new FormControl(null, [Validators.required]),
      'review': new FormControl(null, [Validators.required])
    })
  }

  salvar() {
    if (this.form.invalid) {
      alert('Formulário inválido')
      return      
    }
    this.crudService.post(environment.BASE_PATH + 'colocar url livros', this.form.value)
      .subscribe( resp => {
        // feedback
        this.close();
      })  

  }

  editar() {
    if (this.form.invalid) {
      alert('Formulário inválido')
      return      
    }
    this.crudService.put(environment.BASE_PATH + 'colocar url livros', this.form.value)
      .subscribe( resp => {
        // feedback
        this.close();
      })  

  }

}
