import * as Types from '@/app/login/lib/types';
import { AxiosPromise } from 'axios';
import axios from 'axios';

export const Login = ({ values }: { values: Types.IForm.Login }): AxiosPromise<Types.IApi.Login.Response> =>
  axios.post('/api/login', {
    username: values.username,
    password: values.password
  } as Types.IApi.Login.Request);
