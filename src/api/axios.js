import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "b22c3e08057f6bdb6c39261cc9d37af8",
        language: "ko-KR"
    }
})

export default instance;