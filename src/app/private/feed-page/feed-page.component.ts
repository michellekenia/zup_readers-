import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { CrudServiceService } from 'src/app/shared/services/crud-service.service';
import { BehaviorSubject } from 'rxjs';
import { BookInterface } from 'src/app/shared/interfaces/book.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { GenderEnum } from 'src/app/shared/enums/gender.enum';
import { TagEnum } from 'src/app/shared/enums/tag.enum';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit {

  openProfile = new BehaviorSubject(false);
  currentBook: BehaviorSubject<any> = new BehaviorSubject(null);

  filtersForm!: FormGroup;
  filterOpen = false;

  user: any;
  
  books: BookInterface[] = [
  ];

  gender = GenderEnum;
  genders: any[] = [];

  tags: any[] = [];
  tagEnum = TagEnum;

  constructor(
    private authService: AuthService,
    private crudService: CrudServiceService) { }

  ngOnInit(): void {
    this.genders = Object.keys(this.gender);
    this.tags = Object.keys(this.tagEnum);
    this.buildFiltersForm();

    this.authService.user.subscribe(data => {
      if (data && data.nome && data.email) {
        this.user = data;
      } else {
        this.authService.getUser();
      }      
    })

    this.currentBook.subscribe( currentBook => {
      if (!currentBook) {
        this.getFeedList();
      }
    })

  }

  buildFiltersForm() {
    this.filtersForm = new FormGroup({
      autor: new FormControl(null),
      tag: new FormControl(null),
      nome: new FormControl(null),
      genero: new FormControl(null)
    })     
  }

  loggout() {
    this.authService.loggout();
  }
  
  onProfileOpen(book? : BookInterface) {
    this.currentBook.next(book? book : null);
    this.openProfile.next(true);
  }
  
  //busca os livros no servidor
  getFeedList() {
    let url = this.makeGetUrl();
    
    this.crudService.get(url).subscribe( (resp: any) => {
      if (resp && resp.content) {
        this.books = [...resp.content];
      }
    })
    
  }

  // monta a url pra buscar no servidor (inserir filtros ou dados da paginação nesse momento)
  makeGetUrl() {
    let url = environment.BASE_PATH + 'livros';
    url += '?size=9999';
    url += this.makeFiltersUrl();
    return url;
  }
  
  getReview(book: any) {
    return book && book.review && book.review.texto? book.review.texto: '';
  }

  filtrar() {
    this.getFeedList();
  }

  limparFiltros() {
    this.buildFiltersForm();
    this.getFeedList()
  }

  makeFiltersUrl() {
    let filter = this.filtersForm.value;
    let arrayFilter = Object.keys(filter);
    let url = '';
    arrayFilter.forEach(key => {
      if (filter[key] !== null && filter[key] !== '') {
        url = `${url}&${key}=${filter[key]}` 
      }
    })
    return url;
  }
}


