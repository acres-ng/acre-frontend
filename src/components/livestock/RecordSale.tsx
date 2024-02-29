import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BiSolidBowlRice } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RecordSale = () => {
  return (
    <div className=" rounded-2xl">
 <CardHeader>
      <CardTitle className="flex">
        <span className="mr-2 bg-[#CCE6DA]  border-b rounded-full p-2">
          <BiSolidBowlRice   className="text-green-500"/>
        </span>
        <span className="mt-2">Add Sale Transaction</span>
       
      </CardTitle>
    </CardHeader>
    <CardContent>
    <form>
  <div className="grid w-full items-center gap-4">
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="name">Recipe Name or ID</Label>
      <Input id="name" placeholder="eg Ultima DIY" />
    </div>

    <div className="flex space-x-4 pt-2">
      {/* Livestock Type */}
      <span className="flex flex-col space-y-1.5 w-full">
        <Label htmlFor="livestock-type">Livestock Type</Label>
        <Select>
          <SelectTrigger id="livestock-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="next">Next.js</SelectItem>
            <SelectItem value="sveltekit">SvelteKit</SelectItem>
            <SelectItem value="astro">Astro</SelectItem>
            <SelectItem value="nuxt">Nuxt.js</SelectItem>
          </SelectContent>
        </Select>
      </span>

      {/* Livestock Maturity */}
      <span className="flex flex-col space-y-1.5 w-full">
        <Label htmlFor="livestock-maturity">Livestock Maturity</Label>
        <Select>
          <SelectTrigger id="livestock-maturity">
            <SelectValue placeholder="Select maturity" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="next">Next.js</SelectItem>
            <SelectItem value="sveltekit">SvelteKit</SelectItem>
            <SelectItem value="astro">Astro</SelectItem>
            <SelectItem value="nuxt">Nuxt.js</SelectItem>
          </SelectContent>
        </Select>
      </span>
    </div>

    <div className="flex flex-col space-y-1.5 pt-2">
      <Label htmlFor="framework">Recipe Quantity</Label>
      <Select>
        <SelectTrigger id="framework">
          <SelectValue placeholder="Enter Quantity" />
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

    </CardContent>
 
  </div>
  )
}

export default RecordSale