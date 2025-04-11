import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { client } from "../lib/prismic";

// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedBlog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await client.getAllByType("article", {
          orderings: {
            field: "document.first_publication_date",
            direction: "desc",
          },
          limit: 5,
        });
        console.log("Fetched articles:", response);
        setArticles(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const settings = {
    dots: true,
    infinite: articles.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  if (loading || articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-[400px] bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container md:mx-auto md:px-4 py-4">
      <div className="relative">
        <Slider {...settings} className="featured-slider">
          {articles.map((article) => (
            <div key={article.id}>
              <div className="relative h-[200px] md:h-[350px] rounded-lg overflow-hidden">
                {/* Image Background */}
                <img
                  src={article.data.featured_image.url}
                  alt={article.data.featured_image.alt || ""}
                  className="w-full h-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  {/* Post Meta */}
                  <div className="flex items-center space-x-4 mb-4 text-white">
                    <div className="flex items-center">
                      <span>
                        {new Date(
                          article.first_publication_date
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <span>•</span>
                    <span>{article.data.read_time || "5"} min read</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    <Link
                      to={`/article/${article.uid}`}
                      className="hover:text-blue-300 transition-colors"
                    >
                      {article.data.title[0].text}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/80 mb-6 line-clamp-2">
                    {article.data.excerpt[0].text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedBlog;
