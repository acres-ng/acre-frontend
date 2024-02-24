import * as React from "react";
import { Hourglass } from "react-loader-spinner";

type LoaderProps = {
  text?:string,
}
const AcreLoader: React.FC<LoaderProps> = ({text = "Loading..."}) => {
  return (
    <div
      className="lg:px-8 grid grid-cols-10 end-3"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        flexDirection: "column",
        position: "fixed",
        width: "100%",
        height: "100%",
      }}
    >
      <div>
        <Hourglass
          height="100"
          width="100"
          colors={["#16A349", "#CCE6DA"]}
          ariaLabel="three-dots-loading"
        />
      </div>
      <div className="mt-2">
        <span>{text}</span>
      </div>
    </div>
  );
};

export { AcreLoader };
