import { render,  waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { vi } from "vitest";
import GeneralLanding from "./GeneralLanding";
import { setTokenNameBarcode } from "../../Redux/State/LoginUserSlice";
import { JwtAccessToken } from "../../Models/JWTModels/JwtAccessTokenFormat";
import { SideBarMenuName } from "../../Constants/SideBarMenuNames";

const mockValidDecodedResult = vi.hoisted(
  () =>
    ({
      aud: "MassFussion.ApiResource",
      UserName: "testUserName",
      Email: "testEmail",
      iat: 0,
      iss: "sampleIss",
      jti: "feccce9b-471f-405e-9a58-bc54fa0ffae8",
      nameid: "sampleNameid",
      nbf: 1723478077285, //new Date().getTime(),
      exp: Math.round(new Date().getTime() / 1000) + 1000, // expires in the future
    } as JwtAccessToken)
);

const mockValidDecodedResult2 = vi.hoisted(() => ({
  decoded: mockValidDecodedResult,
  result: true,
  expires: false,
}));

const mockedUseNavigate = vi.fn();
const mockedUseLocation = vi.fn();
const mockDispatch = vi.fn();

//Since the return value of react-router is changing per test we can perform step one and the return the mock
//STEP 1 Create a mock that returns the a blank function not mocked for react router dom

vi.mock("jwt-decode", async () => ({ jwtDecode: vi.fn() }));
vi.mock("react-router", async () => {  return { useLocation: () => vi.fn(),  useNavigate: () => vi.fn(),  };});

// Since react-redux is a dependency of GeneralLanding, we need to mock it as well
// but we can return the mock since the retur values are not changing per test


vi.mock("react-redux", async () => {
  const reactRedux = await vi.importActual<typeof import("react-redux")>(
    "react-redux"
  );
  return {
    ...reactRedux, // This line preserves other exports from react-redux
    useDispatch: () =>
      mockDispatch.mockReturnValueOnce({
        token: "testToken",
        email: "testEmail",
        userName: "testUserName",
      }),
  };
});

const mockUseCreateApplicationToken = {
  mutate: vi.fn(),
  isSuccess: false,
  isError: false,
  isPending: false,
  data: {},
  error: null,
};
vi.mock("../../Hooks/useCreateApplicationToken", () => ({
  useCreateApplicationToken: () => mockUseCreateApplicationToken,
}));

const mockStore = createStore(() => ({}));

vi.mock("axios", async () => {
  const mod = await vi.importActual<typeof import("axios")>("axios");
  return {
    ...mod,
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
    defaults: { headers: { common: { Authorization: "" } } },
  };
});

vi.mock("../../Utils/TryJwtDecode", () => {
  return {
    TryJwtDecode: () => mockValidDecodedResult2,
  };
});

describe("GeneralLanding", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });


  test("redirects to /NoAuthPage if flightToken or appCode is missing", () => {
    vi.mock("react-router", async () => {
      const mod = await vi.importActual<typeof import("react-router")>(
        "react-router"
      );
      return {
        ...mod,
        useLocation: () => mockedUseLocation.mockReturnValue({ search: "" }),
        useNavigate: () => mockedUseNavigate,

      };
    });
    render(
      <Provider store={mockStore}>
        <MemoryRouter >
          <GeneralLanding />
        </MemoryRouter>
      </Provider>
    );
 
    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith(SideBarMenuName.NoAuthPage.route);
  });

  // test("handles successful token creation and redirects to /dashboard", async() => {
  //   mockUseCreateApplicationToken.isSuccess = true;
  //   mockUseCreateApplicationToken.data = { token: "testToken" };
  //   vi.mock("react-router", async () => {
  //     const mod = await vi.importActual<typeof import("react-router")>(
  //       "react-router"
  //     );
  //     return {
  //       ...mod,
  //        useNavigate: () => mockedUseNavigate,
  //        useLocation: () => mockedUseLocation.mockReturnValue( { "hash": "","pathname": "/", "state": null,search: "?ctx=testToken&key=testAppCode", "key": "default"}),
  //     };
  //   });
  //   render(
  //     <Provider store={mockStore}>
  //       <MemoryRouter >
  //         <GeneralLanding />
  //       </MemoryRouter>
  //     </Provider>
  //   );
   
  //  // expect(mockedUseNavigate).toHaveBeenCalledTimes(2);
  //   expect(mockedUseNavigate).toHaveBeenCalledWith(SideBarMenuName.dashBoard.route);
  //   await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith(  setTokenNameBarcode({  token: "testToken", email: "testEmail", userName: "testUserName", })) );
  // });

    test("handles error in getting application Code for the users and redirects to /NoAuthPage", async () => {
      mockUseCreateApplicationToken.isError = true;
      render(
        <Provider store={mockStore}>
          <MemoryRouter>
            <GeneralLanding />
          </MemoryRouter>
        </Provider>
      );
      await waitFor(() =>
        expect(mockedUseNavigate).toHaveBeenCalledWith(SideBarMenuName.NoAuthPage.route)
      );
    });


});
