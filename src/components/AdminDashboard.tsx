'use client';

import { useState } from 'react';
import { 
  Users, Database, LogOut, BarChart3, Settings, FileText,
  Plus, Trash2, Edit, Check, X, Calendar, MapPin
} from 'lucide-react';
import { User } from '../types';
import { PROJECTS, DEMO_USERS, PERIODS, YEARS, PROJECT_CONFIGURATIONS } from '../data/constants';
import { getTotalDistricts } from '../lib/utils';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  projectParameterAssignments: Record<string, Record<string, string[]>>;
  setProjectParameterAssignments: React.Dispatch<React.SetStateAction<Record<string, Record<string, string[]>>>>;
}

export default function AdminDashboard({ 
  user, 
  onLogout, 
  projectParameterAssignments, 
  setProjectParameterAssignments 
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState(DEMO_USERS);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedProjectForParams, setSelectedProjectForParams] = useState('');
  const [selectedYearForParams, setSelectedYearForParams] = useState(new Date().getFullYear().toString());
  const [selectedPeriodForParams, setSelectedPeriodForParams] = useState('');
  
  // Configuration confirmation state
  const [isConfigurationConfirmed, setIsConfigurationConfirmed] = useState(false);
  const [confirmedConfiguration, setConfirmedConfiguration] = useState<{
    projectId: string;
    year: string;
    period: string;
    parameters: string[];
  } | null>(null);
  const [showParameterAssignmentMatrix, setShowParameterAssignmentMatrix] = useState(false);
  
  // Parameter selection state
  const [selectedParametersForAssignment, setSelectedParametersForAssignment] = useState<string[]>([]);
  const [showParameterSelection, setShowParameterSelection] = useState(false);
  
  // Assignment submission state
  const [assignmentHistory, setAssignmentHistory] = useState<Array<{
    id: string;
    projectName: string;
    year: string;
    period: string;
    parameters: string[];
    assignments: Record<string, string[]>;
    submittedAt: string;
    submittedBy: string;
  }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    name: '',
    department: '',
    role: 'analyst' as 'admin' | 'analyst'
  });

  // Get current project configuration
  const getCurrentProjectConfig = () => {
    return PROJECT_CONFIGURATIONS.find(config => 
      config.projectId === selectedProjectForParams && 
      config.year === selectedYearForParams && 
      config.period === selectedPeriodForParams
    );
  };

  // Get available parameters for current project configuration
  const getAvailableParameters = () => {
    const currentConfig = getCurrentProjectConfig();
    return currentConfig ? currentConfig.parameters : [];
  };

  // Get project-specific key
  const getProjectKey = (projectId: string, year: string, period: string) => {
    return `${projectId}_${year}_${period}`;
  };

  // Get current project assignments
  const getCurrentProjectAssignments = () => {
    const projectKey = getProjectKey(selectedProjectForParams, selectedYearForParams, selectedPeriodForParams);
    return projectParameterAssignments[projectKey] || {};
  };

  // Get assigned parameters for specific user in current project
  const getUserParametersForProject = (userId: string) => {
    const currentAssignments = getCurrentProjectAssignments();
    return currentAssignments[userId] || [];
  };

  // Check if parameter is already assigned to another user in current project
  const isParameterAssignedToOtherUser = (parameter: string, excludeUserId: string) => {
    const currentAssignments = getCurrentProjectAssignments();
    return Object.entries(currentAssignments).some(([userId, parameters]) => 
      userId !== excludeUserId && parameters.includes(parameter)
    );
  };

  // Handle project-specific parameter assignment
  const handleProjectParameterAssignment = (userId: string, parameter: string, isAssigned: boolean) => {
    const projectKey = getProjectKey(selectedProjectForParams, selectedYearForParams, selectedPeriodForParams);
    
    if (isAssigned && isParameterAssignedToOtherUser(parameter, userId)) {
      alert(`Parameter "${parameter}" is already assigned to another analyst for this project, year, and period.`);
      return;
    }

    setProjectParameterAssignments(prev => {
      const updated = { ...prev };
      if (!updated[projectKey]) {
        updated[projectKey] = {};
      }
      
      const userParams = updated[projectKey][userId] || [];
      if (isAssigned) {
        if (!userParams.includes(parameter)) {
          updated[projectKey][userId] = [...userParams, parameter];
        }
      } else {
        updated[projectKey][userId] = userParams.filter(p => p !== parameter);
        if (updated[projectKey][userId].length === 0) {
          delete updated[projectKey][userId];
        }
      }
      
      if (Object.keys(updated[projectKey]).length === 0) {
        delete updated[projectKey];
      }
      
      return updated;
    });
  };

  // Handle assign all parameters for user in current project
  const handleAssignAllParametersForProject = (userId: string) => {
    const availableParams = isConfigurationConfirmed && confirmedConfiguration 
      ? confirmedConfiguration.parameters 
      : getAvailableParameters();
    const projectKey = getProjectKey(selectedProjectForParams, selectedYearForParams, selectedPeriodForParams);
    
    // Check which parameters are already assigned to other users
    const alreadyAssigned = availableParams.filter(param => 
      isParameterAssignedToOtherUser(param, userId)
    );
    
    if (alreadyAssigned.length > 0) {
      alert(`The following parameters are already assigned to other analysts: ${alreadyAssigned.join(', ')}`);
      return;
    }
    
    setProjectParameterAssignments(prev => ({
      ...prev,
      [projectKey]: {
        ...prev[projectKey],
        [userId]: availableParams
      }
    }));
  };

  // Handle clear all parameters for user in current project
  const handleClearAllParametersForProject = (userId: string) => {
    const projectKey = getProjectKey(selectedProjectForParams, selectedYearForParams, selectedPeriodForParams);
    
    setProjectParameterAssignments(prev => {
      const updated = { ...prev };
      if (updated[projectKey]) {
        delete updated[projectKey][userId];
        if (Object.keys(updated[projectKey]).length === 0) {
          delete updated[projectKey];
        }
      }
      return updated;
    });
  };

  // Handle parameter selection for assignment
  const handleParameterToggle = (parameter: string) => {
    setSelectedParametersForAssignment(prev => {
      if (prev.includes(parameter)) {
        return prev.filter(p => p !== parameter);
      } else {
        return [...prev, parameter];
      }
    });
  };

  // Handle select all parameters
  const handleSelectAllParameters = () => {
    setSelectedParametersForAssignment(getAvailableParameters());
  };

  // Handle clear all parameters
  const handleClearAllParameters = () => {
    setSelectedParametersForAssignment([]);
  };

  // Handle configuration confirmation with selected parameters
  const handleConfirmConfigurationWithSelectedParams = () => {
    if (!selectedProjectForParams || !selectedYearForParams || !selectedPeriodForParams) {
      alert('Please select project, year, and period first');
      return;
    }

    if (selectedParametersForAssignment.length === 0) {
      alert('Please select at least one parameter to assign');
      return;
    }

    const project = PROJECTS.find(p => p.id === selectedProjectForParams);
    const period = PERIODS.find(p => p.id === selectedPeriodForParams);
    
    setConfirmedConfiguration({
      projectId: selectedProjectForParams,
      year: selectedYearForParams,
      period: selectedPeriodForParams,
      parameters: selectedParametersForAssignment
    });
    setIsConfigurationConfirmed(true);
    setShowParameterAssignmentMatrix(true);
    setShowParameterSelection(false);
    
    alert(`Configuration confirmed for ${project?.name} ${selectedYearForParams} ${period?.name} with ${selectedParametersForAssignment.length} selected parameters`);
  };

  // Handle submit assignment
  const handleSubmitAssignment = () => {
    if (!confirmedConfiguration) {
      alert('No confirmed configuration found');
      return;
    }

    const currentAssignments = getCurrentProjectAssignments();
    const assignedAnalysts = Object.keys(currentAssignments);
    
    if (assignedAnalysts.length === 0) {
      alert('Please assign parameters to at least one analyst before submitting');
      return;
    }

    setIsSubmitting(true);
    
    // Create assignment record
    const assignmentRecord = {
      id: Date.now().toString(),
      projectName: PROJECTS.find(p => p.id === selectedProjectForParams)?.name || 'Unknown Project',
      year: selectedYearForParams,
      period: PERIODS.find(p => p.id === selectedPeriodForParams)?.name || 'Unknown Period',
      parameters: confirmedConfiguration.parameters,
      assignments: currentAssignments,
      submittedAt: new Date().toISOString(),
      submittedBy: user.name
    };

    // Save to assignment history
    setAssignmentHistory(prev => [...prev, assignmentRecord]);
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Assignment submitted successfully! 
      
Project: ${assignmentRecord.projectName}
Year: ${assignmentRecord.year}
Period: ${assignmentRecord.period}
Parameters: ${assignmentRecord.parameters.length}
Analysts: ${assignedAnalysts.length}
      
You can view this assignment in the Parameter Assignment History.`);
      
      // Reset the configuration for next assignment
      handleResetConfigurationAndSelection();
    }, 1500);
  };

  // Get assignment summary for current configuration
  const getAssignmentSummary = () => {
    if (!confirmedConfiguration) return null;
    
    const currentAssignments = getCurrentProjectAssignments();
    const assignedAnalysts = Object.keys(currentAssignments);
    const totalAssignedParameters = Object.values(currentAssignments).reduce((sum, params) => sum + params.length, 0);
    
    return {
      analysts: assignedAnalysts.length,
      totalAssignments: totalAssignedParameters,
      parameters: confirmedConfiguration.parameters.length
    };
  };

  // Reset configuration and parameter selection
  const handleResetConfigurationAndSelection = () => {
    setIsConfigurationConfirmed(false);
    setConfirmedConfiguration(null);
    setShowParameterAssignmentMatrix(false);
    setShowParameterSelection(false);
    setSelectedParametersForAssignment([]);
    
    // Note: Keeping assignments in state so analysts can see them
    // The assignments are not cleared to maintain data for analysts
  };

  // Handle configuration confirmation
  const handleConfirmConfiguration = () => {
    if (!selectedProjectForParams || !selectedYearForParams || !selectedPeriodForParams) {
      alert('Please select project, year, and period first');
      return;
    }

    const availableParams = getAvailableParameters();
    if (availableParams.length === 0) {
      alert('No parameters available for this configuration');
      return;
    }

    // Check if this is NWMP 2025 Pre-monsoon
    const project = PROJECTS.find(p => p.id === selectedProjectForParams);
    const period = PERIODS.find(p => p.id === selectedPeriodForParams);
    
    if (project?.name === 'National Water Monitoring Programme' && 
        selectedYearForParams === '2025' && 
        period?.name === 'Pre-monsoon') {
      
      setConfirmedConfiguration({
        projectId: selectedProjectForParams,
        year: selectedYearForParams,
        period: selectedPeriodForParams,
        parameters: availableParams
      });
      setIsConfigurationConfirmed(true);
      setShowParameterAssignmentMatrix(true);
      alert(`Configuration confirmed for ${project.name} ${selectedYearForParams} ${period.name} with ${availableParams.length} parameters including Date and Time`);
    } else {
      alert('Configuration confirmation is currently only available for NWMP 2025 Pre-monsoon period');
    }
  };

  // Handle reset configuration
  const handleResetConfiguration = () => {
    handleResetConfigurationAndSelection();
  };

  // User management functions
  const handleCreateUser = () => {
    if (!newUser.username || !newUser.password || !newUser.name) {
      alert('Please fill in all required fields');
      return;
    }

    const userExists = users.some(u => u.username === newUser.username);
    if (userExists) {
      alert('Username already exists');
      return;
    }

    const createdUser: User = {
      id: (users.length + 1).toString(),
      ...newUser,
      email: '',
      isActive: true
    };

    setUsers([...users, createdUser]);
    setNewUser({
      username: '',
      password: '',
      name: '',
      department: '',
      role: 'analyst'
    });
    setShowUserForm(false);
    alert('User created successfully!');
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewUser({
      username: user.username,
      password: user.password,
      name: user.name,
      department: user.department || '',
      role: user.role
    });
    setShowUserForm(true);
  };

  const handleUpdateUser = () => {
    if (!editingUser || !newUser.username || !newUser.password || !newUser.name) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if username already exists (excluding current user)
    if (users.some(u => u.username === newUser.username && u.id !== editingUser.id)) {
      alert('Username already exists');
      return;
    }

    const updatedUser: User = {
      ...editingUser,
      username: newUser.username,
      password: newUser.password,
      name: newUser.name,
      email: `${newUser.username}@cmc.gov.in`,
      department: newUser.department,
      role: newUser.role
    };

    setUsers(prev => prev.map(u => u.id === editingUser.id ? updatedUser : u));
    setEditingUser(null);
    setShowUserForm(false);
    setNewUser({
      username: '',
      password: '',
      name: '',
      department: '',
      role: 'analyst'
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setShowUserForm(false);
    setNewUser({
      username: '',
      password: '',
      name: '',
      department: '',
      role: 'analyst'
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (userId === user.id) {
      alert('You cannot delete yourself');
      return;
    }
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">CMC Admin Dashboard</h1>
                <p className="text-sm text-gray-500">System Administration & Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role} • {user.department}</p>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                System Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="h-4 w-4" />
                User Management
              </button>
              <button
                onClick={() => setActiveTab('parameters')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === 'parameters'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="h-4 w-4" />
                Parameter Assignment
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Assignment History
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>
                  <p className="text-gray-600 mt-2">Monitor system statistics and quick access to key functions</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-blue-700">Total Users</p>
                        <p className="text-2xl font-bold text-blue-900">{users.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <Database className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-green-700">Active Projects</p>
                        <p className="text-2xl font-bold text-green-900">{PROJECTS.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-500 rounded-lg">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-purple-700">Total Districts</p>
                        <p className="text-2xl font-bold text-purple-900">{getTotalDistricts()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
                    <div className="flex items-center">
                      <div className="p-2 bg-orange-500 rounded-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-orange-700">Configurations</p>
                        <p className="text-2xl font-bold text-orange-900">{PROJECT_CONFIGURATIONS.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                    <p className="text-sm text-gray-600">Common administrative tasks</p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => setActiveTab('users')}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                      >
                        <Users className="h-6 w-6 text-blue-600 mb-2 group-hover:text-blue-700" />
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-900">Manage Users</h4>
                        <p className="text-sm text-gray-500">Add, edit, or remove user accounts</p>
                      </button>
                      <button
                        onClick={() => setActiveTab('parameters')}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                      >
                        <FileText className="h-6 w-6 text-green-600 mb-2 group-hover:text-green-700" />
                        <h4 className="font-medium text-gray-900 group-hover:text-green-900">Assign Parameters</h4>
                        <p className="text-sm text-gray-500">Configure user parameter access</p>
                      </button>
                      <button
                        onClick={() => setActiveTab('history')}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                      >
                        <BarChart3 className="h-6 w-6 text-purple-600 mb-2 group-hover:text-purple-700" />
                        <h4 className="font-medium text-gray-900 group-hover:text-purple-900">Assignment History</h4>
                        <p className="text-sm text-gray-500">View completed assignments</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                    <p className="text-gray-600 mt-2">Manage system users and their access permissions</p>
                  </div>
                  <button
                    onClick={() => setShowUserForm(!showUserForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add New User
                  </button>
                </div>

                {/* User Creation/Edit Form */}
                {showUserForm && (
                  <div className="bg-white rounded-lg shadow-sm border">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">
                        {editingUser ? 'Edit User' : 'Create New User'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {editingUser ? 'Update user account details' : 'Add a new user account to the system'}
                      </p>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username *
                          </label>
                          <input
                            type="text"
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter username"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password *
                          </label>
                          <input
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter password"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Department
                          </label>
                          <input
                            type="text"
                            value={newUser.department}
                            onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter department"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                          </label>
                          <select
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'analyst' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            title="Select User Role"
                          >
                            <option value="analyst">Analyst</option>
                            <option value="admin">Administrator</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-6">
                        <button
                          onClick={editingUser ? handleUpdateUser : handleCreateUser}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Check className="h-4 w-4" />
                          {editingUser ? 'Update User' : 'Create User'}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Users List */}
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Existing Users</h3>
                    <p className="text-sm text-gray-600">Manage existing user accounts</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((u) => (
                          <tr key={u.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{u.name}</div>
                                <div className="text-sm text-gray-500">{u.username}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {u.department || 'Not specified'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEditUser(u)}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="Edit User"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(u.id)}
                                  disabled={u.id === user.id}
                                  className={`text-red-600 hover:text-red-900 ${
                                    u.id === user.id ? 'opacity-50 cursor-not-allowed' : ''
                                  }`}
                                  title={u.id === user.id ? 'Cannot delete yourself' : 'Delete User'}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'parameters' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Parameter Assignment</h2>
                  <p className="text-gray-600 mt-2">Configure which parameters each user can access for data entry</p>
                </div>

                {/* Project Configuration Selection */}
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Project Configuration</h3>
                    <p className="text-sm text-gray-600">Select project, year, and period to manage parameter assignments</p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Database className="h-4 w-4 inline mr-1" />
                          Project
                        </label>
                        <select
                          value={selectedProjectForParams}
                          onChange={(e) => {
                            setSelectedProjectForParams(e.target.value);
                            setSelectedParametersForAssignment([]);
                            setIsConfigurationConfirmed(false);
                            setShowParameterAssignmentMatrix(false);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={isConfigurationConfirmed}
                          title="Select Project"
                        >
                          <option value="">Select Project</option>
                          {PROJECTS.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          Year
                        </label>
                        <select
                          value={selectedYearForParams}
                          onChange={(e) => {
                            setSelectedYearForParams(e.target.value);
                            setSelectedParametersForAssignment([]);
                            setIsConfigurationConfirmed(false);
                            setShowParameterAssignmentMatrix(false);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={isConfigurationConfirmed}
                          title="Select Year"
                        >
                          {YEARS.map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          Period
                        </label>
                        <select
                          value={selectedPeriodForParams}
                          onChange={(e) => {
                            setSelectedPeriodForParams(e.target.value);
                            setSelectedParametersForAssignment([]);
                            setIsConfigurationConfirmed(false);
                            setShowParameterAssignmentMatrix(false);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={isConfigurationConfirmed}
                          title="Select Period"
                        >
                          <option value="">Select Period</option>
                          {PERIODS.map(period => (
                            <option key={period.id} value={period.id}>{period.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Configuration Summary - Shows for ANY project/year/period combination */}
                    {selectedProjectForParams && selectedYearForParams && selectedPeriodForParams && (
                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Selected Configuration</h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <p><strong>Project:</strong> {PROJECTS.find(p => p.id === selectedProjectForParams)?.name}</p>
                          <p><strong>Year:</strong> {selectedYearForParams}</p>
                          <p><strong>Period:</strong> {PERIODS.find(p => p.id === selectedPeriodForParams)?.name}</p>
                          <p><strong>Available Parameters:</strong> {getAvailableParameters().length} parameters</p>
                        </div>
                        
                        {/* Show parameters if available */}
                        {getAvailableParameters().length > 0 ? (
                          <div className="mt-3">
                            <p className="text-sm text-blue-700 mb-2"><strong>Available Parameters:</strong></p>
                            <div className="flex flex-wrap gap-1">
                              {getAvailableParameters().map((param, index) => (
                                <span key={index} className={`inline-block text-xs px-2 py-1 rounded ${
                                  param === 'Date' || param === 'Time' 
                                    ? 'bg-green-100 text-green-800 font-bold' 
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {param}
                                </span>
                              ))}
                            </div>
                            
                            {/* Parameter Selection for Assignment */}
                            {!isConfigurationConfirmed && (
                              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="font-medium text-gray-900">Select Parameters to Assign:</h5>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={handleSelectAllParameters}
                                      className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                    >
                                      Select All
                                    </button>
                                    <button
                                      onClick={handleClearAllParameters}
                                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                    >
                                      Clear All
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                  {getAvailableParameters().map((param) => (
                                    <label key={param} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-white transition-colors">
                                      <input
                                        type="checkbox"
                                        checked={selectedParametersForAssignment.includes(param)}
                                        onChange={() => handleParameterToggle(param)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                      />
                                      <span className={`text-sm ${
                                        param === 'Date' || param === 'Time' 
                                          ? 'font-bold text-green-700' 
                                          : 'text-gray-700'
                                      }`}>
                                        {param === 'Date' || param === 'Time' ? `🕐 ${param}` : param}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                                
                                {selectedParametersForAssignment.length > 0 && (
                                  <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
                                    <p className="text-sm text-blue-700">
                                      <strong>Selected:</strong> {selectedParametersForAssignment.length} of {getAvailableParameters().length} parameters
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                            <p className="text-sm text-yellow-700">
                              ⚠️ No configuration found for this combination. Please check PROJECT_CONFIGURATIONS in constants.ts
                            </p>
                          </div>
                        )}
                        
                        {/* General Configuration Actions - Show for ALL valid configurations */}
                        {getAvailableParameters().length > 0 && !isConfigurationConfirmed && (
                          <div className="mt-4 flex flex-wrap gap-3">
                            {/* Show parameter selection for any configuration */}
                            {selectedParametersForAssignment.length > 0 ? (
                              // Show confirm button when parameters are selected
                              <button
                                onClick={handleConfirmConfigurationWithSelectedParams}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                <Check className="h-4 w-4" />
                                Confirm Selected Parameters ({selectedParametersForAssignment.length})
                              </button>
                            ) : (
                              // Special case for NWMP 2025 Pre-monsoon - show both options
                              PROJECTS.find(p => p.id === selectedProjectForParams)?.name === 'National Water Monitoring Programme' && 
                              selectedYearForParams === '2025' && 
                              PERIODS.find(p => p.id === selectedPeriodForParams)?.name === 'Pre-monsoon' ? (
                                <button
                                  onClick={handleConfirmConfiguration}
                                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                  <Check className="h-4 w-4" />
                                  Confirm All Parameters for NWMP 2025 Pre-monsoon
                                </button>
                              ) : null
                            )}
                          </div>
                        )}

                        {/* Configuration Confirmed Status */}
                        {isConfigurationConfirmed && confirmedConfiguration && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-green-600" />
                                <span className="font-medium text-green-800">Configuration Confirmed ✅</span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setIsConfigurationConfirmed(false);
                                    setShowParameterAssignmentMatrix(false);
                                    setSelectedParametersForAssignment(confirmedConfiguration.parameters);
                                  }}
                                  className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                                >
                                  Edit Parameters
                                </button>
                                <button
                                  onClick={handleResetConfiguration}
                                  className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                >
                                  Reset Configuration
                                </button>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm text-green-700">
                                ✅ {confirmedConfiguration.parameters.length} parameters confirmed for {PROJECTS.find(p => p.id === selectedProjectForParams)?.name} {confirmedConfiguration.year} {PERIODS.find(p => p.id === selectedPeriodForParams)?.name}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {confirmedConfiguration.parameters.map((param, index) => (
                                  <span key={index} className={`inline-block text-xs px-2 py-1 rounded ${
                                    param === 'Date' || param === 'Time' 
                                      ? 'bg-green-200 text-green-800 font-bold' 
                                      : 'bg-green-100 text-green-700'
                                  }`}>
                                    {param === 'Date' || param === 'Time' ? `🕐 ${param}` : param}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Parameter Assignment Matrix - Only show when configuration is confirmed */}
                {isConfigurationConfirmed && showParameterAssignmentMatrix && confirmedConfiguration && (
                  <div className="bg-white rounded-lg shadow-sm border">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">✅ Parameter Assignment Matrix - CONFIRMED</h3>
                          <p className="text-sm text-gray-600">
                            Assign parameters to analysts for {PROJECTS.find(p => p.id === selectedProjectForParams)?.name} {confirmedConfiguration.year} {PERIODS.find(p => p.id === selectedPeriodForParams)?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="text-left p-3 bg-gray-50 border border-gray-200 font-medium">Analyst</th>
                              {confirmedConfiguration.parameters.map(parameter => (
                                <th key={parameter} className={`text-center p-2 bg-gray-50 border border-gray-200 text-xs font-medium min-w-[80px] ${
                                  parameter === 'Date' || parameter === 'Time' ? 'bg-green-100 text-green-800' : ''
                                }`}>
                                  {parameter === 'Date' || parameter === 'Time' ? `🕐 ${parameter}` : parameter}
                                </th>
                              ))}
                              <th className="text-center p-3 bg-gray-50 border border-gray-200 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.filter(u => u.role === 'analyst').map(analyst => (
                              <tr key={analyst.id}>
                                <td className="p-3 border border-gray-200 font-medium">
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{analyst.name}</p>
                                    <p className="text-xs text-gray-500">{analyst.department}</p>
                                  </div>
                                </td>
                                {confirmedConfiguration.parameters.map(parameter => {
                                  const isAssigned = getUserParametersForProject(analyst.id).includes(parameter);
                                  const isAssignedToOther = isParameterAssignedToOtherUser(parameter, analyst.id);
                                  return (
                                    <td key={parameter} className={`p-2 border border-gray-200 text-center ${
                                      parameter === 'Date' || parameter === 'Time' ? 'bg-green-50' : ''
                                    }`}>
                                      <input
                                        type="checkbox"
                                        checked={isAssigned}
                                        disabled={!isAssigned && isAssignedToOther}
                                        onChange={(e) => handleProjectParameterAssignment(analyst.id, parameter, e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        title={!isAssigned && isAssignedToOther ? 'Already assigned to another analyst' : ''}
                                      />
                                    </td>
                                  );
                                })}
                                <td className="p-3 border border-gray-200">
                                  <div className="flex justify-center gap-1">
                                    <button
                                      onClick={() => handleAssignAllParametersForProject(analyst.id)}
                                      className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                                      title="Assign all parameters"
                                    >
                                      All
                                    </button>
                                    <button
                                      onClick={() => handleClearAllParametersForProject(analyst.id)}
                                      className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                      title="Clear all parameters"
                                    >
                                      Clear
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Assignment Summary */}
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">✅ Assignment Summary - {PROJECTS.find(p => p.id === selectedProjectForParams)?.name} {confirmedConfiguration.year} {PERIODS.find(p => p.id === selectedPeriodForParams)?.name}</h4>
                          {getAssignmentSummary() && getAssignmentSummary()!.analysts > 0 && (
                            <button
                              onClick={handleSubmitAssignment}
                              disabled={isSubmitting}
                              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                                isSubmitting 
                                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                                  : 'bg-green-600 text-white hover:bg-green-700'
                              }`}
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  Submitting...
                                </>
                              ) : (
                                <>
                                  <Check className="h-4 w-4" />
                                  Submit Assignment
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        
                        {getAssignmentSummary() && (
                          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                            <p className="text-sm text-blue-700">
                              <strong>Ready to Submit:</strong> {getAssignmentSummary()!.analysts} analysts assigned with {getAssignmentSummary()!.totalAssignments} total parameter assignments
                            </p>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {users.filter(u => u.role === 'analyst').map(analyst => {
                            const assignedParams = getUserParametersForProject(analyst.id);
                            const hasDatetime = assignedParams.includes('Date') || assignedParams.includes('Time');
                            return (
                              <div key={analyst.id} className="p-3 bg-white rounded border">
                                <p className="font-medium text-sm text-gray-900">{analyst.name}</p>
                                <p className="text-xs text-gray-500 mb-2">{analyst.department}</p>
                                <p className="text-sm">
                                  <span className="font-medium">{assignedParams.length}</span> / {confirmedConfiguration.parameters.length} parameters
                                  {hasDatetime && <span className="text-green-600 font-bold"> 🕐</span>}
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                  <div 
                                    className={`bg-blue-600 h-2 rounded-full transition-all duration-300`}
                                    style={{ width: `${(assignedParams.length / confirmedConfiguration.parameters.length) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Message when no parameters available */}
                {selectedProjectForParams && selectedYearForParams && selectedPeriodForParams && getAvailableParameters().length === 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 text-center">
                    <FileText className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-orange-900 mb-2">No Parameters Configured</h3>
                    <p className="text-orange-700">
                      The selected project configuration doesn't have any parameters configured. 
                      Please check the project configurations in constants.ts file.
                    </p>
                  </div>
                )}

                {/* Message when no configuration selected */}
                {(!selectedProjectForParams || !selectedYearForParams || !selectedPeriodForParams) && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
                    <Database className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-yellow-900 mb-2">Select Project Configuration</h3>
                    <p className="text-yellow-700">
                      Please select a project, year, and period to view and manage parameter assignments.
                    </p>
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-blue-700 text-sm">
                        <strong>For NWMP 2025 Pre-monsoon:</strong> Date and Time parameters are available! Select the configuration to see the confirmation workflow.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Assignment History</h2>
                  <p className="text-gray-600 mt-2">View all completed parameter assignments</p>
                </div>

                {assignmentHistory.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Assignment History</h3>
                    <p className="text-gray-600">
                      No parameter assignments have been submitted yet. Complete and submit an assignment to see it here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {assignmentHistory.map((assignment) => (
                      <div key={assignment.id} className="bg-white rounded-lg shadow-sm border">
                        <div className="px-6 py-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{assignment.projectName}</h3>
                              <p className="text-sm text-gray-600">
                                {assignment.year} • {assignment.period} • Submitted by {assignment.submittedBy}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">
                                {assignment.parameters.length} Parameters
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(assignment.submittedAt).toLocaleDateString()} at {new Date(assignment.submittedAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          {/* Parameters */}
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Parameters:</h4>
                            <div className="flex flex-wrap gap-1">
                              {assignment.parameters.map((param, index) => (
                                <span key={index} className={`inline-block text-xs px-2 py-1 rounded ${
                                  param === 'Date' || param === 'Time' 
                                    ? 'bg-green-100 text-green-800 font-bold' 
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {param === 'Date' || param === 'Time' ? `🕐 ${param}` : param}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Analyst Assignments */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Analyst Assignments:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {Object.entries(assignment.assignments).map(([userId, assignedParams]) => {
                                const analyst = users.find(u => u.id === userId);
                                const hasDatetime = assignedParams.includes('Date') || assignedParams.includes('Time');
                                return (
                                  <div key={userId} className="p-3 bg-gray-50 rounded border">
                                    <p className="font-medium text-sm text-gray-900">{analyst?.name || 'Unknown Analyst'}</p>
                                    <p className="text-xs text-gray-500 mb-2">{analyst?.department}</p>
                                    <p className="text-sm">
                                      <span className="font-medium">{assignedParams.length}</span> parameters assigned
                                      {hasDatetime && <span className="text-green-600 font-bold"> 🕐</span>}
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                      {assignedParams.map((param, index) => (
                                        <span key={index} className={`inline-block text-xs px-1 py-0.5 rounded ${
                                          param === 'Date' || param === 'Time' 
                                            ? 'bg-green-200 text-green-800' 
                                            : 'bg-blue-200 text-blue-800'
                                        }`}>
                                          {param === 'Date' || param === 'Time' ? `🕐 ${param}` : param}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
