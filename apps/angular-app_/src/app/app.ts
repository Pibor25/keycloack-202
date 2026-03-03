import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { getKeycloakInstance } from './keycloak';

import Keycloak from 'keycloak-js';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,  RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('angular-app');
  private keycloak = inject(Keycloak);



  ngOnInit() {
    const kc = getKeycloakInstance();
    console.log('Inicializado:', !!this.keycloak);
    console.log('Autenticado:', this.keycloak.authenticated);
  }  

    logout() {
    this.keycloak.logout({
        redirectUri: window.location.origin               
      });
  }
}
