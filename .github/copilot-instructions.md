# Copilot Instructions for Analyst Data Entry System

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a web-based data entry form application built with Next.js 14, TypeScript, and Tailwind CSS. The application allows analysts to input analysis parameters and sample collection data in a structured format.

## Key Features
- Modern responsive web interface
- Form validation using React Hook Form and Zod
- Dynamic parameter addition/removal
- Excel import/export functionality
- Real-time form state management
- Clean, professional UI with Tailwind CSS

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Data Handling**: XLSX for Excel integration

## Code Style Guidelines
- Use TypeScript for all new files
- Follow React functional component patterns
- Use Tailwind CSS classes for styling
- Implement proper form validation with Zod schemas
- Use semantic HTML and accessibility best practices
- Keep components modular and reusable

## File Structure
- `/src/app/` - Next.js App Router pages and layouts
- `/src/components/` - Reusable React components
- `/src/lib/` - Utility functions and configurations
- `/src/types/` - TypeScript type definitions

## Development Notes
- The application uses the new Next.js App Router
- All components should be client-side rendered when using hooks
- Form validation is handled through Zod schemas
- Excel functionality will be implemented using the XLSX library
- The design follows a modern scientific/laboratory aesthetic

## Common Patterns
- Use `'use client'` directive for interactive components
- Implement proper error handling and loading states
- Use TypeScript interfaces for data structures
- Follow the established form validation patterns
- Maintain consistent styling with the existing design system
