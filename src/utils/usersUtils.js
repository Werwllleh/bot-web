import {SITE} from "./consts";
import axios from "axios";

export const getUsersData = async () => {
  return (
    await axios.post(`${SITE}api/data`)
  )
}