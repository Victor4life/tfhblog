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
    arrows: false,
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
          <div className="h-[400px] bg-gray-200 rounded-xl shadow-inner"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-6">
      <Slider {...settings} className="rounded-xl overflow-hidden">
        {articles.map((article) => (
          <div key={article.id}>
            <div className="relative h-[220px] md:h-[400px] rounded-xl overflow-hidden">
              {/* Background Image */}
              <img
                src={article.data.featured_image.url}
                alt={article.data.featured_image.alt || ""}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                <div className="flex items-center space-x-4 text-sm mb-3">
                  <span>
                    {new Date(
                      article.first_publication_date
                    ).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span>{article.data.read_time || "5"} min read</span>
                </div>

                <h3 className="text-xl md:text-3xl font-bold leading-snug mb-3">
                  <Link
                    to={`/article/${article.uid}`}
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    {article.data.title[0].text}
                  </Link>
                </h3>

                <p className="text-white/80 text-sm md:text-base line-clamp-2">
                  {article.data.excerpt[0].text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default FeaturedBlog;
