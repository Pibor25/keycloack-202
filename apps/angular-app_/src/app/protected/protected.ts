import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { interval, map } from 'rxjs';


@Component({
  selector: 'app-protected',
  imports: [CommonModule, JsonPipe],
  templateUrl: './protected.html',
  styleUrl: './protected.css',
})
export class Protected {

  private keycloak = inject(Keycloak);
  tokenParsed = this.keycloak.tokenParsed;

  secondsRemaining$ = interval(1000).pipe(
      map(() => {        
        this.keycloak.updateToken(280).then(refreshed => {
          if (refreshed) {
            console.log('Token refreshed');
          } else {
            console.log('Token valid, no need to refresh');
          }
        })
        .catch(() => {        console.error('Failed to refresh token');
        });
        const exp = this.keycloak.tokenParsed?.exp ?? 0;
        const now = Math.floor(Date.now() / 1000);
        return exp - now;

      })      
  );

}
