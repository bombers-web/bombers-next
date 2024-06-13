import { flattenData } from "../../utils/apiHelpers";

export function getStrapiURL(path = "", useLocal) {
  return useLocal
    ? `${process.env.strapi}${path}`
    : `${process.env.strapi}${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path, useLocal = false) {
  const requestUrl = getStrapiURL(path, useLocal);
  try {
    const response = await fetch(requestUrl);
    const { data } = await response?.json();
    return flattenData(data);
  } catch (error) {
    console.error("We're offline");
    throw new Error(error);
  }
}
