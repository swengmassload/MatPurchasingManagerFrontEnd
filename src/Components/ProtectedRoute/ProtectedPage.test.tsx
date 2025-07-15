import { render, waitFor,  } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProtectedPage } from "./ProtectedPage";
import { MemoryRouter } from "react-router";
import { Provider,  } from "react-redux";

import configureStore from "redux-mock-store";
import { RootState } from "../../Redux/store";

//STEP 1: Create Mock Variables
const mockedNavigate = vi.fn();

//const mockUseSelector = vi.fn();
const mockedIsTokenValidAndFunctionClaimInToken =vi.hoisted ( ()=>{ return {IsTokenValidAndFunctionClaimInToken: vi.fn() }});  //vi.fn();
vi.mock("../../Utils/IsTokenValidAndFunctionClaimInToken", () => ({ IsTokenValidAndFunctionClaimInToken: mockedIsTokenValidAndFunctionClaimInToken.IsTokenValidAndFunctionClaimInToken,}));
const mockStore = configureStore([]);
//STEP 2: Mock the dependencies of the component with just vi.fn() for those that
// will have different return values in the test cases
// Mock dependencies

vi.mock("react-router",  () => { return { useLocation: () => vi.fn(), Navigate: () => vi.fn() };});

//NOte for the npm package that will always return the same mock value you can use the below example for redux
// Here you use mockactual to get the actual value of the module and then return the same value for all the test cases
// And this is what you will doing  unside each test case for those that have dieffernt return values


// Step 3: Start writing the test cases
describe("ProtectedPage", () => {

  beforeEach(() => { vi.resetAllMocks();  });

  it("redirects to /NoAuthPage when user is not authenticated",async () => {
    const SimpleComponent = () => {return (  <h1>Simple Componenent was rendered</h1> ); };  
    const initialState: Partial<RootState> = {loginUser: { email: "", token: 'valid-token',userName: 'testUserName' ,lauchedApps: [] },};
    const store = mockStore(initialState);

    vi.mock("react-router", async () => {
      const mod = await vi.importActual<typeof import("react-router")>( "react-router" );
      return { ...mod,  Navigate: () => mockedNavigate("/NoAuthPage"),  };});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedPage claim="required-claim">
            <SimpleComponent />
          </ProtectedPage>
        </MemoryRouter>
      </Provider>
    );

  expect(mockedNavigate).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith("/NoAuthPage"));

  });


  it("Shows NotAuthorizedPage  when user does not have the required claim",async () => {
    const SimpleComponent = () => {return (  <h1>This is a component</h1> ); };  
    const initialState: Partial<RootState> = {loginUser: { email: "Someemail@something", token: 'valid-token',userName: 'testUserName' ,lauchedApps: [] },};
    const store = mockStore(initialState);
    mockedIsTokenValidAndFunctionClaimInToken.IsTokenValidAndFunctionClaimInToken.mockReturnValue(false);

    vi.mock("react-router", async () => {
      const mod = await vi.importActual<typeof import("react-router")>( "react-router" );
      return { ...mod,  Navigate: () => mockedNavigate("/NoAuthPage"),  };});
     // vi.mock("../../Utils/IsTokenValidAndFunctionClaimInToken", () => ({ IsTokenValidAndFunctionClaimInToken: vi.fn().mockReturnValue(false),}));
      mockedIsTokenValidAndFunctionClaimInToken.IsTokenValidAndFunctionClaimInToken.mockReturnValue(false);
    const result =render(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedPage claim="required-claim">
            <SimpleComponent />
          </ProtectedPage>
        </MemoryRouter>
      </Provider>
    );

    expect(result.getByText(/Acess Denied/)).toBeInTheDocument();
    expect(result.getByText(/Not Authorized/)).toBeInTheDocument();
  });

  it("renders children when user is authenticated and has the required claim",async () => {
    const SimpleComponent = () => {return (  <h1>Simple Componenent was rendered</h1> ); };  
    const initialState: Partial<RootState> = {loginUser: { email: "Someemail@something", token: 'valid-token',userName: 'testUserName' ,lauchedApps: [] },};
    const store = mockStore(initialState);

    vi.mock("react-router", async () => {
      const mod = await vi.importActual<typeof import("react-router")>( "react-router" );
      return { ...mod,  Navigate: () => mockedNavigate("/NoAuthPage"),  };});
      mockedIsTokenValidAndFunctionClaimInToken.IsTokenValidAndFunctionClaimInToken.mockReturnValue(true);
    const result =render(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedPage claim="required-claim">
            <SimpleComponent />
          </ProtectedPage>
        </MemoryRouter>
      </Provider>
    );

    expect(result.getByText(/Simple Componenent was rendered/)).toBeInTheDocument();

  });

});