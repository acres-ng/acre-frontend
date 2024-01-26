import { getActiveFarm } from "./farmService";
import * as config from "../config";
import http, { getDefaultOptions } from "./HttpService";
import { toast } from "sonner";

export const getLivestockHousing = async (housingId?: string) => {
  const activeFarmId = getActiveFarm().id;
  let url = `${config.API_URL}farms/${activeFarmId}/housing`;
  url = housingId ? `${url}/${housingId}` : url;
  const { data } = await http.get(url, getDefaultOptions());
  if (data.status === "success") {
    return data.data;
  } else {
    toast.error(data.message);
    return null;
  }
};