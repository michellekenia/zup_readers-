import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { CrudServiceService } from 'src/app/shared/services/crud-service.service';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit {

  user: any;
  
  books: any[] = [
    { name: 'iuhiuhiuhui', 
      author: 'kjhkjhjkh', 
      image: "https://images-na.ssl-images-amazon.com/images/I/41897yAI4LL._SX346_BO1,204,203,200_.jpg", 
      description: 'iuhihiuhiuhiuhiuhiuhiuhuihuihi'},
      { name: 'iuhiuhiuhui', 
      author: 'kjhkjhjkh', 
      image: "https://images-na.ssl-images-amazon.com/images/I/41897yAI4LL._SX346_BO1,204,203,200_.jpg", 
      description: 'iuhihiuhiuhiuhiuhiuhiuhuihuihi'},
      { name: 'iuhiuhiuhui', 
      author: 'kjhkjhjkh', 
      image: "https://images-na.ssl-images-amazon.com/images/I/41897yAI4LL._SX346_BO1,204,203,200_.jpg", 
      description: 'iuhihiuhiuhiuhiuhiuhiuhuihuihi'},
      { name: 'iuhiuhiuhui', 
      author: 'kjhkjhjkh', 
      image: "https://images-na.ssl-images-amazon.com/images/I/41897yAI4LL._SX346_BO1,204,203,200_.jpg", 
      description: 'iuhihiuhiuhiuhiuhiuhiuhuihuihi'},
      { name: 'iuhiuhiuhui', 
      author: 'kjhkjhjkh', 
      image: "https://images-na.ssl-images-amazon.com/images/I/41897yAI4LL._SX346_BO1,204,203,200_.jpg", 
      description: 'iuhihiuhiuhiuhiuhiuhiuhuihuihi'},
      { name: 'iuhiuhiuhui', 
      author: 'kjhkjhjkh', 
      image: "https://images-na.ssl-images-amazon.com/images/I/41897yAI4LL._SX346_BO1,204,203,200_.jpg", 
      description: 'iuhihiuhiuhiuhiuhiuhiuhuihuihi'},
      { name: 'iuhiuhiuhui', 
      author: 'kjhkjhjkh', 
      image: "https://images-na.ssl-images-amazon.com/images/I/41897yAI4LL._SX346_BO1,204,203,200_.jpg", 
      description: 'iuhihiuhiuhiuhiuhiuhiuhuihuihi'},
      { name: 'iuhiuhiuhui', 
      author: 'kjhkjhjkh', 
      image: "https://images-na.ssl-images-amazon.com/images/I/41897yAI4LL._SX346_BO1,204,203,200_.jpg", 
      description: 'iuhihiuhiuhiuhiuhiuhiuhuihuihi'}
  ]

  constructor(
    private authService: AuthService,
    private crudService: CrudServiceService) { }

  ngOnInit(): void {

    console.log(this.authService.getUser())
    // chamada com httpclient
    this.authService.getUser().subscribe(
      { 
        next: ( data ) => console.log('Usuario', data),
        error: (error) => console.log(error)
      });

    // this.crudService.get(environment.BASE_PATH + 'usuarios').subscribe(data => {
    //   console.log('httpclient/usuarios', data)
    // })
    

    // chamada com fetch
    let token = localStorage.getItem('auth')!;
    let decode = jwt_decode(localStorage.getItem('auth')!.replace('Token ', '')) as {sub: string, exp: number, idUsuario: string};
    const requestInfo =  {
      method: 'GET',
      headers: new Headers({
        "content-type": "application/json",
        Authorization: token
      })

    }
    // fetch(environment.BASE_PATH + 'usuarios/' + decode.idUsuario, requestInfo)
    //   .then(data => {
    //     console.log('Usuario:fetch',data)
    //   })
    // fetch(environment.BASE_PATH + 'usuarios' , requestInfo)
    //   .then(data => {
    //     console.log('Usuarios:fetch',data)
    //  })       
  }

  loggout() {
    this.authService.loggout();
  }

}


