import { render,  waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router";
import { describe, it, expect, vi } from "vitest";
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
const mockedNavigate = vi.hoisted(() => {
  return vi.fn();
});

const mockStore = configureStore([]);

describe("ProtectedRoute", () => {

    it('should redirect to /Dashboard if token is invalid', async() => {
      const initialState: Partial<RootState> = {loginUser: { email: "valid", token: 'valid-token',userName: 'testUserName' ,lauchedApps: [] },};
      const store = mockStore(initialState);
      mockedIsTokenValidAndFunctionClaimInToken.IsTokenValidAndFunctionClaimInToken.mockReturnValue(false);
      vi.mock("react-router", async () => {
          const mod = await vi.importActual<typeof import("react-router")>( "react-router" );
          return { ...mod,  Navigate: () => mockedNavigate("/Dashboard"),  };});

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/protected']}>
            <Routes>
              <Route path="/protected" element={<ProtectedRoute claim="some-claim" />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      );

      expect(mockedNavigate).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith("/Dashboard"));
    });

});
