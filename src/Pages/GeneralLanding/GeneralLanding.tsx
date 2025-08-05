import { useGetAppToken } from "./useGetAppToken";
import { useAddAppTokenAndLoadApp } from "./useAddAppTokenAndLoadApp";

const GeneralLanding = () => {
  
  const {request} = useGetAppToken();
 
  useAddAppTokenAndLoadApp({request});

  return <div>
  {
    request.isPending && <>  Processing Pls wait..... </>
  }

    Generalanding
    </div>;
};

export default GeneralLanding;
