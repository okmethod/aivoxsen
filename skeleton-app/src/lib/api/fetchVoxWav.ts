import { constructRequestInit, fetchApi } from "$lib/utils/request";
import { pathVox } from "$lib/api/paths";

interface RequestJson {
  model?: string;
  style?: number;
  text: string;
}

async function fetchVoxWav(fetchFunction: typeof fetch, text: string): Promise<Blob> {
  const url = pathVox;
  const requestInit = constructRequestInit();
  const requestBody: RequestJson = {
    text,
  };
  const requestConfig = {
    ...requestInit,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  const wavBlob = await response.blob();
  return wavBlob;
}

export default fetchVoxWav;
