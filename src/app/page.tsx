'use client';

import { useState, useCallback, Suspense } from 'react';
import LoginPage from '../components/LoginPage';
import AdminDashboard from '../components/AdminDashboard';
import AnalystDashboard from '../components/AnalystDashboard';
import { User } from '../types/index';

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-blue-600 font-medium">Loading CMC Data Entry System...</p>
      </div>
    </div>
  );
}

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error('Error in HomePage:', error);
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
          <p className="text-gray-600 mb-4">Unable to load the CMC Data Entry System.</p>
          <pre className="text-xs text-gray-500 mb-4 text-left overflow-auto">
            {error instanceof Error ? error.message : String(error)}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}

function CMCDataEntrySystem() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // Project-specific parameter assignments: { projectId_year_period: { userId: [parameters] } }
  const [projectParameterAssignments, setProjectParameterAssignments] = useState<Record<string, Record<string, string[]>>>({
    // Demo assignments for testing - NWMP 2025 Pre-monsoon
    '1_2025_1': {
      '2': ['Date', 'Time', 'pH', 'Temperature', 'Conductivity', 'Dissolved Oxygen'], // Marine Data Analyst
      '3': ['Date', 'Time', 'pH', 'Conductivity', 'BOD', 'Arsenic', 'Cadmium', 'Lead'], // Water Quality Chemist
      '4': ['Date', 'Time', 'Dissolved Oxygen', 'Turbidity', 'Fecal Coliform'], // Marine Biologist
      '5': ['Date', 'Time', 'Temperature', 'Suspended Solids', 'Turbidity', 'Iron', 'Manganese'], // Lab Technician
    },
    // Demo assignments for ICZMP 2025 Pre-monsoon
    '2_2025_1': {
      '2': ['Date', 'Time', 'pH', 'Temperature', 'Salinity', 'BOD'],
      '3': ['Date', 'Time', 'Conductivity', 'Arsenic', 'Cadmium', 'Lead'],
    },
    // Demo assignments for NWMP 2024 Pre-monsoon
    '1_2024_1': {
      '2': ['pH', 'Temperature', 'Conductivity', 'Dissolved Oxygen'],
      '3': ['pH', 'BOD', 'Arsenic', 'Lead'],
    }
  });

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  // Helper function to get user's assigned parameters for specific project/year/period
  const getUserParametersForProject = useCallback((userId: string, projectId: string, year: string, period: string) => {
    const projectKey = `${projectId}_${year}_${period}`;
    const projectAssignments = projectParameterAssignments[projectKey] || {};
    const userParams = projectAssignments[userId] || [];
    return userParams;
  }, [projectParameterAssignments]);

  try {
    if (!currentUser) {
      return <LoginPage onLogin={handleLogin} />;
    }

    if (currentUser.role === 'admin') {
      return (
        <AdminDashboard 
          user={currentUser} 
          onLogout={handleLogout}
          projectParameterAssignments={projectParameterAssignments}
          setProjectParameterAssignments={setProjectParameterAssignments}
        />
      );
    }

    return (
      <AnalystDashboard 
        user={currentUser} 
        onLogout={handleLogout}
        getUserParametersForProject={getUserParametersForProject}
      />
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
          <p className="text-gray-600 mb-4">Something went wrong. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}

export default function HomePage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <CMCDataEntrySystem />
      </Suspense>
    </ErrorBoundary>
  );
}
