import { apiClient } from "./api";
import { Blog, BlogDataResponse } from "../type";

export const getBlogData = async (): Promise<BlogDataResponse> => {
  try {
    const { data, status } = await apiClient.get("/");
    return { data, status };
  } catch (error) {
    console.log(error, "unable to get blog");
  }
  return { data: [], status: 200 };
};

export const editBlog = async (
  payload: Partial<Blog>,
  id: string
): Promise<BlogDataResponse> => {
  try {
    const { data, status } = await apiClient.put(`/${id}`, payload);
    return { data, status };
  } catch (error) {
    console.log(error, "unable to update blog");
  }
  return { data: [], status: 200 };
};

export const createBlog = async (
  payload: Omit<Blog, "createdAt" | "id">
): Promise<BlogDataResponse> => {
  try {
    const { data, status } = await apiClient.post(`/`, payload);
    return { data, status };
  } catch (error) {
    console.log(error, "unable to update blog");
  }
  return { data: [], status: 200 };
};

export const deleteBlog = async (id: string): Promise<BlogDataResponse> => {
  try {
    const { data, status } = await apiClient.delete(`/${id}`);
    return { data, status };
  } catch (error) {
    console.log(error, "unable to delete blog");
  }
  return { data: [], status: 200 };
};

export const getSingleBlog = async (id: string): Promise<Blog | undefined> => {
  try {
    const { data } = await apiClient.get(`/${id}`);
    return data;
  } catch (error) {
    console.log(error, "unable to delete blog");
  }
  return undefined;
};
