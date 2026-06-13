import scopes from './scopes.json' with { type: "json" };

 export function getScopes() {
    return scopes.join(' ');
 }