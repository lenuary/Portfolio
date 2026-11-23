export interface ProjectItem {
  slug: string
  title: string
  summary: string
  details: string
  icon: string
  image: string
  cardBg: string
  stack: readonly string[]
  githubUrl?: string
  liveUrl?: string
  highlights: readonly string[]
}

const PROJECTS: readonly ProjectItem[] = [
{
  slug: 'Project1',
  title: 'Lorem Ipsum Dolor Sit Amet',
  summary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo nec lorem tincidunt consequat.',
  details:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
  icon: 'i-lucide-monitor',
  image:
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
  cardBg: 'bg-zinc-900 border border-zinc-800',
  stack: ['Vue 3'],
  githubUrl: 'https://github.com/lenuary',
  highlights: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Integer posuere erat a ante venenatis dapibus posuere velit aliquet',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem'
  ]
},
{
  slug: 'Project2',
  title: 'Lorem Ipsum Dolor Sit Amet',
  summary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo nec lorem tincidunt consequat.',
  details:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
  icon: 'i-lucide-monitor',
  image:
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
  cardBg: 'bg-zinc-900 border border-zinc-800',
  stack: ['Vue 3'],
  githubUrl: 'https://github.com/lenuary',
  highlights: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Integer posuere erat a ante venenatis dapibus posuere velit aliquet',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem'
  ]
}
]

export function useProjects() {
  const getProjectBySlug = (slug: string | undefined): ProjectItem | undefined =>
    PROJECTS.find((project) => project.slug === slug)

  return {
    projects: PROJECTS,
    getProjectBySlug
  }
}