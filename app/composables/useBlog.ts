export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: string;
  tag: string;
}

const POSTS: readonly BlogPost[] = [
  {
    slug: "blog1",
    title: "Lorem Ipsum Dolor Sit Amet",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo nec lorem tincidunt consequat. Suspendisse potenti. Curabitur euismod, nisl vitae facilisis tincidunt, erat nunc posuere magna, vitae feugiat sapien ligula at nisl.",
    publishedAt: "Nov 20, 2026",
    readTime: "3 min read",
    tag: "Lorem",
  },
  {
    slug: "blog2",
    title: "Consectetur Adipiscing Elit",
    excerpt:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    publishedAt: "Nov 12, 2026",
    readTime: "4 min read",
    tag: "Lorem",
  },
];

export function useBlog() {
  const getPostBySlug = (slug: string | undefined): BlogPost | undefined =>
    POSTS.find((post) => post.slug === slug);

  return {
    posts: POSTS,
    getPostBySlug,
  };
}
