interface DataResponse {
  id: number;
  transaction_time: string;
  status: boolean | string;
  customer_id: number;
  customer_name: string;
  currency: string;
}

export type { DataResponse };
