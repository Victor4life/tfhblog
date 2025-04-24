import React, { useEffect, useState } from "react";
import * as prismic from "@prismicio/client";
import styled from "styled-components";

const SponsoredPostsWrapper = styled.section`
  padding: 2px;
  margin: 0;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; // Adds consistent spacing between posts
`;

const PostCard = styled.div`
  padding: 5px 0;
  width: 100%;
  max-width: 100%;

  display: flex;
  align-items: flex-start;

  img {
    width: 100px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    flex-shrink: 0;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    min-width: 0;
  }

  h3 {
    margin: 0 0 4px 0;
    color: #444;
    font-weight: 700;
    font-size: 1rem;
  }

  .sponsor {
    font-style: italic;
    color: #888;
    margin: 0;
  }

  a {
    display: inline-block;
    font-weight: 500;
    color: #2563eb; // text-blue-600 equivalent

    &:hover {
      text-decoration: underline;
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

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
    return <div>Loading sponsored posts...</div>;
  }

  if (error) {
    return <div>Error loading sponsored posts: {error.message}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>No sponsored posts available</div>;
  }

  return (
    <>
      <h2 className="text-xl md:text-3xl font-bold text-blue-600 mb-8 py-2 uppercase tracking-wide border-b-2 border-gray-200 hover:text-blue-600 transition-colors duration-300">
        Latest News
      </h2>
      <SponsoredPostsWrapper>
        <PostsContainer>
          {posts.map((post) => (
            <PostCard key={post.id}>
              {post.data.image?.url && (
                <img
                  src={post.data.image.url}
                  alt={post.data.image.alt || "Sponsored content"}
                  loading="lazy"
                />
              )}
              <div className="content">
                <h3>{post.data.title}</h3>
                {post.data.sponsor_link && (
                  <a
                    href={post.data.sponsor_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Read More{" "}
                    <span className="sr-only">about {post.data.title}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </PostCard>
          ))}
        </PostsContainer>
      </SponsoredPostsWrapper>
    </>
  );
};

export default SponsoredPosts;
