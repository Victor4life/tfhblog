import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../lib/prismic";

function Category() {
  const { category } = useParams();
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await client.getAllByType("article", {
        predicates: [["my.article.category", "==", category]],
      });
      setArticles(response);
    };

    fetchArticles();
  }, [category]);

  if (!articles) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 capitalize">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={article.data.featured_image.url}
              alt={article.data.featured_image.alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">
                <Link
                  to={`/article/${article.uid}`}
                  className="hover:text-blue-600"
                >
                  {article.data.title[0].text}
                </Link>
              </h2>
              <p className="mt-2 text-gray-600 line-clamp-3">
                {article.data.excerpt[0].text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Category;
