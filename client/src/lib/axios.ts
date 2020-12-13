import {AxiosError} from 'axios';

export function isAxiosError(err: unknown): err is AxiosError {
  return (
    err &&
    err.hasOwnProperty('isAxiosError') &&
    (err as AxiosError).isAxiosError
  );
}
