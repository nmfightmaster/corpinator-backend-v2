import logger from "./logger.js";
import { ssoException } from "../exceptions/SsoException.js";

export let authorizationEndpoint = "";
export let tokenEndpoint = "";
export let jwksUri = "";
export let revokeEndpoint = "";

export async function loadEveAuthURLs() {
  try {
    const response = await fetch(
      "https://login.eveonline.com/.well-known/oauth-authorization-server",
    );
    if (!response.ok) {
      throw new ssoException(
        response.status,
        `Failed to fetch EVE Online auth URLs: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    authorizationEndpoint = data.authorization_endpoint;
    tokenEndpoint = data.token_endpoint;
    jwksUri = data.jwks_uri;
    revokeEndpoint = data.revocation_endpoint;
  } catch (error) {
    logger.error(`Error loading EVE Online auth URLs: ${error}`);
    throw error;
  }
}
