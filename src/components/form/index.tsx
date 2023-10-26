import { createBlog, editBlog, getSingleBlog } from "@/src/api/service";
import { Blog, BlogPayload } from "@/src/type";
import {
  Modal,
  TextInput,
  Text,
  Button,
  Stack,
  Textarea,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from './form.module.css'

const Form = () => {
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

  const form = useForm({
    initialValues: {
      text: "",
      writer: "",
      title: "",
    },

    validate: {
      text: (value) => (value && value.length !== 0 ? null : "required"),
      writer: (value) => (value && value.length !== 0 ? null : "required"),
      title: (value) => (value && value.length !== 0 ? null : "required"),
    },
  });
  const formRef = useRef(form);

  useEffect(() => {
    if (id) {
      formRef.current.setValues({
        text: editValue?.text ?? "",
        title: editValue?.title ?? "",
        writer: editValue?.writer ?? "",
      });
    }
  }, [editValue?.text, editValue?.title, editValue?.writer, id]);

  const handleSubmit = useCallback(
    async (values: BlogPayload) => {
      if (id) {
        await editBlog(values, id as string);
        router.push("/blog");
      } else {
        await createBlog(values);
        router.push("/blog");
      }
    },
    [id, router]
  );

  return (
    <Box
    className={styles.container}
    >
      <form
        onSubmit={form.onSubmit((values) =>
          handleSubmit(values as BlogPayload)
        )}
        className={styles.form}
      >
        <Stack>
          <Text  className={styles.label}>Title :</Text>
          <TextInput
            placeholder="tilte"
            withAsterisk
            {...form.getInputProps("title")}
            autoComplete="off"
            className={styles.input}

          />
          <Text className={styles.label}>Name :</Text>
          <TextInput
            placeholder="Name"
            withAsterisk
            {...form.getInputProps("writer")}
            autoComplete="off"
            className={styles.input}
          />
          <Text className={styles.label}>Text :</Text>
          <Textarea
            multiline
            placeholder="Description"
            withAsterisk
            {...form.getInputProps("text")}
            autoComplete="off"
            className={styles.textarea}
          />
          <Button type="submit">{id ? "Update" : "Add"}</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Form;
