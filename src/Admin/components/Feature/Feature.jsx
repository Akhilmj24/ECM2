import React, { useState } from "react";
import "./feature.scss";
import Loading from "../../../pages/Loading/Loading";
import FeatureSection from "./Feature Sections/FeatureSection";

function Feature() {
  const [loading, setloading] = useState(false);
  return (
    <div className="featureConatiner">
      {loading ? (
        <Loading />
      ) : (
        <div className="featureSection">
          <FeatureSection
            setloading={setloading}
            feature={"brand"}
            createFeature={"createBrand"}
            isImage={true}
            uploadFeatureName={"brandname"}
          />
           <FeatureSection
            setloading={setloading}
            feature={"subcategory"}
            createFeature={"createsubcategory"}
            isImage={true}
            uploadFeatureName={"subcategoryname"}
          />
           <FeatureSection
            setloading={setloading}
            feature={"category"}
            createFeature={"createcategory"}
            isImage={true}
            uploadFeatureName={"categoryname"}
          />
          <FeatureSection
            setloading={setloading}
            feature={"color"}
            createFeature={"createColor"}
            isImage={false}
            uploadFeatureName={"colorname"}
          />
         
         
          <FeatureSection
            setloading={setloading}
            feature={"fabric"}
            createFeature={"createfabric"}
            isImage={false}
            uploadFeatureName={"fabricname"}
          />
          <FeatureSection
            setloading={setloading}
            feature={"fit"}
            createFeature={"createfit"}
            isImage={false}
            uploadFeatureName={"fitname"}
          />
          <FeatureSection
            setloading={setloading}
            feature={"multipack"}
            createFeature={"createmultipack"}
            isImage={false}
            uploadFeatureName={"multipackname"}
          />
          <FeatureSection
            setloading={setloading}
            feature={"neck"}
            createFeature={"createneck"}
            isImage={false}
            uploadFeatureName={"neckname"}
          />
          <FeatureSection
            setloading={setloading}
            feature={"occasion"}
            createFeature={"createoccasion"}
            isImage={false}
            uploadFeatureName={"occasionname"}
          />
        </div>
      )}
    </div>
  );
}

export default Feature;
