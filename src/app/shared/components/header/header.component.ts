import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName = '';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(data => {
      if (data && data.nome) {
        this.userName = data.nome;
      } else {
        this.authService.getUser();
      }      
    })
  }

}
