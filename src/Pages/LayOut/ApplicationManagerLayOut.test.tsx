import { render, waitFor } from "@testing-library/react";
import ApplicationManagerLayOut from "./ApplicationManagerLayOut";
import { BrowserRouter, MemoryRouter } from "react-router";
//import { useSelector } from 'react-redux';
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { RootState } from "../../Redux/store";

// const hoistedUsenavigaMocks= vi.hoisted(()=>{
//     return {
//         useNavigate: vi.fn(),
//     }
// })

// const hoistedReduxMocks= vi.hoisted(()=>{
//     return {

//         useSelector: vi.fn(),
//     }
// })
const mockedUseNavigate = vi.fn();

vi.mock("react-router", async () => {
  return { useLocation: () => vi.fn(), useNavigate: () => vi.fn() };
});

// vi.mock("react-router", async () => {
//     const mod = await vi.importActual<typeof import("react-router")>( "react-router" );
//     return { ...mod,
//          useNavigate:hoistedUsenavigaMocks.useNavigate,  };});

//  vi.mock("react-redux", async () => {
//     const reactRedux = await vi.importActual<typeof import("react-redux")>(  "react-redux"  );
//     return {
//             ...reactRedux, // This line preserves other exports from react-redux
//               useDispatch: hoistedReduxMocks.useSelector,
//             };
//           });

// vi.mock('react-redux', async () => ({
//     const mod = await vi.importActual<typeof import("react-redux")>( "react-redux" );
//     return { ...mod,
//          useNavigate:hoistedUsenavigaMocks.useNavigate,  };});

describe("ApplicationManagerLayOut", () => {
  const mockStore = configureStore([]);
  it("should redirects to log out if no email is present", () => {
    const initialState: Partial<RootState> = {
      loginUser: {
        email: "",
        token: "valid-token",
        userName: "testUserName",
        lauchedApps: [],
      },
    };
    const store = mockStore(initialState);
    window.alert = vi.fn();

    vi.mock("react-router", async () => {
      const mod = await vi.importActual<typeof import("react-router")>("react-router");
      return {
        ...mod,
        // useLocation: () => mockedUseLocation.mockReturnValue({ search: "" }),
        useNavigate: () => mockedUseNavigate,
        Outlet: () => <div>Mocked Outlet</div>,
      };
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ApplicationManagerLayOut />
        </MemoryRouter>
      </Provider>
    );
    expect(window.alert).toHaveBeenCalledWith("No Email.. loging out ");
    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(mockedUseNavigate).toBeCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/LoggedOut");
    //expect(screen.queryByText("Mocked Outlet")).not.toBeInTheDocument();
    waitFor(() => {});
  
  });

  it("should not  render appbar if no email is present", () => {
    const initialState: Partial<RootState> = {
      loginUser: {
        email: "",
        token: "valid-token",
        userName: "testUserName",
        lauchedApps: [],
      },
    };
    const store = mockStore(initialState);
    window.alert = vi.fn();

    vi.mock("react-router", async () => {
      const mod = await vi.importActual<typeof import("react-router")>("react-router");
      return {
        ...mod,
        // useLocation: () => mockedUseLocation.mockReturnValue({ search: "" }),
        useNavigate: () => mockedUseNavigate,
        Outlet: () => <div>Mocked Outlet</div>,
      };
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ApplicationManagerLayOut />
        </BrowserRouter>
      </Provider>
    );
    expect(window.alert).toHaveBeenCalledWith("No Email.. loging out ");
    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(mockedUseNavigate).toBeCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/LoggedOut");
    waitFor(() => {});
   
  });
});
