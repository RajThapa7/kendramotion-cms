import { NavigateToResource } from "@refinedev/nextjs-router/pages";
import { isAuthenticated } from "utils/auth";

export default function Index() {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <NavigateToResource resource="login" />;
  }

  return <NavigateToResource resource="movie" />;
}

Index.noLayout = true;
