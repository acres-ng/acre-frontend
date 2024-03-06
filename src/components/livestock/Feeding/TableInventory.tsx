import React, { useState, useEffect } from "react";
import InventoryTable from './InventoryTable'
import { getFarmFeed } from "@/services/livestockService";

const TableInventory = () => {
    const [feedData, setFeedData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        getFarmFeed().then((res) => {
          setFeedData(res);
          setLoading(false);
        });
      }, []);
  return (
    <div> <InventoryTable data={feedData} /></div>
  )
}

export default TableInventory

