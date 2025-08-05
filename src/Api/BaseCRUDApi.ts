import axios, { AxiosInstance, AxiosResponse } from "axios";
import { NewProblemDetails, ProblemDetails } from "../Models/JWTModels/TokenGenerationRequest";

const ProcessResponse = async <T>(response: AxiosResponse<T>) => {
  try {
    const data = await response.data;

    return data;
  } catch (error) {
    console.log("Processing Error.....");

    ProcessAxiosError(error);
  }
};

const ProcessBlobResponse = async <T>(response: AxiosResponse<T>) => {
  console.log("Processing Blob Response.....");
  try {
    const data = await response.data;

    return data;
  } catch (error) {
    console.log("Processing Blob Error .....");

    throw await ProcessAxiosBlobErrorAsync(error);
  }
};

const ProcessAxiosError = (error: unknown): NewProblemDetails => {
  console.log("Processing Error??.....");
  console.log(error);

  let response: NewProblemDetails;

  if (axios.isAxiosError(error)) {
    console.log("Processing Axios Error.....");
    // console.log(error);
    //let response: NewProblemDetails;

    try {
      const errorResponse = error.response?.data as unknown as NewProblemDetails;
      // First try thoe you know
      if (error.response?.status === 401) {
        response = {
          title: "Unauthorized",
          status: 401,
          detail: "You are not authorized to access this resource.",
          type: errorResponse.type,
          instance: "",
        };
      } else if (error.response?.status === 403) {
        response = {
          title: "Forbidden",
          status: 403,
          detail: "You are forbidden to access this resource.",
          type: errorResponse.type,
          instance: "",
        };
      } else if (error.code === "ERR_NETWORK") {
        response = {
          title: "Connection Problems",
          status: 500,
          detail: "Check your network connection and try again",
          type: "Connection Problems",
          instance: "",
        };
      } else if (error.code === "ERR_BAD_REQUEST") {
        response = {
          title: "Bad Request Error",
          status: 400,
          detail: "Check your Parameter",
          type: "Bad Request Error",
          instance: "",
        };
      } else if (error.code === "ERR_CANCELED") {
        response = {
          title: "Operation  Canceled",
          status: 499,
          detail: "Operation cancelled",
          type: "Operation Canceled",
          instance: "",
        };
      } else if (error.code === "ECONNABORTED") {
        response = {
          title: "Connection Timeout",
          status: 500,
          detail: "Connection timeout.. Please try again later",
          type: "Connection Timeout",
          instance: "",
        };
      } else {
        response = {
          title: errorResponse.title,
          status: errorResponse.status,
          detail: errorResponse.detail,
          type: errorResponse.type,
          instance: "",
        };
      }
    } catch (error) {
      console.log("Error Response : " + error);

      response = {
        title: "Bad Request Error",
        status: 400,
        detail: "Bad Request Error.. Check your Parameter",
        type: "Bad Request Error",
        instance: "",
      };
    }
  } else {
    response = {
      title: "Error ....",
      status: 500,
      detail: "An error occurred, please try again later. " + error,
      type: "Error",
      instance: "",
    };
  }
  console.log(response);
  return response;
};

const ProcessAxiosBlobErrorAsync = async (error: unknown): Promise<ProblemDetails> => {
  console.log("Processing Error ProcessAxiosBlobError.....");

  let response: ProblemDetails;

  if (axios.isAxiosError(error) && error.response) {
    try {
      const errorResponseText = await error.response.data.text();
      const errorResponse = JSON.parse(errorResponseText) as NewProblemDetails;
      response = {
        title: errorResponse.title,
        status: errorResponse.status,
        detail: errorResponse.detail,
      };
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      response = {
        title: "Error Parsing Response",
        status: 500,
        detail: "An error occurred while parsing the error response.",
      };
    }
  } else {
    response = {
      title: "An Error Occurred",
      status: 500,
      detail: `An error occurred, please try again later. Error: ${error}`,
    };
  }

  console.log("Error Response:", response);
  console.log(response.title);

  return response;
};

