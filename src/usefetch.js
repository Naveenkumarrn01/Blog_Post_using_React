import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [ispending, setIspending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for the resource");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIspending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "Abortrror") {
            console.log("fetch aborted");
          } else {
            setIspending(false);
            setError(err.message);
          }
        });
    }, 1000);

    return () => abortCont.abort();
  }, [url]);

  return { data, ispending, error };
};

export default useFetch;
