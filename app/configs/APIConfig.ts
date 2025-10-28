import { createAsyncThunk, type AsyncThunk } from '@reduxjs/toolkit';
import {
  CancelToken,
  CANCEL_ERROR,
  CLIENT_ERROR,
  CONNECTION_ERROR,
  create,
  NETWORK_ERROR,
  SERVER_ERROR,
  TIMEOUT_ERROR,
  type ApiErrorResponse,
  type ApiResponse,
  type ApisauceInstance
} from 'apisauce';
import axios, { type AxiosRequestConfig, type CancelTokenSource, type Method } from 'axios';
import _ from 'lodash';
import { Strings, AppEnvConst } from '../constants';
import { formatString, getErrorResponse } from '../utils/CommonUtils';
import { APIErrorType } from './APIConfigTypes';
import { sentryCaptureAPIException } from './SentryConfig';
import type { ErrorResponse } from '../types';

/**
 * ResponseBound is an object that has a property called message that is a string or undefined.
 * @property {string} message - The message to display to the user.
 */
interface ResponseBound {
  message?: string;
}

/**
 * `ApiConfig` is an object with a required `api` property of type `ApisauceInstance`, a required
 * `method` property of type `Method`, a required `url` property of type `string`, an optional `data`
 * property of type `any`, an optional `params` property of type `Record<string, any>`, and an optional
 * `setting` property of type `Record<string, any>`.
 * @property {ApisauceInstance} api - The Apisauce instance that will be used to make the request.
 * @property {Method} method - The HTTP method to use.
 * @property {string} url - The url of the endpoint you're trying to hit.
 * @property {any} data - The data to be sent to the server.
 * @property {Record<string, any>} params - The query parameters to be sent with the request.
 * @property {AxiosRequestConfig<any>} setting - This is an object that contains the following properties:
 * @property {Record<string, any>} paths - The path query parameters to be set with the url.
 */
interface ApiConfig {
  api: ApisauceInstance;
  method: Method;
  url: string;
  data?: any;
  params?: Record<string, any>;
  setting?: AxiosRequestConfig<any>;
  paths?: Record<string, any>;
}

/**
 * `ThunkArg` is an object with optional properties `data`, `params`, and `setting`.
 * @property {any} data - The data that is passed to the thunk.
 * @property {Record<string, any>} params - The params object is used to pass in any parameters that are needed to make the
 * request.
 * @property {AxiosRequestConfig<any>} setting - This is the setting object that is passed to the action.
 * @property {Record<string, any>} paths - The path query parameters to be set with the url.
 */
export interface ThunkArg {
  data?: any;
  params?: Record<string, any>;
  setting?: AxiosRequestConfig<any>;
  paths?: Record<string, any>;
  shouldShowToast?: boolean;
}

/**
 * `ThunkApiConfig` is an object with a property named `rejectValue` whose value is an `ErrorResponse`.
 * @property {ErrorResponse} rejectValue - The value that will be returned when the promise is
 * rejected.
 */
export interface ThunkApiConfig {
  rejectValue: ErrorResponse;
}

/**
 * APIDispatch is an object with three properties: abort, unwrap, and requestId.
 * @property {() => void} abort - A function that aborts the request.
 * @property {() => Promise<Returned>} unwrap - This is a function that will return a promise that
 * resolves to the value returned by the thunk.
 * @property {string} requestId - A unique identifier for the request.
 */
export interface APIDispatch<Returned> {
  abort: () => void;
  unwrap: () => Promise<Returned>;
  requestId: string;
}

/**
 * It creates an Apisauce instance with a base URL and some headers
 * @param {string} baseURL - The base URL of the API.
 * @returns {ApisauceInstance} - The API instance
 */
function apiConfig(baseURL: string): ApisauceInstance {
  return create({
    baseURL,
    timeout: 120000,
    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' }
  });
}

/**
 * Creating two instances of the API. One is authorized and the other is unauthorized.
 * An Apisauce instance with the correct base URL and headers.
 * @param {string} baseURL - the base URL for the API
 * @returns {ApisauceInstance} - the Apisauce instance
 */
