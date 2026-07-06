'use server';

import { getAllBlogs, addBlog, updateBlog, deleteBlog, Blog } from '@/lib/db';

export async function fetchBlogs(): Promise<Blog[]> {
  return await getAllBlogs();
}

export async function createBlogAction(blog: {
  title: string;
  meta_title: string;
  meta_description: string;
  description: string;
  banner_image: string;
}): Promise<boolean> {
  return await addBlog(blog);
}

export async function editBlogAction(
  id: string,
  blog: {
    title: string;
    meta_title: string;
    meta_description: string;
    description: string;
    banner_image?: string;
  }
): Promise<boolean> {
  return await updateBlog(id, blog);
}

export async function removeBlogAction(id: string): Promise<boolean> {
  return await deleteBlog(id);
}
