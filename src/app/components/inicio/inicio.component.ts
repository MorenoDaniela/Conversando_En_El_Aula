import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  sala: string="";
  constructor(public router:Router) { }

  ngOnInit() {}

  a4B(){
    this.router.navigate(['cuartoB']);
  }
  a4A(){
    this.router.navigate(['cuartoA']);
  }
}
