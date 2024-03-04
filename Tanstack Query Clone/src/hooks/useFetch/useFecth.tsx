import { useState, useEffect } from "react";
import { Status } from "../../types/status.interface";
import { ErrorData } from "../../types/errorData.interface";
import { FetchResponse } from "./useFetch.types";

const useCustomFetch = <T,>(
  url: string,
  onError: (errorData: ErrorData) => void
): FetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        const response = await fetch(url);
        if (!response.ok) {
          const err = new Error("An error occured");
          (err as any).response = response;
          throw err;
        }
        const responseData: T = await response.json();
        setData(responseData);
        setStatus("success");
      } catch (error) {
        console.log({ error });
        const errorData: ErrorData = {
          message: (error as Error)?.message || "Unknown error occurred",
          code: (error as any)?.response.status ?? undefined,
        };
        onError(errorData);
        setStatus("error");
      }
    };

    fetchData();
  }, [url]);

  return { data, status };
};

export default useCustomFetch;
