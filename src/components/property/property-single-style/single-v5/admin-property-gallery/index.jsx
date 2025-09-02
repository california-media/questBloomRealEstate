import React from "react";
import GalleryBox from "./GalleryBox";
import GoogleMapEmbed from "./Map";

const AdminPropertyGallery = ({ photos, loading, googleMapsLink }) => {
  return (
    <>
     

      <div className="ps-v4-hero-tab ">
        <div className="tab-content overflow-visible" id="pills-tabContent2">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="container-fluid p-0">
              <div className="row" data-aos="fade-up" data-aos-delay="300">
                <div className="col-lg-12">
                  <div className="ps-v4-hero-slider-2 ">
                    {/* /// different gallery box for admin and offplan */}
                    <GalleryBox loading={loading} photos={photos} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPropertyGallery;
