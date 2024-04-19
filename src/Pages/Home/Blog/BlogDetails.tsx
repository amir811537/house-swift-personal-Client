import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import SubscribeUs from "./SubscribeUs";

interface BlogPost {
  _id: string; // Assuming this is the identifier in your database
  blog_category: string;
  title: string;
  image: string;
  date: string;
  description: string;
  writer_name: string;
  writer_title: string;
  writer_image: string;
}

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);

  const fetchBlogData = async () => {
    try {
      const response = await fetch("http://localhost:4000/blogsData");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: BlogPost[] = await response.json();
      const parsedId = id ? parseInt(id, 10) : NaN;

      if (isNaN(parsedId)) {
        console.error("Invalid id:", id);
        return;
      }

      const selectedBlogPost = data.find((post) => post._id === id); // Compare with _id

      if (selectedBlogPost) {
        setBlogPost(selectedBlogPost);
      } else {
        console.error("Blog post not found");
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-24 md:px-20">
      <div>
        <SectionTitle first="House" second="Swift Blog"></SectionTitle>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 border-b-2 ml-4">
        <p className="pb-4">{blogPost.date}</p>
        <div className="space-y-2">
          <img
            className="w-12 h-12 rounded-full"
            src={blogPost.writer_image}
            alt="avatar"
          />
          <p>{blogPost.writer_name}</p>
          <p className="pb-4">{blogPost.writer_title}</p>
        </div>
      </div>
      <div className="my-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4">
          <div className="flex-[1]">
            <img className="w-full" src={blogPost.image} alt="logo" />
          </div>
          <div className="flex-[1] border-b-2 my-6 p-2">
            <p className="text-2xl font-bold mb-6">{blogPost.title}</p>
            <p className="text-sm">{blogPost.description}</p>
            <div className="card-actions justify-end">
              <button
                className="px-5 py-1 border border-[#09BE51] text-[#09BE51] hover:bg-[#09BE51] hover:text-white duration-300 mt-4"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <SubscribeUs />
    </div>
  );
};

export default BlogDetails;
