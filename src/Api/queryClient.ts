import { MutationCache, QueryClient, QueryCache, QueryKey,  } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { NewProblemDetails, ProblemDetails } from "../Models/JWTModels/TokenGenerationRequest";


declare module "@tanstack/react-query" {
   interface Register{
  mutationMeta:{
    invalidateQueries?: QueryKey;
     //  invalidateQuery?: QueryKey | QueryKey[];

      successMessage?: string;
      errorMessage?: string;
    }
    queryMeta:{
      invalidateQueries?: QueryKey;
      description?: string;
      successMessage?: string;
      errorMessage?: string;

     
    }
   }

}
export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.successMessage) {
        toast.success(mutation.meta.successMessage);
        console.log(mutation.meta.successMessage);
      }
    },
    onError: (_error, _variables, _context, mutation) => {
 
      const isProblemDetails = (obj: unknown): obj is NewProblemDetails => {
        return !!obj && typeof obj === 'object' && 'detail' in (obj as any) && typeof (obj as any).detail === 'string';
      };

      let original: string;
      if (isProblemDetails(_error)) {
        original = _error.detail;
      } else if (_error instanceof Error) {
        original = _error.message;
      } else {
        try { original = JSON.stringify(_error); } catch { original = String(_error); }
      }

      if (mutation.meta?.errorMessage) {
        toast.error(`${mutation.meta.errorMessage} ${original}`);
        console.log(mutation.meta.errorMessage, original);
      } else {
        // still log/show original error if no meta message provided
        toast.error(original);
        console.log(original);
      }
    },
    onSettled: (_data, _error, _variables, _context, mutation) => {
      if (mutation.meta?.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: mutation.meta.invalidateQueries });
      }
    }
  }),
  queryCache: new QueryCache({
    onSuccess: (_data, query) => {
      const meta = (query as any).meta as any;
      if (meta?.successMessage) {
        toast.success(meta.successMessage);
        console.log(meta.successMessage);
      }
      if (meta?.description) {
        console.log(meta.description);
      }
    },
    onError: (error, query) => {
      const meta = (query as any).meta as any;

      const isProblemDetails = (obj: unknown): obj is ProblemDetails => {
        return !!obj && typeof obj === 'object' && 'detail' in (obj as any) && typeof (obj as any).detail === 'string';
      };

      let original: string;
      if (isProblemDetails(error)) {
        original = error.detail;
      } else if (error instanceof Error) {
        original = error.message;
      } else {
        try { original = JSON.stringify(error); } catch { original = String(error); }
      }

      if (meta?.errorMessage) {
        toast.error(`${meta.errorMessage} ${original}`);
        console.log(meta.errorMessage, original);
      } else {
        toast.error(original);
        console.log(original);
      }
    },
    onSettled: (_data, _error, query) => {
      const meta = (query as any).meta as any;
      if (meta?.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: meta.invalidateQueries });
      }
    }
  })
});

export default queryClient;
