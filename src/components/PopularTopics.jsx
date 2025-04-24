import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import * as prismic from "@prismicio/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularTopics = () => {
  const [popularPosts, setPopularPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
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
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, dots: false },
      },
    ],
  };

  if (!popularPosts) {
    return (
      <div className="text-center py-10 text-gray-600">
        <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10 mx-auto mb-3"></div>
        <p>Loading popular topics...</p>
      </div>
    );
  }

  if (popularPosts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl">
        <p>No popular topics available at the moment.</p>
      </div>
    );
  }

  return (
    <section className="px-4 py-8 max-w-screen-xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-6 uppercase tracking-wide border-b pb-2 border-gray-200">
        Movies & TV Shows
      </h2>

      <Slider {...settings}>
        {popularPosts.map((post) => (
          <div key={post.id} className="px-2">
            <article className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white h-[300px] relative">
              <div className="w-full h-full relative">
                {post.data.featured_image?.url ? (
                  <img
                    src={post.data.featured_image.url}
                    alt={post.data.featured_image.alt || ""}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                    No image available
                  </div>
                )}

                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                  <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                    {post.data.title || "Untitled"}
                  </h3>
                  {post.data.category && (
                    <span className="inline-block mt-2 text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {post.data.category}
                    </span>
                  )}
                </div>
              </div>
            </article>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default PopularTopics;
