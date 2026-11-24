import type { ProjectItem } from "~/composables/useProjects";

export const project: ProjectItem = {
  slug: "kocie-wzgorze",
  order: 1,
  title: "Kocie Wzgórze",
  summary:
    "A modern, visually driven website for a cat shelter, designed to connect rescued cats with people looking for a new companion.",
  details:
    "A responsive shelter website focused on cat adoption, presenting animals waiting for a home and encouraging visitors to support the shelter through volunteering, donations and temporary foster care.",
  role: "Web Developer",
  timeline: "2026",
  status: "Completed",
  image: "/project-1.png",
  cardBg: "bg-zinc-900 border border-zinc-800",
  stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
  liveUrl: "https://schronisko-three.vercel.app/",
  githubUrl: "https://github.com/lenuary/Schronisko",
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "Kocie Wzgórze is a website concept for a cat shelter, created to make animal adoption more approachable and engaging. The website introduces cats looking for a home through individual profiles, descriptions and personality traits.",
        "The project combines a warm visual identity with a clear content structure, helping visitors explore available cats and discover different ways to support the shelter.",
      ],
    },
    {
      heading: "Design & Implementation",
      paragraphs: [
        "The interface was designed around a welcoming, editorial-inspired aesthetic, using carefully arranged typography, imagery and spacious layouts to create an emotional connection with visitors.",
        "The website includes dedicated sections for cat adoption, volunteering, donations, temporary foster care and shelter information. The layout is designed to provide an intuitive browsing experience across different screen sizes.",
      ],
    },
  ],
  highlights: [
    "Dedicated cat profiles with descriptions and personality traits",
    "Adoption-focused design and intuitive navigation",
    "Dedicated sections for volunteering, donations and foster care",
    "Responsive layout with a consistent visual identity",
  ],
};
