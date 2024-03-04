import React from "react";
import useCustomFetch from "./hooks/useFetch/useFecth";
import { ErrorData } from "./types/errorData.interface";
import { DataType } from "./types/dataType.interface";

import "./App.css"

const MyComponent: React.FC = () => {
  const onError = (errorData: ErrorData) => {
    console.log(errorData);
  };

  const { data, status } = useCustomFetch<DataType[]>(
    "https://jsonplaceholder.typicode.com/users",
    onError
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <>error</>;
  }

  if (status === "success") {
    return (
      <div>
        {data?.map((user) => (
          <div key={user.username} className="user">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.username}</span>
            <span>{user.phone}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default MyComponent;
