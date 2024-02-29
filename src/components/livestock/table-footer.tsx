// import { Button } from "rizzui";
import { Title, Text } from "rizzui";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiDeleteBin6Line } from "react-icons/ri";

interface TableFooterProps {
  checkedItems: string[];
  handleDelete: (ids: string[]) => void;
}

export default function TableFooter({
  checkedItems,
  handleDelete,
  children,
}: React.PropsWithChildren<TableFooterProps>) {
  if (checkedItems.length === 0) {
    return null;
  }

  return (
    <div className="sticky bottom-0 left-0 z-10 mt-2.5 flex justify-end w-full items-center  ">
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <RiDeleteBin6Line className="text-red-500" />
          </DialogTrigger>
          <DialogContent className=" rounded-2xl">
            <CardHeader>
              <CardTitle className="flex">
                <span className="mr-2 bg-red-200  border-b rounded-full p-2">
                  <FaRegTrashAlt className="text-red-500" />
                </span>
                <span className="mt-2"> Delete Livestock</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text as="strong">{checkedItems.length}</Text> selected{" "}
              {/* <DialogTitle>Are you sure you want to permanently delete Livestock Name/ID from your farm?</DialogTitle> */}
              <DialogDescription className="font-medium text-black">
                Are you sure you want to permanently delete Livestock Name/ID
                from your farm?
              </DialogDescription>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Button className="bg-white text-black shadow-md w-full">
                Cancel
              </Button>
              <Button className="bg-red-500 w-full">Delete</Button>
            </CardFooter>
          </DialogContent>
        </Dialog>
      </div>
      {children}
    </div>
  );
}
