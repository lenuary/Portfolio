import type { ProjectItem } from '~/composables/useProjects'

export const project: ProjectItem = {
  slug: 'project-1',
  order: 1,
  title: 'Project 01',
  summary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  details:
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  role: 'Lead Developer',
  timeline: '2026',
  status: 'In development',
  image:
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
  cardBg: 'bg-zinc-900 border border-zinc-800',
  stack: ['Vue 3', 'Nuxt', 'TypeScript', 'Tailwind CSS'],
  liveUrl: 'https://www.lipsum.com/',
  githubUrl: 'https://www.lipsum.com/',
  sections: [
    {
      heading: 'Overview',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ]
    },
    {
      heading: 'Architecture & Implementation',
      paragraphs: [
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
      ]
    }
  ],
  highlights: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Ut enim ad minim veniam, quis nostrud exercitation',
    'Duis aute irure dolor in reprehenderit in voluptate'
  ]
}