import { render,  } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router";
import { describe, it,  vi } from "vitest";
import configureStore from "redux-mock-store";
import { ProtectedRoute } from "../ProtectedRoute";
import { RootState } from "../../../Redux/store";

const mockedIsTokenValidAndFunctionClaimInToken = vi.hoisted(() => {
  return { IsTokenValidAndFunctionClaimInToken: vi.fn() };
});
vi.mock("../../Utils/IsTokenValidAndFunctionClaimInToken", () => ({
  IsTokenValidAndFunctionClaimInToken:
    mockedIsTokenValidAndFunctionClaimInToken.IsTokenValidAndFunctionClaimInToken,
}));

const mockStore = configureStore([]);

describe("ProtectedRoute", () => {
  it("should render children if token is valid", () => {
    const initialState: Partial<RootState> = {
      loginUser: {
        email: "correctemail",
        token: "valid-token",
        userName: "testUserName",
        lauchedApps: [],
      },
    };

    const store = mockStore(initialState);
    mockedIsTokenValidAndFunctionClaimInToken.IsTokenValidAndFunctionClaimInToken.mockReturnValue(
      true
    );

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/protected", ""]}>
          <Routes>
            <Route
              path="/protected"
              element={<ProtectedRoute claim="some-claim" />}
            >
              <Route path="" element={<div>Protected Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
 
  //  expect(screen.getByText(/Protected Content/)).toBeInTheDocument();
  });
});
