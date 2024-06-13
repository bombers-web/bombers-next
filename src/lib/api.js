export function getStrapiURL(path = "", useLocal) {
  return useLocal
    ? `http://localhost:1337/api${path}`
    : `${process.env.strapi}${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path, useLocal = false) {
  const requestUrl = getStrapiURL(path, useLocal);
  try {
    const response = await fetch(requestUrl);
    const json = await response?.json();
    return json.data;
  } catch (error) {
    console.error("We're offline");
    throw new Error(error);
  }
}
