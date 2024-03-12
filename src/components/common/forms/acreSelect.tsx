import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { getMeasuringUnits } from "@/services/farmService";

type MeasuringUnitFilter = {
  type?: string;
  system?: string;
  onchange: (e: any) => void;
};
type BasicSelectProps = {
  onchange: (e: any) => void;
};
const defaultMeasuringUnitType = "mass";
const defaultMeasuringUnitSystem = "metric";

const MeasuringUnitSelect: React.FC<MeasuringUnitFilter> = ({
  type,
  system,
  onchange
}) => {
  const [measuringUnits, setUnits] = useState<object[]>([]);
  const [defaultValue, setDefaultValue] = useState<string>("kg");
  const [isLoading, setIsLoading] = useState(true);

  const getUnits = async () => {
    const result = await getMeasuringUnits(
          type ?? defaultMeasuringUnitType,
          system ?? defaultMeasuringUnitSystem);
    setUnits(result);
    setDefaultValue(result[0].symbol);
    onchange(result[0].symbol);
  };


  useEffect(() => {
    getUnits().then(() => setIsLoading(false));
  }, []);

  const options = () => {
    return measuringUnits?.map((unit: any, index) => (
      <SelectItem key={index} value={unit.symbol}>{unit.symbol}</SelectItem>
    ));
  };

  return (!isLoading &&
    <Select defaultValue={defaultValue} onValueChange={onchange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>{options()}</SelectContent>
    </Select>
  );
};

const CurrencySelect: React.FC<BasicSelectProps> = ({
  onchange
}) => {
  const [currencies, setCurrencies] = useState<string[]>();
  const [defaultValue, setDefaultValue] = useState("NGN");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      setCurrencies(["NGN"]);
      setDefaultValue("NGN");
      onchange("NGN");
      setIsLoading(false);
  }, []);

  const options = () => {
    return currencies?.map((currency: string, index) => (
      <SelectItem key={index} value={currency}>{currency}</SelectItem>
    ));
  };

  return (!isLoading &&
    <Select defaultValue={defaultValue} onValueChange={onchange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>{options()}</SelectContent>
    </Select>
  );
};

export { MeasuringUnitSelect, CurrencySelect};
