const AuthResultSuccessResult = {
    title: 'Success',
    status: 200,
    detail: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',

    errors: "",
  };


  export const AuthResultFailureResult = {  title: 'Failure',status: 400,
  
    
    detail: 'UserName or Password is incorrect',

    errors: "UserName or Password is incorrect",
  };

  export const mockAuthCreateDashboardTokenFn_Success = vi.fn().mockResolvedValue(AuthResultSuccessResult);
  export const mockAuthCreateDashboardTokenFn_Failure = vi.fn().mockResolvedValue(AuthResultFailureResult);

 