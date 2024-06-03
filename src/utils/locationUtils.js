import axios from "axios";
import {SITE} from "./consts";

export const setLocation = async (data) => {
  return (
    await axios.post(`${SITE}api/set-location`, {data})
  )
}
