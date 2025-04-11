import * as prismic from "@prismicio/client";

// Make sure these environment variables are properly set in your .env file
const repositoryName = import.meta.env.VITE_PRISMIC_REPOSITORY_NAME;
const accessToken = import.meta.env.VITE_PRISMIC_ACCESS_TOKEN;

// Add error handling and validation
if (!repositoryName) {
  throw new Error("Missing VITE_PRISMIC_REPOSITORY_NAME environment variable");
}

if (!accessToken) {
  throw new Error("Missing VITE_PRISMIC_ACCESS_TOKEN environment variable");
}

export const client = prismic.createClient(repositoryName, {
  accessToken,
  routes: [
    {
      type: "article",
      path: "/article/:uid",
    },
  ],
});
