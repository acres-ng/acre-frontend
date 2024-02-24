import React from "react";

// types
type ImgAndIconProps = {
      src: string;
      alt: string;
      className?: string;
    };

type IconsSectionProps = {
  icons: ImgAndIconProps[];
};

type HousingInfoProps = {
    name: string;
    totalCount: number | undefined;
    housingType: string;
    description: string;
    icons: { src: string; alt: string }[];
  };

type HousingCardProps = {
    imageSrc: string,
    imageAlt: string,
    info: HousingInfoProps;
    };


// components
const ImageWithAlt: React.FC<ImgAndIconProps> = ({ src, alt, className }) => (
  <img loading="lazy" src={src} alt={alt} className={className}/>
);

const Icon: React.FC<ImgAndIconProps> = ({ src, alt }) => (
  <ImageWithAlt src={src} alt={alt} className="w-6 aspect-square" />
);

const IconsSection: React.FC<IconsSectionProps>  = ({ icons }) => (
  <div className="flex gap-1 justify-between self-stretch">
    {icons.map((icon, index) => (
      <Icon key={index} src={icon.src} alt={icon.alt} />
    ))}
  </div>
);

const HousingInfo: React.FC<HousingInfoProps> = ({ name, totalCount, housingType, description, icons }) => (
  <section className="flex flex-col py-2 pr-10 pl-5 max-md:mt-6 max-md:max-w-full">
    <header className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
      <h2 className="flex-auto text-xl font-semibold text-zinc-800">
      {name}
      </h2>
      <IconsSection
        icons={[
          {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/13e669575810de69aa674ad5e2551835a3db3b1c7b683b7d3a001191774b027d?apiKey=33b7de9dd450419096342a2b77215ab6&",
            alt: "Icon 1",
          },
          {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6cf87a6d2b6316f8ece0787f73c87ed6cd39412d7a623f3a97c0fb39f8957552?apiKey=33b7de9dd450419096342a2b77215ab6&",
            alt: "Icon 2",
          },
        ]}
      />
    </header>
    <p className="justify-center self-start px-2 py-0.5 mt-2 text-xs leading-5 text-green-600 whitespace-nowrap bg-emerald-50 rounded-lg aspect-[2.29]">
      {housingType}
    </p>
    <div className="flex gap-2 items-center self-start mt-2">
      <p className="grow self-stretch my-auto text-xs font-medium leading-5 whitespace-nowrap text-zinc-500">
       {totalCount} Livestock
      </p>
      <div className="self-stretch my-auto w-px h-5 bg-zinc-200" />
      <IconsSection
        icons={icons}
      />
    </div>
    <p className="mt-4 text-sm leading-5 text-zinc-500 max-md:max-w-full">
      {description}
    </p>
  </section>
);

const HousingCard: React.FC<HousingCardProps> = ({imageSrc, imageAlt, info}) => (
  <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md: mb-5">
    <aside className="flex flex-col w-[27%] max-md:ml-0 max-md:w-full">
      <ImageWithAlt
        src={imageSrc}
        alt={imageAlt}
        className="grow ml-4 w-full aspect-[1.75] max-w-[328px] max-md:mt-6"
      />
    </aside>
    <div className="flex flex-col ml-5 w-[73%] max-md:ml-0 max-md:w-full">
  <HousingInfo {...info} />
    </div>
  </div>
);

export default HousingCard;
