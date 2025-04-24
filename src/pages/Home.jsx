import { useEffect, useState } from "react";
import { client } from "../lib/prismic";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import FeaturedBlog from "../components/FeaturedBlog";
import PopularTopics from "../components/PopularTopics";
import SponsoredPosts from "../components/sponsoredPosts";
import CelebrityPoll from "../components/CelebrityPoll";
import styled, { keyframes } from "styled-components";

function Home() {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await client.getAllByType("article");
      setArticles(response);
    };
    fetchArticles();
  }, []);

  const bounce = keyframes`
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
  `;

  const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 3rem;
  `;

  const Dot = styled.span`
    width: 8px;
    height: 8px;
    background-color: #333;
    border-radius: 50%;
    display: inline-block;
    animation: ${bounce} 1.4s infinite ease-in-out;
    animation-delay: ${(props) => props.delay};
  `;

  const LoadingDots = () => (
    <LoadingContainer role="status">
      <Dot delay="0s" />
      <Dot delay="0.2s" />
      <Dot delay="0.4s" />
      <span className="sr-only">Loading...</span>
    </LoadingContainer>
  );

  if (!articles) return <LoadingDots />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main Row */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <main className="lg:w-3/4 space-y-8">
          <FeaturedBlog />

          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-600 border-b-2 border-gray-100 pb-2 mb-4 uppercase">
              Latest Articles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={article.data.featured_image.url}
                    alt={article.data.featured_image.alt}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span className="text-blue-600 font-semibold uppercase">
                        {article.data.category}
                      </span>
                      {article.data.publication_date && (
                        <span>
                          {format(
                            new Date(article.data.publication_date),
                            "MMM dd, yyyy"
                          )}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">
                      <Link
                        to={`/article/${article.uid}`}
                        className="hover:text-blue-700 transition-colors"
                      >
                        {article.data.title[0].text}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {article.data.excerpt[0].text}
                    </p>
                    {article.data.author?.[0] && (
                      <div className="flex items-center mt-4">
                        <img
                          src={article.data.author[0].author_image.url}
                          alt={article.data.author[0].author_name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700">
                          {article.data.author[0].author_name}
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        {/* Right Column / Sidebar */}
        <aside className="lg:w-1/4 space-y-6">
          <div className="sticky top-4 space-y-6">
            <SponsoredPosts />
            <CelebrityPoll />
          </div>
        </aside>
      </div>

      {/* Full Width Section */}
      <section className="mt-12">
        <PopularTopics />
      </section>
    </div>
  );
}

export default Home;
