import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  imports: [FormsModule, RouterModule, CommonModule],
  standalone: true,
})
export class PrincipalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
