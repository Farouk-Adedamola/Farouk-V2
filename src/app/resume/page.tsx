import ResumeClient from './ResumeClient';
import { resumeMetadata } from './metadata';

export const metadata = resumeMetadata;

export default function Resume() {
  return <ResumeClient />;
}
