import * as React from "react";
import { useEffect, useState } from "react";
import { getTransactionUtils } from "@/services/livestockService";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiExchangeDollarLine } from "react-icons/ri";
import { Button as Btn } from "rizzui";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import HttpService from "@/services/HttpService";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputGroup,
} from "@chakra-ui/react";
import {
  DialogClose,
} from "../ui/dialog";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getActiveFarm } from "@/services/farmService";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/config";

interface FormData {
  amount: number;
  category_id: number;
  transactionable_type: string;
  transactionable_id: string;
  quantity: number;
  description: string;
  notes: string;
}

interface RecordSaleProps {
  row: { uuid: string }; 
  
}

const RecordSale: React.FC<RecordSaleProps> = ({ row }) => {
  const [transactionUtils, setTransactionUtils] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  const transactionSchema = z.object({
    amount: z.number(),
    category_id: z.number(),
    transactionable_type: z.string(),
    transactionable_id: z.string(),
    quantity: z.number(),
    description: z.string(),
    notes: z.string(),
  });

  const { getValues, handleSubmit, register, setValue, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: undefined,
      category_id: undefined,
      transactionable_type: "",
      transactionable_id: "",
      quantity: undefined,
      description: "",
      notes: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactionUtils();
        setTransactionUtils(data);
        setIsLoading(false);
        setValue("category_id", data?.transaction_categories?.find((category: { name: string }) => category.name === "sale")?.id || 0);

      
        setValue("transactionable_type", data?.transactionable_types?.livestock || "");

        setValue("transactionable_id", row.uuid);
      } catch (error) {
        console.error("Error fetching transaction utilities:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  
  const onSubmit: SubmitHandler<z.infer<typeof transactionSchema>> = async (
    data
  ) => {
    console.log("Data to be submitted:", data);
    try {
      const userActiveFarmId = getActiveFarm().id;
      const response = await HttpService.post(
        `${API_URL}farms/${userActiveFarmId}/transactions`,
        data,
        HttpService.getDefaultOptions()
      );
      if (response.data) {
        toast.success("Transaction saved successfully!");
      } else {
        toast.error("Failed to save transaction. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex">
          <span className="mr-2 bg-[#CCE6DA] border-b rounded-full p-2">
            <RiExchangeDollarLine className="text-green-500" />
          </span>
          <span className="mt-2">Add Sale Transaction</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 pt-2">
              <Label htmlFor="amount">Amount</Label>
              <InputGroup>
                <Input
                  placeholder="Enter Amount"
                  className="text-center"
                  id="amount"
                  type="number"
                  {...register("amount", { valueAsNumber: true })}
                />
              </InputGroup>
              {errors.amount && <p>{errors.amount.message}</p>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                placeholder="Enter Quantity"
                {...register("quantity", { valueAsNumber: true })}
              />
              {errors.quantity && <p>{errors.quantity.message}</p>}
            </div>

            <div className="flex flex-col space-y-1.5 pt-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter Description"
                {...register("description")}
              />
              {errors.description && <p>{errors.description.message}</p>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Write Something"
                {...register("notes")}
              />
              {errors.notes && <p>{errors.notes.message}</p>}
            </div>

            <div className="flex mt-8 gap-[20px]">
              <DialogClose asChild>
                <Btn className="w-full text-black border-[3px] border-gray-200">
                  Cancel
                </Btn>
              </DialogClose>
              <Button
                className="w-full"
                disabled={!isValid}
              >
                Save Transaction
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </div>
  );
};

export default RecordSale;

