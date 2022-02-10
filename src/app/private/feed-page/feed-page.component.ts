import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { CrudServiceService } from 'src/app/shared/services/crud-service.service';
import { BehaviorSubject } from 'rxjs';
import { BookInterface } from 'src/app/shared/interfaces/book.interface';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit {

  openProfile = new BehaviorSubject(false);
  currentBook: BehaviorSubject<any> = new BehaviorSubject(null);

  user: any;
  
  books: BookInterface[] = [
    {
      nome: 'Harry potter e a rola descomunal',
      autor: 'José mari',
      imagem: "https://images-na.ssl-images-amazon.com/images/I/41897yAI4LL._SX346_BO1,204,203,200_.jpg",
      review: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when',
      tags: "qwe qweqw",
      genero: "AVENTURA"
    },
    {
      nome: 'harry potter e deu ruim',
      autor: 'Antonio dos santos',
      imagem: "https://images-na.ssl-images-amazon.com/images/I/51z0s3GcvwL._SY344_BO1,204,203,200_QL70_ML2_.jpg",
      review: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when',
      tags: "qwe qweqw",
      genero: "AVENTURA"
    },
    {
      nome: 'E o vento levou',
      autor: 'Alexandre frota',
      imagem: "https://images-na.ssl-images-amazon.com/images/I/41kT95iZ81L._SX346_BO1,204,203,200_.jpg",
      review: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when',
      tags: "qwe qweqw",
      genero: "AVENTURA"
    },
    {
      nome: 'Algum livro com desfodere-se',
      autor: 'Um coach',
      imagem: "https://images-na.ssl-images-amazon.com/images/I/41897yAI4LL._SX346_BO1,204,203,200_.jpg",
      review: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when',
      tags: "qwe qweqw",
      genero: "AVENTURA"
    }

  ]

  constructor(
    private authService: AuthService,
    private crudService: CrudServiceService) { }

  ngOnInit(): void {

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
      this.books = resp;
    })
    
  }

  // monta a url pra buscar no servidor (inserir filtros ou dados da paginação nesse momento)
  makeGetUrl() {
    let url = environment.BASE_PATH + 'livros';
    url + '?size=9999';
    // adicionar os filtros
    return url;
  }
  
}


