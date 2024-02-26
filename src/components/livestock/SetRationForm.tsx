



import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getFarmFeed } from "@/services/livestockService";
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
import { BiSolidBowlRice } from "react-icons/bi";

type FeedItem = {
  value: string;
  label: string;
};
interface SetFeedRationProps {
  row: any;
}

const SetFeedRation: React.FC<SetFeedRationProps> = ({ row }) => {
  const [feedNames, setFeedNames] = useState<string[]>([]);
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any[] = await getFarmFeed();
        const names: string[] = data.map((feed) => feed.name);
        setFeedNames(names);
      } catch (error) {
        console.error("Error fetching feed data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFeedSelection = (value: string) => {
    setSelectedFeed(value);
    setEditedName(value); // Update editedName when selecting a feed
  };

  const handleEditName = () => {
    setEditMode(true);
 
    setEditedName(selectedFeed ? `${row.animal_type}-${selectedFeed}` : row.animal_type);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };

  const handleSubmitName = () => {
    setSelectedFeed(editedName.split("-")[0]); 
    console.log("Edited name:", editedName);
    setEditMode(false);
  };


  return (
    <div>
      <h1></h1>
      <DialogTitle className="mb-6 flex justify-between items-center">
      <span>
  {editMode ? (
    <input
      type="text"
      value={editedName}
      onChange={handleNameChange}
    />
  ) : (
    <>
      {selectedFeed && `${editedName || selectedFeed}-${row.animal_type}`}
      {!selectedFeed && `${row.animal_type}`}
    </>
  )}
</span>


        <span className="material-icons" onClick={handleEditName}>
          <CiEdit />
        </span>
      </DialogTitle>
      {/* <Input type="email" placeholder="Email" /> */}

      {editMode && (
        <div>
          <Label htmlFor="editedName">Edited Name</Label>
          <Input
            type="text"
            id="editedName"
            value={editedName}
            onChange={handleNameChange}
          />
        </div>
      )}

      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Feed Name or ID</Label>
            <Select
              onValueChange={(value: string) => handleFeedSelection(value)}
            >
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select Feed" />
              </SelectTrigger>
              <SelectContent position="popper">
                {feedNames.map((name, index) => (
                  <SelectItem key={index} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-1.5 pt-2">
            <Label htmlFor="framework">Daily Ration</Label>
            <Select>
              <SelectTrigger id="framework">
                <SelectValue placeholder="0" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="sveltekit">SvelteKit</SelectItem>
                <SelectItem value="astro">Astro</SelectItem>
                <SelectItem value="nuxt">Nuxt.js</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetFeedRation;
