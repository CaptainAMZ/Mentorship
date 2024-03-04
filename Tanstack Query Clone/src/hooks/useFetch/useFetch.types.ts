import { Status } from "../../types/status.interface";

export interface FetchResponse<T> {
    data: T | null;
    status: Status;
  }