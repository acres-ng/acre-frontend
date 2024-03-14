import React from "react";

// types
type EmptyTableStateProps = {
  imageSrc: string;
  imageAlt: string;
  infoText: string;
  actionButton?: React.ReactNode;
};

// components
const NoResourcesCard: React.FC<EmptyTableStateProps> = ({
  imageSrc,
  imageAlt,
  infoText,
  actionButton,
}) => {
  return (
    <div className="items-stretch bg-white flex flex-col pt-3 pb-12 px-8 max-md:px-5">
      <img
        loading="lazy"
        src={imageSrc}
        alt={imageAlt}
        className="aspect-[1.54] object-contain object-center w-[500px] overflow-hidden self-center max-w-full mt-10 max-md:mt-3"
      />
      <div className="text-zinc-500 text-center text-sm leading-5 self-center max-w-[466px] mt-8 max-md:max-w-full">
        {infoText}
      </div>
      <span className="justify-end items-stretch bg-green-600 self-center flex gap-2 mt-8 mb-24 px-4 py-3.5 rounded-xl max-md:mb-10">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccdb2f2b68080580aa7837cf3c49aed36dc1fa5986139cce42f014f5d8151f02?"
          className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
        />
        <div className="text-white text-sm font-semibold self-center grow whitespace-nowrap my-auto">
          {actionButton}
        </div>
      </span>
    </div>
  );
};

const NoFilterResultsCard: React.FC<EmptyTableStateProps> = ({
  imageSrc,
  imageAlt,
  infoText,
  actionButton,
}) => {
  return (
    <div className="items-stretch bg-white flex flex-col pt-3 pb-12 px-8 max-md:px-5">
      <img
        loading="lazy"
        src={imageSrc}
        alt={imageAlt}
        className="aspect-[1.54] object-contain object-center w-[500px] overflow-hidden self-center max-w-full mt-10 max-md:mt-3"
      />
      <div className="text-zinc-500 text-center text-sm leading-5 self-center max-w-[466px] mt-8 max-md:max-w-full">
        {infoText}
      </div>
      <div className="text-white text-sm font-semibold self-center grow whitespace-nowrap my-auto">
        {actionButton}
      </div>
    </div>
  );
};

export { NoResourcesCard, NoFilterResultsCard };
