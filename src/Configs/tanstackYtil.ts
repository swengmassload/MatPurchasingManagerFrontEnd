import { QueryKey } from "@tanstack/react-query";

declare module "@tanstack/react-query" {

  export interface Register{

    mutationMeta: {

      invalidateQuery?: QueryKey | QueryKey[];

      suceessMessage?: string;

      errorMessage?: string;

    }

    }     

  }
