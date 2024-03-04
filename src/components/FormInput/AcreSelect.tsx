import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMeasuringUnits } from "@/services/farmService";
import HttpService from "@/services/HttpService";
import { getBasicUtils } from "@/services/livestockService";
import { FormControl } from "@chakra-ui/react";
import { getLocalItem } from "@/services/localCacheService";

type MeasuringUnitFilter = {
  type?: string;
  system?: string;
  onchange: (e: any) => void;
};
type BasicSelectProps = {
  options?: string[];
  onchange: (e: any) => void;
  preSelectedOption?: string;
  className?: string;
  placeholder?: string;
};
const defaultMeasuringUnitType = "mass";
const defaultMeasuringUnitSystem = "metric";

const MeasuringUnitSelect: React.FC<MeasuringUnitFilter> = ({
  type,
  system,
  onchange,
}) => {
  const [measuringUnits, setMeasuringUnits] = useState([]);
  const [defaultValue, setDefaultValue] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMeasuringUnits(
      type ?? defaultMeasuringUnitType,
      system ?? defaultMeasuringUnitSystem
    ).then((data) => {
      setMeasuringUnits(data);
      setDefaultValue(data[0].symbol);
      onchange(data[0].symbol);
      setIsLoading(false);
    });
  }, []);

  const options = () => {
    return measuringUnits.map((unit: any, index) => (
      <SelectItem key={index} value={unit.symbol}>
        {unit.symbol}
      </SelectItem>
    ));
  };

  return (
    !isLoading && (
      <Select defaultValue={defaultValue} onValueChange={onchange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{options()}</SelectContent>
      </Select>
    )
  );
};

const CurrencySelect: React.FC<BasicSelectProps> = ({ onchange }) => {
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
      <SelectItem key={index} value={currency}>
        {currency}
      </SelectItem>
    ));
  };

  return (
    !isLoading && (
      <Select defaultValue={defaultValue} onValueChange={onchange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{options()}</SelectContent>
      </Select>
    )
  );
};

const LivestockStatusSelect: React.FC<BasicSelectProps> = ({
  onchange,
  preSelectedOption,
  className,
  placeholder = "",
}) => {
  const stats = getLocalItem("statuses");
  const statuses = stats ?? ["Unknown"];
  const defaultValue = preSelectedOption ?? statuses[0].display_name;

  const selectOptions = () => {
    return statuses?.map((status: any, index) => (
      <SelectItem key={index} value={status.name}>
        {status.display_name}
      </SelectItem>
    ));
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={onchange}>
      {/* <FormControl> */}
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{selectOptions()}</SelectContent>
      {/* </FormControl> */}
    </Select>
  );
};

export { MeasuringUnitSelect, CurrencySelect, LivestockStatusSelect };
