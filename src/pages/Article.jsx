import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { client } from "../lib/prismic";

function Article() {
  const { uid } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await client.getByUID("article", uid);
      setArticle(response);
    };

    fetchArticle();
  }, [uid]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const { data } = article;
  const publicationDate = data.publication_date
    ? format(new Date(data.publication_date), "MMMM dd, yyyy")
    : null;

  return (
    <article className="max-w-3xl mx-auto">
      <img
        src={data.featured_image.url}
        alt={data.featured_image.alt}
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <span className="text-blue-600">{data.category}</span>
          {publicationDate && (
            <span className="text-gray-500">{publicationDate}</span>
          )}
        </div>

        <h1 className="text-4xl font-bold mt-2">{data.title[0].text}</h1>

        {data.author && data.author.length > 0 && (
          <div className="flex items-center mt-4">
            <img
              src={data.author[0].author_image.url}
              alt={data.author[0].author_name}
              className="w-12 h-12 rounded-full"
            />
            <span className="ml-3 text-gray-700">
              {data.author[0].author_name}
            </span>
          </div>
        )}

        {data.tags && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {data.tags.split(",").map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        <div className="prose mt-6 max-w-none">
          {data.content.map((slice, index) => {
            switch (slice.type) {
              case "paragraph":
                return (
                  <p key={index} className="mb-4">
                    {slice.text}
                  </p>
                );
              case "heading2":
                return (
                  <h2 key={index} className="text-2xl font-bold mt-6 mb-4">
                    {slice.text}
                  </h2>
                );
              case "heading3":
                return (
                  <h3 key={index} className="text-xl font-bold mt-6 mb-3">
                    {slice.text}
                  </h3>
                );
              case "list-item":
                return (
                  <li key={index} className="ml-4">
                    {slice.text}
                  </li>
                );
              default:
                return (
                  <p key={index} className="mb-4">
                    {slice.text}
                  </p>
                );
            }
          })}
        </div>
      </div>
    </article>
  );
}

export default Article;
