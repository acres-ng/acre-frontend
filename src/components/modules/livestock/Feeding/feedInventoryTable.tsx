import React, { useState, useEffect } from "react";
import InventoryTable from './inventoryTable'
import { getFarmFeed } from "@/services/livestockService";

const FeedInventoryTable = () => {
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

export default FeedInventoryTable

