import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render as rtlRender } from "@testing-library/react";

const historyMock = createMemoryHistory({ initialEntries: ["/login"] });

function render(ui, { contexts = {}, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Router history={contexts.history ? contexts.history : historyMock}>{children}</Router>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";

export { render };