export const baseRequest = {
  GetData: async <T>(axiosInstance: AxiosInstance, query: string) => {
    try {
      const response = await axiosInstance.get<T>(query, {
        withCredentials: true,
      });

      return await response.data;
    } catch (error) {
      throw ProcessAxiosError(error);
    }
  },

  GetDataWithParams: async <T>(axiosInstance: AxiosInstance, params: object) => {
    try {
      console.log("GetDataWithParams called with params: ", params);
      const response = await axiosInstance.get<T>("", {
        params: params,
        withCredentials: true,
      });

      return await response.data;
    } catch (error) {
      throw ProcessAxiosError(error);
    }
  },
  GetBlobT: async <T>(axiosInstance: AxiosInstance, query: string) => {
    try {
      const response = await axiosInstance.get<T>(query, {
        responseType: "blob",
      });
      return await response.data;
    } catch (error) {
      throw await ProcessAxiosBlobErrorAsync(error);
    }
  },
  GetBlob: async (axiosInstance: AxiosInstance, query: string) => {
    try {
      const response = await axiosInstance.get(query, { responseType: "blob" });

      return await response.data;
    } catch (error) {
      console.log("Error Occured and Found : " + error);
      throw await ProcessAxiosBlobErrorAsync(error);
    }
  },
  GetDataList: async <T>(axiosInstance: AxiosInstance, query: string) => {
    try {
      const response = await axiosInstance.get<T>(query);
      return await response.data;
    } catch (error) {
      throw ProcessAxiosError(error);
    }
  },

  GetDataListParams: async <T>(axiosInstance: AxiosInstance, query: string) => {
    try {
      const response = await axiosInstance.get<T>(query);
      return await response.data;
    } catch (error) {
      throw ProcessAxiosError(error);
    }
  },

  GetAllData: async <T>(axiosInstance: AxiosInstance) => {
    try {
      const response = await axiosInstance.get<T[] | []>("");
      return response.data;
    } catch (error) {
      throw ProcessAxiosError(error);
    }
  },
  PostData: async <T, R>(
    axiosInstance: AxiosInstance,
    body: T //: Promise<R | unknown> =>
  ) => {
    try {
      const response = await axiosInstance.post<R>("", body);
      return ProcessResponse<R>(response);
    } catch (error) {
      throw ProcessAxiosError(error);
    }
  },

  PostDataWtAbortToken: async <T, R>(
    axiosInstance: AxiosInstance,
    body: T, //: Promise<R | unknown> =>
    signal: AbortSignal
  ) => {
    try {
      console.log("PostDataWtAbortToken called with body:", body);
      console.log("AbortSignal:", signal);
      const response = await axiosInstance.post<R>("", body, { signal: signal });
      return ProcessResponse<R>(response);
    } catch (error) {
      throw ProcessAxiosError(error);
    }
  },

  // This putData is used to update data and return normal data
  PutData: async <T, R>(
    axiosInstance: AxiosInstance,
    body: T //: Promise<R | unknown> =>
  ) => {
    try {
      const response = await axiosInstance.put<R>("", body);
      return ProcessResponse<R>(response);
    } catch (error) {
      throw ProcessAxiosError(error);
    }
  },

  PutDataWtAbortToken: async <T, R>(
    axiosInstance: AxiosInstance,
    body: T, //: Promise<R | unknown> =>
    signal: AbortSignal
  ) => {
    try {
      const response = await axiosInstance.put<R>("", body, { signal: signal });
      return ProcessResponse<R>(response);
    } catch (error) {
      throw ProcessAxiosError(error);
    }
  },

  // This putData is used to update data and return a blob
  PutDataReturnsBlob: async <T, R>(axiosInstance: AxiosInstance, body: T): Promise<R | unknown> => {
    try {
      const response = await axiosInstance.put<R>("", body, {
        responseType: "blob",
      });
      return ProcessBlobResponse<R>(response);
    } catch (error) {
      throw await ProcessAxiosBlobErrorAsync(error);
    }
  },
  PostDataReturnsBlob: async <T, R>(
    axiosInstance: AxiosInstance,
    body: T //: Promise<R | unknown> =>
  ) => {
    try {
      const response = await axiosInstance.post<R>("", body, {
        responseType: "blob",
      });
      return ProcessBlobResponse<R>(response);
    } catch (error) {
      throw await ProcessAxiosBlobErrorAsync(error);
    }
  },
  DeleteData: async <T>(
    axiosInstance: AxiosInstance,
    id: string //: Promise<R | unknown> =>
  ) => {
    try {
      const response = await axiosInstance.delete<T>(id);
      ProcessResponse(response);
    } catch (error) {
      throw ProcessAxiosError(error);
    }
  },
};
