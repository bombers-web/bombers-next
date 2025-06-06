import Head from "next/head";
import { useContext } from "react";
import { GlobalContext } from "../../pages/_app";
import { getStrapiMedia } from "../lib/media";
import { capitalize } from "lodash";

const Seo = ({ seo }) => {
  const { defaultSeo, siteName } = useContext(GlobalContext) || {
    defaultSeo: "Home",
    siteName: "Bombers RFC",
  };

  const seoWithDefaults = {
    ...defaultSeo,
    ...seo,
  };
  const fullSeo = {
    ...seoWithDefaults,
    // Add title suffix
    metaTitle: `${capitalize(seoWithDefaults.metaTitle)} | ${siteName}`,
    // Get full image URL
    shareImage: getStrapiMedia(
      seoWithDefaults.shareImage || "/images/nationals17.png"
    ),
  };

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.content && <meta property="og:type" content="content" />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
};

export default Seo;
