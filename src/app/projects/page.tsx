import ProjectsClient from './ProjectsClient';
import { projectsMetadata } from './metadata';

export const metadata = projectsMetadata;

export default function ProjectsPage() {
  return <ProjectsClient />;
}
