import { useEffect, useState } from "react";
import { client } from "../lib/prismic";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import FeaturedBlog from "../components/FeaturedBlog";
import PopularTopics from "../components/PopularTopics";
import SponsoredPosts from "../components/SponsoredPosts";
import CelebrityPoll from "../components/CelebrityPoll";
import styled, { keyframes } from "styled-components";

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

function Home() {
  const [articles, setArticles] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await client.getAllByType("article");
      setArticles(response);
    };
    fetchArticles();
  }, []);

  if (!articles) return <LoadingDots />;

  const sortedArticles = [...articles].sort(
    (a, b) =>
      new Date(b.data.publication_date) - new Date(a.data.publication_date)
  );

  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const paginatedArticles = sortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="lg:w-3/4 space-y-8">
          <FeaturedBlog />

          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-600 border-b-2 border-gray-100 pb-2 mb-4 uppercase">
              Latest Articles
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {paginatedArticles[0] && (
                <article
                  key={paginatedArticles[0].id}
                  className="lg:col-span-2 bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={paginatedArticles[0].data.featured_image.url}
                    alt={paginatedArticles[0].data.featured_image.alt}
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span className="text-blue-600 font-semibold uppercase">
                        {paginatedArticles[0].data.category}
                      </span>
                      {paginatedArticles[0].data.publication_date && (
                        <span>
                          {format(
                            new Date(
                              paginatedArticles[0].data.publication_date
                            ),
                            "MMM dd, yyyy"
                          )}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
                      <Link
                        to={`/article/${paginatedArticles[0].uid}`}
                        className="hover:text-blue-700 transition-colors"
                      >
                        {paginatedArticles[0].data.title[0].text}
                      </Link>
                    </h2>
                    <p className="text-gray-700 text-base line-clamp-3">
                      {paginatedArticles[0].data.excerpt[0].text}
                    </p>
                  </div>
                </article>
              )}

              <div className="flex flex-col gap-6">
                {paginatedArticles.slice(1, 3).map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
                  >
                    <img
                      src={article.data.featured_image.url}
                      alt={article.data.featured_image.alt}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <span className="text-blue-600 text-xs font-semibold uppercase">
                        {article.data.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-800 mt-2 line-clamp-2">
                        <Link
                          to={`/article/${article.uid}`}
                          className="hover:text-blue-700 transition-colors"
                        >
                          {article.data.title[0].text}
                        </Link>
                      </h3>
                    </div>
                  </article>
                ))}
              </div>

              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedArticles.slice(3, 6).map((article) => (
                  <article
                    key={article.id}
                    className="flex items-center gap-3 bg-white rounded-xl shadow hover:shadow-md transition-shadow duration-300 p-3"
                  >
                    <img
                      src={article.data.featured_image.url}
                      alt={article.data.featured_image.alt}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex flex-col">
                      <span className="text-blue-600 text-xs uppercase font-semibold">
                        {article.data.category}
                      </span>
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-2">
                        <Link
                          to={`/article/${article.uid}`}
                          className="hover:text-blue-700 transition-colors"
                        >
                          {article.data.title[0].text}
                        </Link>
                      </h4>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </section>
        </main>

        <aside className="lg:w-1/4 space-y-6">
          <div className="sticky top-4 space-y-6">
            <SponsoredPosts />
            <CelebrityPoll />
          </div>
        </aside>
      </div>

      <section className="mt-12">
        <PopularTopics />
      </section>
    </div>
  );
}

export default Home;
