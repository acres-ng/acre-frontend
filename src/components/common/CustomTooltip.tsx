import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../common/ui/tooltip";
// import { Tooltip, Text } from "rizzui";
import { Button } from "rizzui";

interface CustomTooltipProps {
  triggerText: ReactNode;
  tooltipContent: ReactNode;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
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

export default CustomTooltip;


