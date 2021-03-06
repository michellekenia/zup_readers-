import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, never, Subscription } from 'rxjs';
import { GenderEnum } from 'src/app/shared/enums/gender.enum';
import { TagEnum } from 'src/app/shared/enums/tag.enum';
import { BookInterface } from 'src/app/shared/interfaces/book.interface';
import { CrudServiceService } from 'src/app/shared/services/crud-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-profile',
  templateUrl: './book-profile.component.html',
  styleUrls: ['./book-profile.component.scss']
})
export class BookProfileComponent implements OnInit, OnDestroy {
  @Input()
  openProfile!: BehaviorSubject<boolean>;
  @Input()
  currentBook!: BehaviorSubject<any>;
  open = true;

  currentBookData: BookInterface | null | undefined;

  subscriptions: Subscription[] = [];

  gender = GenderEnum;
  genders: any[] = [];

  tags: any[] = [];
  tagEnum = TagEnum;

  form: FormGroup = new FormGroup({});

  constructor(private crudService: CrudServiceService) { }

  ngOnInit(): void {
    this.genders = Object.keys(this.gender);
    this.tags = Object.keys(this.tagEnum);
    this.buildForm()
    this.subscriptions.push(
      this.currentBook.subscribe(data => {
        if (data && data.review.texto) {
          setTimeout(() => {
            this.currentBookData = this.formatToLoad(data);
            this.form.patchValue(this.currentBookData!)
          })
        } 
     })
    )
  }

  close() {
    this.currentBookData = null;
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
      'imagem': new FormControl(null),
      'review':  new FormControl(null, [Validators.required])
    })
  }

  salvar() {
    if (this.form.invalid) {
      alert('Formul??rio inv??lido')
      return      
    }
    let resp = this.form.value;
    this.crudService.post(environment.BASE_PATH + 'livros', this.formatToSend(this.form.value))
      .subscribe( resp => {
        // feedback
        this.close();
      })  

  }

  editar() {
    if (this.form.invalid) {
      alert('Formul??rio inv??lido')
      return      
    }
    this.crudService.put(environment.BASE_PATH + 'livros/' + this.form.value.id, this.formatToSend(this.form.value))
      .subscribe( resp => {
        // feedback
        this.close();
      })  

  }

  formatToSend(book: any) {
    book.review = { texto: book.review}
    return book
  }

  formatToLoad(book: any) {
    let copyBook = JSON.parse(JSON.stringify(book))
    book.review = book.review.texto;
    return book
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(data => {
      data.unsubscribe();
    })
      
  }

}
