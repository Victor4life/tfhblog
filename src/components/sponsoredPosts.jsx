import React, { useEffect, useState } from "react";
import * as prismic from "@prismicio/client";

const SponsoredPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const client = prismic.createClient(import.meta.env.VITE_PRISMIC_ENDPOINT, {
      accessToken: import.meta.env.VITE_PRISMIC_ACCESS_TOKEN,
    });

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await client.getAllByType("sponsoredposts");
        setPosts(response);
      } catch (error) {
        console.error("Error fetching sponsored posts:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="text-gray-600">Loading sponsored posts...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error.message}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="text-gray-500">No sponsored posts available.</div>;
  }

  return (
    <section className="py-4">
      <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-6 uppercase tracking-wide border-b border-gray-200">
        Trending Now
      </h2>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {post.data.image?.url && (
              <img
                src={post.data.image.url}
                alt={post.data.image.alt || "Sponsored post"}
                className="w-28 h-20 rounded-lg object-cover flex-shrink-0"
                loading="lazy"
              />
            )}
            <div className="flex flex-col justify-between min-w-0">
              <h3 className="text-base font-semibold text-gray-800 truncate">
                {post.data.title}
              </h3>
              {post.data.sponsor_link && (
                <a
                  href={post.data.sponsor_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium mt-1 hover:underline"
                >
                  Read More{" "}
                  <span className="sr-only">about {post.data.title}</span>
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SponsoredPosts;
