import axios from 'axios';
import { baseRequest } from './BaseCRUDApi';
export interface CRUDApiInterface<CreateType, ResponseType> {
  addData: (data?: CreateType) => Promise< ResponseType| undefined>;
  addDataWtAbortToken: ( signal :AbortSignal,data: CreateType)  => Promise< ResponseType| undefined>;
  updateDataWtAbortToken: (signal :AbortSignal,data: CreateType) => Promise<ResponseType | undefined>;
  updateData: (data: CreateType) => Promise<ResponseType | undefined>;

  addDataReturnsBlob: (data: CreateType) => Promise< ResponseType| undefined>;
  updateDataReturnsBlob: (data: CreateType) => Promise<ResponseType | unknown>;
  getAllData: () => Promise<ResponseType[] | undefined>;
  getData: (query?: string) => Promise<ResponseType| undefined>;
  getBlob: (query: string) => Promise<Blob | undefined>;
  getBlobWtQryParams: (query: CreateType) => Promise<Blob | undefined>;
  //getBlobT: (query: string) => Promise< AxiosResponse | undefined>;
  getDataList: (query: string) => Promise<ResponseType[]| undefined>;
  getDataSinglewtQryParams: (query: CreateType) => Promise<ResponseType| undefined>;
  getDataListwtQryParams: (query: CreateType) => Promise<ResponseType[]| undefined>;
  deleteData: (query: string) => Promise<ResponseType | unknown>;
}


  export default function CRUDApi<TRequestDTO, TResponseDTO>(url: string): CRUDApiInterface<TRequestDTO, TResponseDTO> {

    const axiosInstance = axios.create({ 
      baseURL: url,
      withCredentials: true

     });

    return {
    

      getDataSinglewtQryParams: (data: TRequestDTO) => 
        { 
         if(data==null || data==undefined||data==="") 
         {

           return Promise.reject(new Error("No Data Provided"));
         }
         const query = ConvertToQueryString(data as unknown as object); 
         return baseRequest.GetData<TResponseDTO>(axiosInstance, query)
        },



      getDataListwtQryParams: (data: TRequestDTO) => 
      { 
       
        if(data==null || data==undefined || data==="") 
          {
            alert("No Data Provided");
            console.log("No Data Provided1",data);  
            return Promise.reject(new Error("No Data Provided"));
          }
       const query = ConvertToQueryString(data as unknown as object); 
       return baseRequest.GetDataList<TResponseDTO[]>(axiosInstance, query)
      },
      getAllData: () => baseRequest.GetAllData<TResponseDTO>(axiosInstance),
      getData: (query?: string) =>
        {  
          if(query==undefined  || query=="-") {

            return Promise.reject(new Error("No Query Provided"));}

     if (query==="")
          {
            alert("No Query Provided");
           
          }


          return  baseRequest.GetData<TResponseDTO>(axiosInstance, query)},
      getBlob: (query: string) => 
        { 
          if (query === 'undefined') {
           
            return Promise.reject(new Error("No Blob Id Provided"));
       
          }
        
          return baseRequest.GetBlob(axiosInstance, query)},
          getBlobWtQryParams: (data: TRequestDTO) => 
            { 
              if(data==null || data==undefined || data==="") 
                {
                  alert("No Data Provided");
                  console.log("No Data Provided1",data);  
                  return Promise.reject(new Error("No Data Provided"));
                }
              const query = ConvertToQueryString(data as unknown as object);
              if (query === 'undefined') {
               
                return Promise.reject(new Error("No Blob Id Provided"));
           
              }
            
              return baseRequest.GetBlob(axiosInstance, query)},
    //  getBlobT: (query: string) => baseRequest.GetBlobT(axiosInstance, query),
      getDataList: (query: string) => baseRequest.GetDataList<TResponseDTO[]>(axiosInstance, query),
   
      deleteData: (query: string) => baseRequest.DeleteData(axiosInstance, query),
      updateData: (data: TRequestDTO) => baseRequest.PutData(axiosInstance, data),
      addData: (data?: TRequestDTO ) =>  { 

        console.log("No Data Provided1",data);
        console.log("addData",axiosInstance);
        return baseRequest.PostData(axiosInstance, data) 
      
      }, 
      addDataWtAbortToken: ( signal :AbortSignal,data?: TRequestDTO ) =>  {  return baseRequest.PostDataWtAbortToken(axiosInstance, data,signal)  }, 
      updateDataWtAbortToken: ( signal :AbortSignal,data: TRequestDTO) => baseRequest.PutDataWtAbortToken(axiosInstance, data,signal),
      updateDataReturnsBlob: (data: TRequestDTO) => baseRequest.PutDataReturnsBlob(axiosInstance, data),
      addDataReturnsBlob: (data: TRequestDTO ) =>  {  
        return baseRequest.PostDataReturnsBlob(axiosInstance, data)  
      },

      
    };
  }


function ConvertToQueryString(data: object) {
  if(data==null || data==undefined) 
    
    {
    alert("No Data Provided");
    console.log("No Data Provided1",data);  
      return "";
    }
  
  const queryParams = Object.entries(data)
    .filter(([_, value]) => value !== null) // Filter out null values
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return "?"+queryParams;
}
  // addData: (data: TestingModeGroupCreateRequestDTO) => {  return baseRequest.postData(axiosInstance, data); },
  // getAllData:  () => { return  baseRequest.getAllData<TestingModeGroupResponseDTO>(axiosInstance);},
  // getData: (query: string) => {return  baseRequest.getData<TestingModeGroupResponseDTO>(axiosInstance, query);},
  // updateData: (data: TestingModeGroupCreateRequestDTO) => {return   baseRequest.putData(axiosInstance, data);},
  // deleteData: (query: string) => {return  baseRequest.deleteData(axiosInstance, query);  },