export const authorizedAPI: ApisauceInstance = apiConfig(AppEnvConst.apiUrl);
export const unauthorizedAPI: ApisauceInstance = apiConfig(AppEnvConst.apiUrl);

/**
 * Set the headers for the authorized API.
 * @param {Record<string, any>} headers - the headers to set for the authorized API.
 * @returns None
 */
export function setHeaders(headers: Record<string, any>): void {
  authorizedAPI.setHeaders(headers);
}

/**
 * Adds an async request transform to the authorized API.
 * @param {Function} transform - the transform to add to the authorized API.
 * @returns None
 */
authorizedAPI.addAsyncRequestTransform(async (request) => {
  // eslint-disable-next-line no-restricted-syntax
  console.log({ request });

  // TODO: You can add authorization token like below
  // const state = reduxStore?.store?.getState();
  // const authToken = state?.auth?.loginData?.access_token;
  // const token = `Bearer ${authToken}`;
  // request.headers.Authorization = token;
});

/**
 * Monitor/Logs the response from an API call.
 * @param {ApiResponse<any>} response - the response from the API call.
 * @returns None
 */
function APIMonitor(response: ApiResponse<any>) {
  // eslint-disable-next-line no-restricted-syntax
  console.log({ response });
}
authorizedAPI.addMonitor(APIMonitor);
unauthorizedAPI.addMonitor(APIMonitor);

/**
 * Takes in an API response and transforms it into a usable format.
 * It will clear the async storage and redirect to the welcome screen if the response status is 401
 * @param {ApiResponse<any>} response - the API response to transform
 * @returns None
 */
async function asyncResponseTransform(response: ApiResponse<any>) {
  // eslint-disable-next-line no-restricted-syntax
  console.log({ response });

  // TODO: You can add global condition for token expired or internet issue like below
  // if (response.status === 401) {
  //   AsyncStorage.clear();
  //   reset({ index: 0, routes: [{ name: 'WelcomeScreen' }] });
  // } else if (['TIMEOUT_ERROR', 'CONNECTION_ERROR', 'CANCEL_ERROR'].includes(response.problem ?? '')) {
  //   showToast('Please check your internet connectivity.', 'error');
  // }
}
authorizedAPI.addAsyncResponseTransform(asyncResponseTransform);
unauthorizedAPI.addAsyncResponseTransform(asyncResponseTransform);

/**
 * Makes a request to the API with the given config.
 * A function that takes in an object with an api, method, url, params, data, and setting
 * property. It also takes in a source parameter.
 * @param {ApiConfig} config - the config for the request
 * @param {CancelTokenSource} source - the cancel token source for the request
 * @returns {Promise<ApiResponse<Response>>} - the response from the API
 */
function apiWithCancelToken<Response>(
  { api, method, url, params, data, setting, paths }: ApiConfig,
  source: CancelTokenSource
): Promise<ApiResponse<Response>> {
  const httpMethod: string = method.toLowerCase();

  const hasData: boolean = ['post', 'put', 'patch'].indexOf(httpMethod) >= 0;
  let settings = {
    ...(setting || {}),
    headers: {
      ...(setting?.headers ?? {})
    },
    ...(!hasData && params ? { params: params } : {})
  };

  // @ts-ignore
  settings.cancelToken = source.token;

  let finalUrl = url;
  if (!_.isEmpty(paths)) {
    finalUrl = formatString(finalUrl, paths);
  }
  const request: Promise<ApiResponse<Response>> = hasData
    ? // @ts-ignore
      api[httpMethod](finalUrl, data, settings)
    : // @ts-ignore
      api[httpMethod](finalUrl, params ?? {}, settings);

  return request;
}

/**
 * Handles the error response from the API.
 * @param {ApiErrorResponse<Response>} response - the error response from the API.
 * @param {string} defaultMessage - the default message to display if the response does not
 * contain a message.
 * @returns {ErrorResponse} - the error response to be displayed.
 */
function handleClientError<Response extends ResponseBound>(
  response: ApiErrorResponse<Response>,
  defaultMessage: string
): ErrorResponse {
  const messages = response.data?.message ?? defaultMessage;
  return getErrorResponse(messages);
}

