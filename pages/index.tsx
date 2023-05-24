import { NavigateToResource } from "@refinedev/nextjs-router/pages";
export default function Index() {
  return (
    <>
      <NavigateToResource resource="movie" />
    </>
  );
}

Index.noLayout = true;
