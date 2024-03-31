import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
});
const accessKey = "yavGcAFrlnMu2OlPo-KVjsSI2RlSDF7PFdxSLkp_G7k";

export const requestPhotos = async (query = "", page = 1) => {
  const { data } = await instance.get(
    `search/photos/?client_id=${accessKey}&per_page=12&query=${query}&page=${page}`
  );
  return data;
};
