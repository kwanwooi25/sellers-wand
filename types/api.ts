export type SuccessResponse<T> = {
  result: 'SUCCESS';
  data: T;
};

export type FailedResponse = {
  result: 'FAILED';
  message?: string;
};
