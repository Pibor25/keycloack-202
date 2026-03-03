import Keycloak from 'keycloak-js';
import { keycloakConfig } from './keycloak.config';


let keycloak: Keycloak;

export function initializeKeycloak(): Promise<boolean> {
  keycloak = new Keycloak({
    url: keycloakConfig.url,
    realm: keycloakConfig.realm,
    clientId: keycloakConfig.clientId
  });

  return keycloak.init({
    onLoad: 'check-sso',
    pkceMethod: 'S256',
    checkLoginIframe: false
  });
}

export function getKeycloakInstance(): Keycloak {
  return keycloak;
}