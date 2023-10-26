import React, { Dispatch, SetStateAction, useState } from "react";
import { Menu } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import Form from "../../form";
import { useRouter } from "next/router";
import { deleteBlog } from "@/src/api/service";

interface RowActionMenuProps {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  handleBlogData: () => void;
}

const RowActionMenu: React.FC<RowActionMenuProps> = ({
  id,
  setId,
  handleBlogData,
}) => {
  const router = useRouter();

  const handleEdit = () => {
    setId(id);
    router.push(`blog/edit/${id}`);
  };

  const handleDelete = async () => {
    await deleteBlog(id);
    handleBlogData();
  };

  return (
    <>
      <Menu>
        <Menu.Target>
          <IconDotsVertical />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => handleEdit()}>Edit</Menu.Item>
          <Menu.Item onClick={() => handleDelete()}>Delete</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default RowActionMenu;
