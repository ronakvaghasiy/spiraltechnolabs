import React, { useEffect, useState } from "react";
import Blog from "..";
import { useRouter } from "next/router";
import { getSingleBlog } from "@/src/api/service";
import { Box, Stack, Text } from "@mantine/core";
import moment from "moment";

const ViewBlog = () => {
  const [editValue, setEditValue] = useState<Partial<Blog>>();

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const data = await getSingleBlog(id as string);
        if (data) {
          setEditValue(data);
        }
      }
    }
    fetchData();
  }, [id]);
  return (
    <Box
      style={{
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Box
        style={{
          margin: "30px",
          padding: "20px",
          border: "2px solid #eee",
          borderRadius: "10px",
        }}
      >
        <Stack>
          <Text>Title : {editValue?.title}</Text>
          <Text>Text : {editValue?.text} </Text>
          <Text>Writer: {editValue?.writer}</Text>
          <Text>
            Date : {moment(editValue?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default ViewBlog;
