// import React, { useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Typography,
// } from "@material-tailwind/react";

// interface SucessDialogueProps {
//   open: boolean;
//   onClose: () => void;
// }

// const SucessDialogue: React.FC<SucessDialogueProps> = ({ open, onClose }) => {
//   const handleOpen = () => onClose();

//   return (
//     <>
//       <Dialog placeholder="" open={open} handler={handleOpen}>
//         <DialogHeader placeholder="">
//           <Typography placeholder="" variant="h5" color="blue-gray">
//             Your Attention is Required!
//           </Typography>
//         </DialogHeader>
//         <DialogBody divider placeholder="" className="grid place-items-center gap-4">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="h-16 w-16 text-red-500"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <Typography placeholder="" color="red" variant="h4">
//             You should read this!
//           </Typography>
//           <Typography placeholder="" className="text-center font-normal">
//             A small river named Duden flows by their place and supplies it with the necessary regelialia.
//           </Typography>
//         </DialogBody>
//         <DialogFooter placeholder="" className="space-x-2">
//           <Button placeholder="" variant="text" color="blue-gray" onClick={handleOpen}>
//             close
//           </Button>
//           <Button placeholder="" variant="gradient" onClick={handleOpen}>
//             Ok, Got it
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </>
//   );
// };

// export default SucessDialogue;





import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"


interface SucessDialogueProps {
    open: boolean;
    onClose: () => void;
  }
  
  
  const SucessDialogue: React.FC<SucessDialogueProps> = ({ open, onClose }) => {
    const handleOpen = () => onClose();
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
       
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      );
};

export default SucessDialogue;

  
