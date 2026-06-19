import { authenticatedFetch } from "../../clients/EsiClient.js";
import CharacterDetail from "../../models/esi/characters/CharacterDetail.js";
import CharacterAsset from "../../models/esi/characters/CharacterAsset.js";

async function fetchCharacterDetail(characterId: number) {
  const response = await authenticatedFetch(
    "GET",
    `/characters/${characterId}`,
    characterId,
  );
  const data = (await response.json()) as CharacterDetail;
  return data;
}

async function fetchCharacterAssets(characterId: number) {
  const response = await authenticatedFetch(
    "GET",
    `/characters/${characterId}/assets`,
    characterId,
  );
  const data = (await response.json()) as CharacterAsset[];
  return data;
}

export { fetchCharacterDetail, fetchCharacterAssets };
