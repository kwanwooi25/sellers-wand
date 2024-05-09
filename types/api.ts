export type SuccessResponse<T> = {
  result: 'SUCCESS';
  data: T;
  message?: string;
};

export type FailedResponse = {
  result: 'FAILED';
  data: null;
  message?: string;
};

export type ApiResponse<T> = SuccessResponse<T> | FailedResponse;
