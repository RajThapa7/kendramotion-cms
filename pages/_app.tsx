import "react-toastify/dist/ReactToastify.css";
import {
  ThemedLayoutV2,
  ThemedSiderV2,
  notificationProvider,
} from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Header } from "@components/header";
import { ColorModeContextProvider } from "@contexts";
import "@refinedev/antd/dist/reset.css";
import dataProvider from "@refinedev/simple-rest";
import axiosInstance from "utils/axios";
import "../src/styles/index.css";
import { ToastContainer } from "react-toastify";
import RouteGuard from "layouts/RouteGuard/RouteGuard";
import { Typography } from "antd";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

const { Title } = Typography;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2
        Header={() => <Header sticky />}
        Sider={() => (
          <ThemedSiderV2
            fixed
            Title={() => <Title level={5}>Kendramotion</Title>}
          />
        )}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  return (
    <>
      <RouteGuard>
        <RefineKbarProvider>
          <ColorModeContextProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(API_URL, axiosInstance)}
              notificationProvider={notificationProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
              resources={[
                {
                  name: "movie",
                  list: "/movie",
                  create: "/movie/create",
                  edit: "/movie/edit/:id",
                  show: "/movie/show/:id",
                  meta: {},
                },
                {
                  name: "song",
                  list: "/song",
                  create: "/song/create",
                  edit: "/song/edit/:id",
                  show: "/song/show/:id",
                  meta: {},
                },
                {
                  name: "video",
                  list: "/video",
                  create: "/video/create",
                  edit: "/video/edit/:id",
                  show: "/video/show/:id",
                  meta: {},
                },
                {
                  name: "artist-profile",
                  list: "/artist-profile",
                  create: "/artist-profile/create",
                  edit: "/artist-profile/edit/:id",
                  show: "/artist-profile/show/:id",
                  meta: {},
                },
                {
                  name: "feedback",
                  list: "/feedback",
                  create: "/feedback/create",
                  edit: "/feedback/edit/:id",
                  show: "/feedback/show/:id",
                  meta: {},
                },
                {
                  name: "member",
                  list: "/member",
                  create: "/member/create",
                  edit: "/member/edit/:id",
                  show: "/member/show/:id",
                },
                {
                  name: "banner",
                  list: "/banner",
                  edit: "/banner/edit/:id",
                  create: "/banner/create",
                },
              ]}
            >
              <ToastContainer />

              {renderComponent()}

              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </ColorModeContextProvider>
        </RefineKbarProvider>
      </RouteGuard>
    </>
  );
}

export default MyApp;
