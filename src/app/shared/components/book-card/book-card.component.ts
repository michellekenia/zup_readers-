import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input()  name!: string;
  @Input() description!: string;
  @Input() author!: string;
  @Input() image!: string;
  @Input() gender!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