/**
 * Handles the error response from the API.
 * @param {ApiErrorResponse<Response>} response - the error response from the API.
 * @param {string} defaultMessage - the default message to display if the error response is
 * not handled.
 * @returns {ErrorResponse} - the error response to display.
 */
function handleError<Response extends ResponseBound>(
  response: ApiErrorResponse<Response>,
  shouldShowToast: boolean
): ErrorResponse {
  let error: ErrorResponse;
  switch (response.problem) {
    case CLIENT_ERROR:
      error = handleClientError(response, Strings.APIError.clientError);
      break;
    case SERVER_ERROR:
      error = handleClientError(response, Strings.APIError.serverError);
      break;
    case TIMEOUT_ERROR:
      error = handleClientError(response, Strings.APIError.timeoutError);
      break;
    case CONNECTION_ERROR:
      error = handleClientError(response, Strings.APIError.connectionError);
      break;
    case NETWORK_ERROR:
      error = handleClientError(response, Strings.APIError.networkError);
      break;
    case CANCEL_ERROR:
      error = handleClientError(response, Strings.APIError.cancelError);
      break;
    default:
      error = handleClientError(response, Strings.APIError.somethingWentWrong);
  }

  if (response.problem !== CANCEL_ERROR && shouldShowToast) {
    /**
     * This is where you can show a toast message to the user
     * You can use a library like react-native-toast-message
     * to show a toast message
     */
  }

  return error;
}

/**
 * Handles errors that occur when making API calls.
 * @param {unknown} error - unknown - This is the error that is thrown by the API.
 * @returns {ErrorResponse} - The error response object.
 */
function handleCatchError(error: unknown): ErrorResponse {
  if (axios.isAxiosError(error)) {
    return getErrorResponse(error.message);
  } else {
    return getErrorResponse(Strings.APIError.unexpectedError);
  }
}

/**
 * Processes the API response and captures any relevant information for error reporting.
 * @param {ApiErrorResponse<Response>} response - The API error response to process.
 * @param {string} url - The URL of the API endpoint that was called.
 */
function processResponseAndCaptureInfo<Response extends ResponseBound>(
  response: ApiErrorResponse<Response>,
  url: string
) {
  const responseClone = _.cloneDeep(response);
  responseClone?.config && delete responseClone.config;
  responseClone?.headers && delete responseClone.headers;
  if (response?.originalError?.message !== APIErrorType.USER_CANCELLED_REQUEST)
    sentryCaptureAPIException(url, responseClone, response?.data?.message);
}

/**
 * It creates an async thunk that uses a cancel token to cancel the request if the user navigates away
 * from the page
 * @param {string} typePrefix - The prefix for the thunk type.
 * @param {Method} method - Method - the HTTP method to use (GET, POST, PUT, DELETE, etc)
 * @param {string} url - The url of the endpoint.
 * @param {ApisauceInstance} api - The API instance to use and default value is authorizedAPI
 * @returns {AsyncThunk<Response, ThunkArg, ThunkApiConfig>} - The async thunk action state.
 */
export function createAsyncThunkWithCancelToken<Response extends ResponseBound>(
  typePrefix: string,
  method: Method,
  url: string,
  api: ApisauceInstance = authorizedAPI
): AsyncThunk<Response, ThunkArg, ThunkApiConfig> {
  return createAsyncThunk<Response, ThunkArg, ThunkApiConfig>(
    typePrefix,
    async (payload, thunkApi) => {
      const { data, params, setting, paths, shouldShowToast = true } = payload ?? {};
      const source = CancelToken.source();

      // @ts-ignore
      thunkApi.signal.addEventListener('abort', () => {
        source.cancel(APIErrorType.USER_CANCELLED_REQUEST);
      });
      try {
        const response = await apiWithCancelToken<Response>(
          { api, method, url, data, params, setting, paths },
          source as CancelTokenSource
        );
        if (response.ok) {
          return response.data as Response;
        } else {
          processResponseAndCaptureInfo(response, url);
          return thunkApi.rejectWithValue(handleError<Response>(response, shouldShowToast));
        }
      } catch (error: unknown) {
        sentryCaptureAPIException(url, null, error);
        return thunkApi.rejectWithValue(handleCatchError(error));
      }
    }
  );
}
