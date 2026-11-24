export interface BlogPost {
  slug: string
  order?: number
  title: string
  excerpt: string
  content: string
  publishedAt: string
  readTime: string
  tag: string
}

const postModules = import.meta.glob<{ post: BlogPost }>('~/data/blog/*.ts', {
  eager: true
})

const POSTS: readonly BlogPost[] = Object.values(postModules)
  .map((mod) => mod.post)
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

export function useBlog() {
  const getPostBySlug = (slug: string | undefined): BlogPost | undefined =>
    POSTS.find((post) => post.slug === slug)

  return {
    posts: POSTS,
    getPostBySlug
  }
}