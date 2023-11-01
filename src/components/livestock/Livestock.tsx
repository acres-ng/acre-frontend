import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellRing } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const Livestock = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8">
        <div className="h-full space-y-6">
          <div className="flex justify-between flex-row items-center">
            <p className="text-2xl font-semibold leading-none tracking-tight">
              Livestock
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"default"}>+ Add livestock</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Livestock</DialogTitle>
                  <DialogDescription>
                    What is the quantity type of your livestock?
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Card className={cn("w-[380px] border-0")}>
                    <CardContent className="grid gap-4">
                      <div
                        className=" flex items-center space-x-4 rounded-md border p-4 cursor-pointer"
                        onClick={() => navigate("/livestock/add")}
                      >
                        <BellRing />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Single Entry
                          </p>
                          <p className="text-sm text-muted-foreground">
                            I want to add a single animal
                          </p>
                        </div>
                      </div>

                      <div className=" flex items-center space-x-4 rounded-md border p-4 cursor-pointer">
                        <BellRing />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Flock Entry
                          </p>
                          <p className="text-sm text-muted-foreground">
                            I want to add a flock of animals
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <DialogFooter className="flex w-full justify-between">
                  <Button variant={"outline"}>Cancel</Button>
                  <Button type="submit">Continue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Livestock;
