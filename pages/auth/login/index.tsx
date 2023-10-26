import React, { useCallback, useState } from "react";
import { Box, Button, Stack, Text, TextInput } from "@mantine/core";
import { User } from "@/src/type";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store";
import { login, logout } from "../../../src/reducer";
import { notifications } from "@mantine/notifications";
import styles from './Login.module.css';

const Login = () => {
  const auth = useSelector((state: { user: User }) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const form = useForm({
    initialValues: {
      writer: "",
      password: "",
    },

    validate: {
      writer: (value) => (value.length !== 0 ? null : "Invalid writer"),
      password: (value) => (value.length !== 0 ? null : "Invalid writer"),
    },
  });

  const handleSubmit = useCallback(
    (value: User) => {
      dispatch(login(value));
      form.reset();
      notifications.show({
        title: "login",
        message: "user loggedin successfully",
      });
    },
    [dispatch, form]
  );

  const handleLogout = useCallback(() => {
    dispatch(logout(null));
  }, [dispatch]);

  return (
    <>
      <div
        className={styles.container}
      >
        <Box
          className={styles.loginBox}
        >
          {auth?.user ? (
            <Stack>
              <Text className={styles.userInfo}>User Name : {auth?.user?.writer}</Text>
              <Text className={styles.userInfo}>User Password : {auth?.user?.password}</Text>
              <Button onClick={handleLogout} className={styles.logoutButton}>Logout</Button>
            </Stack>
          ) : (
            <form
              onSubmit={form.onSubmit((values) =>
                handleSubmit({ user: values })
              )}
              className={styles.loginForm}
            >
              <Stack>
                <Text  className={styles.label}>User Name :</Text>
                <TextInput
                  placeholder="Name"
                  withAsterisk
                  {...form.getInputProps("writer")}
                  autoComplete="off"
                  className={styles.input}
                />
                <Text className={styles.label}>Password :</Text>
                <TextInput
                  type="password"
                  placeholder="Passowrd"
                  withAsterisk
                  {...form.getInputProps("password")}
                  autoComplete="off"
                  className={styles.input}
                />
                <Button type="submit" className={styles.loginButton}>Login</Button>
              </Stack>
            </form>
          )}
        </Box>
      </div>
    </>
  );
};

export default Login;
