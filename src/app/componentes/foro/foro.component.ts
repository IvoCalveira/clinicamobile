import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss'],
  imports: [FormsModule, RouterModule, CommonModule],
  standalone: true,
})
export class ForoComponent implements OnInit {
  consultas: any[] = []; // Aquí se almacenarán las consultas del foro
  createMode = false; // Controla si se muestra el modal de creación
  newConsulta = { asunto: '', mensaje: '' }; // Nueva consulta

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    this.loadConsultas();
  }

  // Leer consultas desde Firestore
  loadConsultas() {
    const consultasCollection = collection(this.firestore, 'foro');
    collectionData(consultasCollection, { idField: 'id' }).subscribe((data) => {
      this.consultas = data;
    });
  }

  // Agregar una nueva consulta a Firestore
  addConsulta() {
    const consultasCollection = collection(this.firestore, 'foro');
    addDoc(consultasCollection, this.newConsulta).then(() => {
      this.newConsulta = { asunto: '', mensaje: '' }; // Resetea el formulario
      this.createMode = false; // Cierra el modal
    });
  }

  // Alternar el modal de creación
  toggleCreateMode() {
    this.createMode = !this.createMode;
  }
}

