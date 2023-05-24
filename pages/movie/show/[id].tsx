import React, { useMemo } from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TextField, UrlField, NumberField } from "@refinedev/antd";
import { Image, Skeleton, Typography } from "antd";

const { Title } = Typography;

export const MovieShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;
  console.log(record, "er");

  const imageUrl = useMemo(() => {
    const url = record?.url;
    const id = url?.split("v=")[1];

    if (typeof id !== "undefined") {
      const imgUrl = `https://img.youtube.com/vi/${id}/0.jpg`;
      return imgUrl;
    }
    return "";
  }, [record?.url]);

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <TextField value={record?.title} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Url</Title>
      <UrlField value={record?.url} />
      <Title level={5}>Image Preview</Title>
      {imageUrl && (
        <Image
          width={200}
          src={`${imageUrl}`}
          alt={"Preview"}
          style={{ borderRadius: "6px", marginBottom: "1rem" }}
          loading={"lazy"}
        />
      )}
      {!imageUrl && (
        <Skeleton.Image
          style={{
            width: "200px",
            borderRadius: "6px",
            marginBottom: "1rem",
          }}
        />
      )}
      <Title level={5}>Position</Title>
      <NumberField value={record?.position ?? ""} />
      <Title level={5}>Artist</Title>
      <TextField value={record?.artist?.name} />
    </Show>
  );
};

export default MovieShow;
