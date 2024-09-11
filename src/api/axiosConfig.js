import { Axios } from "axios";

export default Axios.create({
    baseURL: '',
    headers: {"ngrok-skip-browser-warning": "true"}
})