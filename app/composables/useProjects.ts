export interface ProjectSection {
  heading: string
  paragraphs: readonly string[]
}

export interface ProjectItem {
  slug: string
  order: number
  title: string
  summary: string
  details: string
  image: string
  cardBg: string
  stack: readonly string[]
  role?: string
  timeline?: string
  status?: string
  liveUrl?: string
  githubUrl?: string
  sections?: readonly ProjectSection[]
  highlights: readonly string[]
}

const projectModules = import.meta.glob<{ project: ProjectItem }>(
  '~/data/projects/*.ts',
  { eager: true }
)

const PROJECTS: readonly ProjectItem[] = Object.values(projectModules)
  .map((mod) => mod.project)
  .sort((a, b) => a.order - b.order)

export function useProjects() {
  const getProjectBySlug = (slug: string | undefined): ProjectItem | undefined =>
    PROJECTS.find((project) => project.slug === slug)

  return {
    projects: PROJECTS,
    getProjectBySlug
  }
}