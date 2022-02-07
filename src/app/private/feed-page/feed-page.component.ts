import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    console.log(this.authService.getUser())
    this.authService.getUser().subscribe(data => {
      console.log('Usuario',data)
    });

    let token = localStorage.getItem('auth')!;
    let decode = jwt_decode(localStorage.getItem('auth')!.replace('Token ', '')) as {sub: string, exp: number, idUsuario: string};
    const requestInfo =  {
      method: 'GET',
      headers: new Headers({
        "content-type": "application/json",
        Authorization: token
      })

    }
    fetch(environment.BASE_PATH + 'usuarios', requestInfo)
      .then(data => {
        console.log('Usuario:fetch',data)
      })   
  }

  loggout() {
    this.authService.loggout();
  }

}


