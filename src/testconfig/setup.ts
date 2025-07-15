import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
// import matchers from "@testing-library/jest-dom/matchers";
// import { expect } from "vitest";

// expect.extend(matchers);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});


