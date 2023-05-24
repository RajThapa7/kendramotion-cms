import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Button,
  Col,
  Row,
  Space,
  Switch,
  Typography,
  theme,
} from "antd";
import React, { useContext } from "react";
import { ColorModeContext } from "../../contexts";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky,
}) => {
  const { token } = useToken();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);
  const router = useRouter();

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      toast.success("Successfully logged out!");
      router.push("/login");
    }
  };

  return (
    <AntdLayout.Header style={headerStyles}>
      <Row align={"middle"} justify={"center"} gutter={16}>
        <Col>
          <Button onClick={() => handleLogout()}>Logout</Button>
        </Col>
        <Col>
          <Switch
            checkedChildren="🌛"
            unCheckedChildren="🔆"
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            defaultChecked={mode === "dark"}
          />
          {(user?.name || user?.avatar) && (
            <Space style={{ marginLeft: "8px" }} size="middle">
              {user?.name && <Text strong>{user.name}</Text>}
              {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
            </Space>
          )}
        </Col>
      </Row>
    </AntdLayout.Header>
  );
};
