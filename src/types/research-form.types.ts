export interface IResearchFormData {
  // Personal Information
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;

  // Professional Information
  occupation: string;
  company: string;
  experience: string;
  education: string;

  // Research Specific
  researchArea: string;
  projectTitle: string;
  projectDescription: string;
  budget: string;

  // Additional Information
  preferredContactMethod: string;
  availabilityDate: string;
  additionalNotes?: string;
}

export interface IFormSubmissionResponse {
  success: boolean;
  message: string;
  data?: IResearchFormData;
}

export interface IApiError {
  message: string;
  status: number;
  details?: string;
}

export type ContactMethod = 'email' | 'phone' | 'whatsapp' | 'video-call';

export type ExperienceLevel = 'junior' | 'mid-level' | 'senior' | 'expert';

export type EducationLevel =
  | 'high-school'
  | 'bachelor'
  | 'master'
  | 'phd'
  | 'other';

export type ResearchAreaType =
  | 'technology'
  | 'healthcare'
  | 'education'
  | 'business'
  | 'social-sciences'
  | 'environmental'
  | 'other';
