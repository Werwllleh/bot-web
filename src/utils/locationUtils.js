import axios from "axios";
import {API} from "./consts";

export const setLocation = async (data) => {
  return (
    await axios.post(`${API}api/set-location`, {data})
  )
}
