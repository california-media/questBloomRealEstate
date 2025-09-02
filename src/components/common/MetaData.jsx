import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function MetaData({ meta }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{meta?.title || "Default Title"}</title>
        <meta name="description" content={meta?.description || " "} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
    </HelmetProvider>
  );
}
