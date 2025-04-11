import { useEffect, useState } from "react";
import { client } from "../lib/prismic";
import { format } from "date-fns"; // Add this import
import { Link } from "react-router-dom"; // Make sure this is also imported
import FeaturedBlog from "../components/FeaturedBlog";

function Home() {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await client.getAllByType("article");
      setArticles(response);
    };

    fetchArticles();
  }, []);

  if (!articles) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <FeaturedBlog />
      <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-8 py-4 uppercase tracking-wide border-b-2 border-gray-200 hover:text-blue-600 transition-colors duration-300">
        Latest Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={article.data.featured_image.url}
              alt={article.data.featured_image.alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-600">
                  {article.data.category}
                </span>
                {article.data.publication_date && (
                  <span className="text-sm text-gray-500">
                    {format(
                      new Date(article.data.publication_date),
                      "MMM dd, yyyy"
                    )}
                  </span>
                )}
              </div>

              <h2 className="text-xl font-semibold">
                <Link
                  to={`/article/${article.uid}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {article.data.title[0].text}
                </Link>
              </h2>

              <p className="mt-2 text-gray-600 line-clamp-3">
                {article.data.excerpt[0].text}
              </p>

              {article.data.author && article.data.author.length > 0 && (
                <div className="flex items-center mt-4">
                  <img
                    src={article.data.author[0].author_image.url}
                    alt={article.data.author[0].author_name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {article.data.author[0].author_name}
                  </span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default Home;
