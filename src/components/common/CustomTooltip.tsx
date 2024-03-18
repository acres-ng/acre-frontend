// import React from "react";
// import { Tooltip, Text } from "rizzui";
// import { InformationCircleIcon } from "@heroicons/react/24/solid";

// interface CustomTooltipProps {
//   title: string;
//   content: string;
// }

// const CustomTooltip: React.FC<CustomTooltipProps> = ({ title, content }) => {
//   return (
//     <div className="w-40 text-start">
//       <div className="inline-flex items-center gap-2 text-base mb-1.5">
//         <InformationCircleIcon className="w-5 h-5" />
//         <Text className="font-bold text-lg">{title}</Text>
//       </div>
//       <Text className="text-sm text-gray-600">{content}</Text>
//     </div>
//   );
// }

// export default CustomTooltip;

// import { Button } from "rizzui"
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../common/ui/tooltip"

// export default function CustomTooltip() {
//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Button variant="outline">Hover</Button>
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>Add to library</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   )
// }

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

// import { Tooltip, Text, Button } from "rizzui";
// import { InformationCircleIcon } from "@heroicons/react/24/solid";

// export default function CustomTooltip() {
//   return (
//     <div className="w-40 text-start">
//       <div className="inline-flex items-center gap-2 text-base mb-1.5">
//         <InformationCircleIcon className="w-5 h-5" />
//         <Text>Tooltip Title</Text>
//       </div>
//       <Text className="text-sm text-gray-600">
//         This is a tip to help you accomplish a task.
//       </Text>
//     </div>
//   );
// }
