import { useGetAppToken } from "../../Hooks/useGetAppToken";
import { useAddAppTokenAndLoadApp } from "../../Hooks/useAddAppTokenAndLoadApp";

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
