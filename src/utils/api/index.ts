import axios from 'axios';

import type { DataResponse } from 'types';

export const getOrderListDataApi = async () => {
  try {
    const { data: response }: { data: DataResponse[] } = await axios.get(`/data/mock_data.json`);
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
