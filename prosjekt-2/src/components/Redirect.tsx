import { render } from "@testing-library/react";
import { Navigate } from "react-router-dom";

export function Redirect(redir : boolean) {
  if (redir) {
    render(<Navigate to="/viewInfo"/>)
  } else {
    render(<Navigate to="/"/>)
  }
}