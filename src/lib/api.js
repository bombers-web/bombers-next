export function getStrapiURL(path = "", useLocal) {
  return useLocal
    ? `http://localhost:1339${path}`
    : `${process.env.strapi}${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path, useLocal = false) {
  const requestUrl = getStrapiURL(path, useLocal);
  console.log({ requestUrl });
  try {
    const response = await fetch(requestUrl);
    return await response?.json();
  } catch (error) {
    console.error("We're offline");
    return {};
  }
}
