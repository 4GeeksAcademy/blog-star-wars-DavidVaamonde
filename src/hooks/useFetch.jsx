import { useEffect, useState } from "react";

export const useFetch = (fetchFunction, id = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const result = id ? await fetchFunction(id) : await fetchFunction();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, id]);

  return { data, loading, error };
};