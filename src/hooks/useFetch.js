import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../utils/Service";
const userInfo = JSON.parse(localStorage.getItem("user"));

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BaseUrl}${url}`,{
          headers:{
            access_token:userInfo?.token
          }
        });
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BaseUrl}${url}`,{
        headers:{
          access_token:userInfo?.token
        }
      });
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
