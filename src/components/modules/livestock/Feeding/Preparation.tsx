
import * as React from "react"
import { Textarea } from "@/components/common/ui/textarea"
import { FaPlus } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { Button } from "@/components/common/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card"
import { Input } from "@/components/common/ui/input"
import { Label } from "@/components/common/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select"

const Preparation = () => {
  return (
    <Card className="mt-4 rounded-2xl" >
     <CardHeader>
      <CardTitle className="flex">
      <span className="mr-2 bg-[#CCE6DA]  border-b rounded-full p-2">
        <FaArrowsRotate  className="text-green-500"/>
        </span>
        <span className="mt-2"> Preparation</span>
       
      </CardTitle>
    </CardHeader>
    <CardContent>
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Add Steps</Label>
            <Textarea placeholder="Type your message here." />
          </div>
          <div className="flex flex-col space-y-1.5">
            
            <Textarea placeholder="Type your message here." />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex justify-center">
      <Button className="bg-white border-green-400 border text-[#1B9C5C] w-[20rem] gap-2">
        <span className="">
        <FaPlus />
        </span>
       
        Add Step
        </Button>
    </CardFooter>
  </Card>
  )
}

export default Preparation
