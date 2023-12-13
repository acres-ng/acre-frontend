import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "@/components/ui/badge";

const LeftLayout = () => {
  return (
    <div className="h-screen fixed bg-white">
      <div className=""></div>
      <div className="bg-green-50 rounded-lg shadow-sm  nmd py-8 m-2 p-3">
        <h3 className="text-lg font-bold leading-tight text-green-900 my-5">
          Tasks
        </h3>

        <Card>
          <CardContent className="p-2">
            <div className="flex justify-between">
              <p className="text-gray-700 text-sm max-w-sm">
                {" "}
                Preparation of new feed using revised recipe
              </p>
              <span className="bg-red-100 flex justify-center items-center text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full w-14">
                Red
              </span>
            </div>

            <p className="text-gray-500 text-xs pt-2">Due 24 Oct, 2023</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeftLayout;
