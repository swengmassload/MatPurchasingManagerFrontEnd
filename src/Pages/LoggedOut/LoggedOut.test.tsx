import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import LoggedOut from "./LoggedOut";
import { setTokenNameBarcode } from "../../Redux/State/LoginUserSlice";
import assets from "../../assets";
import { RootState } from "../../Redux/store";
const mockDispatch = vi.fn();
const mockStore = configureStore([]);
//const initialState = {};
const initialState: Partial<RootState> = {
  loginUser: { email: "ffff", token: "valid-token", userName: "testUserName", lauchedApps: [] },
};
vi.mock("react-redux", async () => {
  const reactRedux = await vi.importActual<typeof import("react-redux")>("react-redux");
  return {
    ...reactRedux, // This line preserves other exports from react-redux
    useDispatch: () =>
      mockDispatch.mockReturnValueOnce({
        token: "",
        email: "",
        userName: "",
      }),
  };
});

describe("LoggedOut Component", () => {
  let store: any;
  let queryClient: QueryClient;

  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = vi.fn();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
  });

  it("should render correctly", () => {
    const { getByRole } = render(
      <TestWrapper>
        <LoggedOut />
      </TestWrapper>
    );

    const imgElement = getByRole("img");
    expect(imgElement).toHaveAttribute("src", assets.images.loggedOut);
    expect(imgElement).toHaveStyle({
      paddingRight: "0px",
      objectFit: "cover",
      width: "100%",
      height: "100%",
    });
  });

  it("should set the document title", () => {
    render(
      <TestWrapper>
        <LoggedOut />
      </TestWrapper>
    );

    expect(document.title).toBe("Logged Out Page");
  });

  it("should dispatch setTokenNameBarcode action", async () => {
    render(
      <TestWrapper>
        <LoggedOut />
      </TestWrapper>
    );
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(setTokenNameBarcode({ token: "", email: "", userName: "" }))
    );

    // expect(store.dispatch).toHaveBeenCalledWith(
    //   setTokenNameBarcode({
    //     token: '',
    //     userName: '',
    //     email: '',
    //   })
    // );
  });
});
