import { Box, Text, Image } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import style from "./navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  return (
    <Box className={style.container}>
       <Image
        src="http://spiraltechnolabs.com/wp-content/uploads/2023/10/final-logo-footer-optimized.webp"
        alt="Company Logo"
        width={100}
        height={40}
      />
      <Text
        className={style.navItemWrapper}
        onClick={() => router.push("/auth/login")}
      >
        Login
      </Text>
      <Text className={style.navItemWrapper} onClick={() => router.push("/blog")}>
        Blog
      </Text>
    </Box>
  );
};

export default Navbar;
