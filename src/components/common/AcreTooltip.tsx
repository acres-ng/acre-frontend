import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
// import { Tooltip, Text } from "rizzui";
import { Button } from "rizzui";

interface AcreTooltipProps {
  triggerText: ReactNode;
  tooltipContent: ReactNode;
}

const AcreTooltip: React.FC<AcreTooltipProps> = ({
  triggerText,
  tooltipContent,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{triggerText}</div>
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AcreTooltip;