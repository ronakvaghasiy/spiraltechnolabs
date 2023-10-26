import RowActionMenu from "@/src/components/table/tableRowActionMenu";
import { deleteBlog, getBlogData } from "@/src/api/service";
import { Table } from "@/src/components/table";
import { Blog, BlogDataResponse } from "@/src/type";
import { Table as MNtable, Box, Button } from "@mantine/core";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Blog.module.css"; 

const Blog = () => {
  const [blogData, setBlogData] = useState<Blog[]>();
  const [id, setId] = useState("");
  const router = useRouter();

  const handleBlogData = async (): Promise<BlogDataResponse> => {
    const { data, status } = await getBlogData();
    setBlogData(data);
    return { data, status };
  };

  const handleDelete = async () => {
    await deleteBlog(id);
  };

  useEffect(() => {
    handleBlogData();
  }, [id]);

  const head = useMemo(
    () => ["Sr no.", "Title", "Writer", "Date", "Action"],
    []
  );

  const rows = useMemo(
    () =>
      blogData?.map((blog, index) => (
        <MNtable.Tr key={blog.id}>
          <MNtable.Td>{index + 1}</MNtable.Td>
          <MNtable.Td onClick={() => router.push(`/blog/${blog.id}`)}>
            {blog.title}
          </MNtable.Td>
          <MNtable.Td>{blog.writer}</MNtable.Td>
          <MNtable.Td>{moment(blog.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</MNtable.Td>
          <MNtable.Td>
            <RowActionMenu
              id={blog.id}
              setId={setId}
              handleBlogData={handleBlogData}
            />
          </MNtable.Td>
        </MNtable.Tr>
      )),
    [blogData, router]
  );

  const header = useMemo(() => {
    return (
      <MNtable.Tr>
        {head.map((row, index) => {
          return <MNtable.Td key={index}>{row}</MNtable.Td>;
        })}
      </MNtable.Tr>
    );
  }, [head]);

  const handleBlogAdd = () => {
    router.push("/blog/add");
  };

  return (
    <>
       <div className={styles.container}>
      <div className={styles.header}>
        <Button onClick={() => handleBlogAdd()} className={styles.addButton}>
          Add Blog
        </Button>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <Table row={rows} head={header} />
        </div>
      </div>
    </div>
    </>
  );
};

export default Blog;
