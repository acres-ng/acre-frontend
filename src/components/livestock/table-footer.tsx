// import { Button } from "rizzui";
import { Title, Text } from "rizzui";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "rizzui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
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
import HttpService from "@/services/HttpService";
import { API_URL } from "@/config";
import { getActiveFarm } from "@/services/farmService";

interface TableFooterProps {
  checkedItems: string[];
  onDeleteItem: (id: string | string[]) => void;
}

export default function TableFooter({
  checkedItems,
  onDeleteItem,
  children,
}: React.PropsWithChildren<TableFooterProps>) {
  const onDelete = async () => {
    console.log("Happending here>>>", checkedItems);
    try {
      onDeleteItem(checkedItems);
    } catch (error) {
      console.error("Error deleting livestock:", error);
    }
  };
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
              <DialogDescription className="font-medium text-black">
                Are you sure you want to permanently delete Livestock Name/ID
                from your farm?
              </DialogDescription>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <DialogClose asChild>
                <Button className="bg-white text-black shadow-md w-full">
                  Cancel
                </Button>
              </DialogClose>

              <Button className="bg-red-500 text-white w-full" onClick={onDelete}>
                Delete
              </Button>
            </CardFooter>
          </DialogContent>
        </Dialog>
      </div>
      {children}
    </div>
  );
}
