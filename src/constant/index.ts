export const FILTER_DATE = {
  TODAY: '2023-03-08',
} as const;

export const initialFilter = [
  { id: 'status', value: '' },
  { id: 'customer_name', value: '' },
  { id: 'date', value: FILTER_DATE.TODAY },
];
