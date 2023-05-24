import { Col, Row } from "antd";
import { useCallback, useState } from "react";
import { baseURl } from "constants/index";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import kendra from "../../src/kendra.png";
import Image from "next/image";

const LoginIndex = () => {
  const [passwordType, setPasswordType] = useState("password");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const togglePasswordType = useCallback(() => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  }, [passwordType, setPasswordType]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios
      .post(`${baseURl}/login`, formData)
      .then((res) => {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.accessToken)
        );
        toast.success("Successfully loggedin");
        router.push("/movie");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <Row align={"middle"} justify={"center"} style={{ minHeight: "100dvh" }}>
      <Col>
        <div className="outer-border">
          <div className="place-center">
            <Image src={kendra} alt="kendramotion logo" width={50} />
          </div>
          <h2
            style={{ marginBottom: "30px", marginTop: "10px" }}
            className="place-center"
          >
            Log In to get started
          </h2>
          <form
            action=""
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", rowGap: "15px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                className="input"
                placeholder="Enter email"
                id="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              <label htmlFor="email">Password</label>
              <input
                type={passwordType}
                className=" input"
                name="password"
                placeholder="Enter password"
                id="password"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
              <div style={{ columnGap: "6px", display: "flex" }}>
                <input
                  type="checkbox"
                  name="showPassword"
                  id="showPassword"
                  onClick={() => togglePasswordType()}
                />
                <label htmlFor="showPassword">show password</label>
              </div>
            </div>
            <button className="btn" type="submit">
              Log In
            </button>
          </form>
          <div style={{ marginTop: "15px" }}>
            <a href="#">Register here</a>
          </div>
        </div>
      </Col>
    </Row>
  );
};

LoginIndex.noLayout = true;

export default LoginIndex;
