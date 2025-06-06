export function getStrapiURL(path = "") {
  return `${process.env.strapi}${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  try {
    const response = await fetch(requestUrl, {
      cache: "no-store",
      next: {
        revalidate: 0,
        tags: ["strapi-data"],
      },
    });
    const json = await response?.json();
    return json.data;
  } catch (error) {
    console.error("Something went wrong", error);
    throw new Error(error);
  }
}
