import React from "react";
import GoogleMapEmbed from "./property-gallery/Map";
import PropertyNearby from "../common/PropertyNearby";

const YoutubeVideoEmbed = ({ url }) => {
  // Function to extract video ID from URL
  const getYouTubeId = (url) => {
    if (!url) return null;

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="col-md-12 rounded ">
      <div className="ratio ratio-16x9 rounded">
        <iframe
          src={`https://www.youtube.com/embed/${getYouTubeId(url)}`}
          title="YouTube video player"
          className="rounded"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default YoutubeVideoEmbed;
