import React from "react";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import * as prismic from "@prismicio/client"; // Changed this import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularTopics = () => {
  const [popularPosts, setPopularPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      // Create client inside the fetch function
      const client = prismic.createClient(
        import.meta.env.VITE_PRISMIC_ENDPOINT,
        {
          accessToken: import.meta.env.VITE_PRISMIC_ACCESS_TOKEN,
        }
      );

      const posts = await client.getAllByType("popularposts");
      setPopularPosts(posts);
    };
    fetchPosts();
  }, []); // Removed client dependency since we create it inside

  // Rest of your component remains the same
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  if (!popularPosts) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading popular topics...</p>
      </div>
    );
  }

  if (popularPosts.length === 0) {
    return (
      <div className="no-posts">
        <p>No popular topics available at the moment.</p>
      </div>
    );
  }

  return (
    <section className="popular-topics">
      <h2 className="text-xl md:text-3xl font-bold text-blue-600 mb-8 py-2 uppercase tracking-wide border-b-2 border-gray-200 hover:text-blue-600 transition-colors duration-300">
        Popular Topics
      </h2>
      <div className="slider-container">
        <Slider {...settings}>
          {popularPosts.map((post) => (
            <div key={post.id} className="topic-slide">
              <article className="topic-card">
                <div className="image-container">
                  {post.data.featured_image?.url ? (
                    <img
                      src={post.data.featured_image.url}
                      alt={post.data.featured_image.alt || ""}
                      className="topic-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="placeholder-image">
                      <span>No image available</span>
                    </div>
                  )}
                </div>
                <div className="topic-content">
                  <h3>{post.data.title || "Untitled"}</h3>
                  {post.data.category && (
                    <span className="category-tag">{post.data.category}</span>
                  )}
                </div>
              </article>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

// Enhanced styles
const styles = `
  .popular-topics {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .slider-container {
    margin: 2rem 0;
    position: relative;
  }

  .topic-slide {
    padding: 1rem;
    height: 300px; /* Fixed height for consistent slides */
  }

  .topic-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px solid #eee;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .topic-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  .image-container {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    overflow: hidden;
  }

  .topic-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .topic-card:hover .topic-image {
    transform: scale(1.05);
  }

  .placeholder-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    color: #666;
  }

  .topic-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    color: white;
  }

  .topic-content h3 {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
    color: white;
  }

  .category-tag {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    font-size: 0.85rem;
    color: white;
    backdrop-filter: blur(4px);
  }

  /* Make sure the Slick slider displays items in a row */
  .slick-track {
    display: flex !important;
  }

  .slick-slide {
    height: inherit !important;
  }

  .slick-slide > div {
    height: 100%;
  }

  .loading-state,
  .error-state,
  .no-posts {
    text-align: center;
    padding: 3rem;
    background: #f8f9fa;
    border-radius: 12px;
    margin: 1rem;
    color: #555;
  }

  .loading-spinner {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .popular-topics {
      padding: 1rem;
    }

    .topic-content h3 {
      font-size: 1.1rem;
    }

    .topic-slide {
      height: 250px; /* Slightly smaller height for mobile */
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default PopularTopics;
