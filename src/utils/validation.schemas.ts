import { z } from 'zod';

export const researchFormSchema = z.object({
  // Personal Information
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Full name can only contain letters and spaces'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters'),

  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(/^[+]?[0-9\s\-()]+$/, 'Please enter a valid phone number'),

  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 16 && age <= 100;
    }, 'Age must be between 16 and 100 years'),

  // Professional Information
  occupation: z
    .string()
    .min(2, 'Occupation must be at least 2 characters')
    .max(100, 'Occupation must not exceed 100 characters'),

  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must not exceed 100 characters'),

  experience: z.string().min(1, 'Please select your experience level'),

  education: z.string().min(1, 'Please select your education level'),

  // Research Specific
  researchArea: z.string().min(1, 'Please select a research area'),

  projectTitle: z
    .string()
    .min(5, 'Project title must be at least 5 characters')
    .max(200, 'Project title must not exceed 200 characters'),

  projectDescription: z
    .string()
    .min(50, 'Project description must be at least 50 characters')
    .max(1000, 'Project description must not exceed 1000 characters'),

  budget: z
    .string()
    .min(1, 'Budget is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Please enter a valid budget amount'),

  // Additional Information
  preferredContactMethod: z
    .string()
    .min(1, 'Please select a preferred contact method'),

  availabilityDate: z
    .string()
    .min(1, 'Availability date is required')
    .refine((date) => {
      const availDate = new Date(date);
      const today = new Date();
      return availDate >= today;
    }, 'Availability date must be today or in the future'),

  additionalNotes: z
    .string()
    .max(500, 'Additional notes must not exceed 500 characters')
    .optional(),
});

export type ResearchFormSchema = z.infer<typeof researchFormSchema>;
