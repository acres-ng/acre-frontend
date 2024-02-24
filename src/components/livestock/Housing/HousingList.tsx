import React, { useEffect, useState } from "react";
import HousingCard from "./HousingCard";
import { getLivestockHousing } from "@/services/livestockService";
import { AcreLoader } from "@/components/ui/acreLoader";
import { NoResourcesCard } from "../Tables";
const Housing = () => {
  const [housingData, setHousingData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getLivestockHousing().then((data) => {
      setHousingData(data);
      setLoading(false);
    });
  }, []);

  const EmptyState = () => {
    return (
      <NoResourcesCard
        imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/bd51dbfefabec61626aceec83bcbea198f0cbbf004dcb1e0ff1c5ed65f6f2d2c?"
        imageAlt="No housing image"
        infoText="You have not created have any housing for your livestock yet. Click on the button below to get started"
      />
    );
  };

  const housingList = () => {
    return (
      <div>
        {housingData.map((housing: any) => (
          <HousingCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/1e66db5dd048e84db4e051b5b791d95d19c683293a9e470e0540c531fd532f00?apiKey=33b7de9dd450419096342a2b77215ab6&"
            imageAlt={housing.name + " image"}
            info={{
              name: housing.name,
              totalCount: housing.total_livestock_count,
              housingType: "Shed",
              description: housing.description,
              icons: [
                {
                  src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4435fc71ddacf14e31ee808d2555371456a52593ec599d8939b2c6bc02661a95?apiKey=33b7de9dd450419096342a2b77215ab6&",
                  alt: "icon",
                },
                {
                  src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5f31f01df7e07e14f4f54fa72e5ade6e0be84d0459f28c68c22a5d0f0ce955c8?apiKey=33b7de9dd450419096342a2b77215ab6&",
                  alt: "icon",
                },
              ],
            }}
          />
        ))}
      </div>
    );
  };

  return <div>{isLoading ? <AcreLoader text="Loading your livestock housing..."/> : housingData[0] ? housingList() : <EmptyState />}</div>;
};

export default Housing;
