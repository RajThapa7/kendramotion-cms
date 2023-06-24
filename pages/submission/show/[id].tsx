import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TextField, EmailField } from "@refinedev/antd";
import { Typography } from "antd";
import Button from "antd/lib/button";
import { axiosInstance } from "@refinedev/simple-rest";
import { API_URL } from "pages/_app";

const { Title } = Typography;

export const SubmissionShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  function download(pdfUrl: string) {
    axiosInstance
      .get(pdfUrl, {
        responseType: "blob",
      })
      .then((resp) => resp.data.arrayBuffer())
      .then((resp) => {
        // set the blog type to final pdf
        const file = new Blob([resp], { type: "application/pdf" });

        // process to auto download it
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = "Document" + new Date() + ".pdf";
        link.click();
      });
  }

  const handleDownload = () => {
    download(record?.document?.url);
  };

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Phone Number</Title>
      <TextField value={record?.phoneNumber ?? ""} />
      <Title level={5}>Email</Title>
      <EmailField value={record?.email} />
      <Title level={5}>Video Url</Title>
      <TextField value={record?.video?.url} />
      <Button
        style={{ marginTop: "30px", display: "block" }}
        type="primary"
        onClick={handleDownload}
      >
        Download PDF
      </Button>
    </Show>
  );
};

export default SubmissionShow;
