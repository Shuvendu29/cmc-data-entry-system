'use client';

import { useState } from 'react';
import { 
  Users, Database, LogOut, BarChart3, Settings, FileText,
  Plus, Trash2, Edit, Check, X, Calendar, MapPin, Download,
  Activity, TrendingUp, PieChart, BarChart, LineChart
} from 'lucide-react';
import { User, ProjectConfiguration } from '../types';
import { PROJECTS, DEMO_USERS, DEFAULT_PARAMETER_ASSIGNMENTS, PERIODS, YEARS, PROJECT_CONFIGURATIONS, PARAMETER_CATEGORIES } from '../data/constants';
import { getTotalDistricts } from '../lib/utils';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  projectParameterAssignments: Record<string, Record<string, string[]>>;
  setProjectParameterAssignments: React.Dispatch<React.SetStateAction<Record<string, Record<string, string[]>>>>;
}

export default function AdminDashboard({ user, onLogout, projectParameterAssignments, setProjectParameterAssignments }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState(DEMO_USERS);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [projectConfigurations, setProjectConfigurations] = useState(PROJECT_CONFIGURATIONS);
  const [selectedConfigForParams, setSelectedConfigForParams] = useState('');
  const [selectedProjectForParams, setSelectedProjectForParams] = useState('');
  const [selectedYearForParams, setSelectedYearForParams] = useState(new Date().getFullYear().toString());
  const [selectedPeriodForParams, setSelectedPeriodForParams] = useState('');
  
  // New parameter management
  const [showAddParameterForm, setShowAddParameterForm] = useState(false);
  const [newParameterName, setNewParameterName] = useState('');
  const [newParameterUnit, setNewParameterUnit] = useState('');
  
  // User activity tracking
  const [userActivities, setUserActivities] = useState([
    { id: '1', userId: '2', action: 'Data Entry', project: 'ICZMP', parameters: 5, stations: 12, timestamp: '2024-07-15 09:30', status: 'completed' },
    { id: '2', userId: '3', action: 'Data Entry', project: 'NWMP', parameters: 8, stations: 20, timestamp: '2024-07-15 10:15', status: 'completed' },
    { id: '3', userId: '4', action: 'Data Entry', project: 'Outfall', parameters: 6, stations: 8, timestamp: '2024-07-15 11:00', status: 'in-progress' },
    { id: '4', userId: '5', action: 'Data Entry', project: 'ICZMP', parameters: 4, stations: 15, timestamp: '2024-07-15 08:45', status: 'completed' },
  ]);
  
  // Dashboard analytics data
  const [dashboardData, setDashboardData] = useState({
    totalDataEntries: 156,
    completedTasks: 89,
    pendingTasks: 67,
    activeUsers: 4,
    projectProgress: {
      'ICZMP': { completed: 75, total: 100, percentage: 75 },
      'NWMP': { completed: 45, total: 80, percentage: 56 },
      'Outfall': { completed: 30, total: 50, percentage: 60 }
    },
    parameterAnalysis: {
      'pH': 145, 'Temperature': 132, 'Conductivity': 128, 'Dissolved Oxygen': 120,
      'Turbidity': 98, 'BOD': 87, 'Fecal Coliform': 76, 'Heavy Metals': 65
    },
    weeklyActivity: [
      { day: 'Mon', entries: 25 }, { day: 'Tue', entries: 32 }, { day: 'Wed', entries: 28 },
      { day: 'Thu', entries: 35 }, { day: 'Fri', entries: 29 }, { day: 'Sat', entries: 15 }, { day: 'Sun', entries: 8 }
    ],
    dailyActivity: [
      { date: '2024-07-15', entries: 45 }, { date: '2024-07-14', entries: 38 }, { date: '2024-07-13', entries: 52 },
      { date: '2024-07-12', entries: 41 }, { date: '2024-07-11', entries: 33 }, { date: '2024-07-10', entries: 29 }, { date: '2024-07-09', entries: 35 }
    ],
    monthlyActivity: [
      { month: 'Jan', entries: 280 }, { month: 'Feb', entries: 320 }, { month: 'Mar', entries: 298 },
      { month: 'Apr', entries: 356 }, { month: 'May', entries: 412 }, { month: 'Jun', entries: 387 }, { month: 'Jul', entries: 445 }
    ],
    yearlyActivity: [
      { year: '2020', entries: 2850 }, { year: '2021', entries: 3240 }, { year: '2022', entries: 3680 },
      { year: '2023', entries: 4120 }, { year: '2024', entries: 4560 }
    ]
  });

  // Date range filtering state
  const [activityTimeRange, setActivityTimeRange] = useState('weekly');
  
  // Export filters state
  const [exportFilters, setExportFilters] = useState({
    project: '',
    year: new Date().getFullYear().toString(),
    period: ''
  });

  // Sample stations data for export
  const [stationsData, setStationsData] = useState([
    {
      id: 'ST001', name: 'Chilika Lake Point 1', iczmrRef: 'CL-01', cpcbRef: 'OD/CL/001', cpcbCode: 'CL001',
      period: 'Pre-monsoon', year: '2024', temperature: 28.5, do: 6.8, ph: 7.2, bod: 2.1,
      fecalColiform: 45, turbidity: 12.3, suspendedSolids: 18.5, oilGrease: 'ND', cd: 0.002,
      pb: 0.015, hg: 'ND', fe: 0.24, mn: 0.08
    },
    {
      id: 'ST002', name: 'Mahanadi Estuary Point 2', iczmrRef: 'ME-02', cpcbRef: 'OD/ME/002', cpcbCode: 'ME002',
      period: 'Pre-monsoon', year: '2024', temperature: 29.2, do: 'ND', ph: 7.8, bod: 3.2,
      fecalColiform: 120, turbidity: 'ND', suspendedSolids: 22.1, oilGrease: 1.2, cd: 'ND',
      pb: 0.025, hg: 0.001, fe: 'ND', mn: 0.12
    },
    {
      id: 'ST003', name: 'Paradip Port Outfall', iczmrRef: 'PP-03', cpcbRef: 'OD/PP/003', cpcbCode: 'PP003',
      period: 'Monsoon', year: '2024', temperature: 'ND', do: 5.2, ph: 6.9, bod: 'ND',
      fecalColiform: 'ND', turbidity: 25.8, suspendedSolids: 'ND', oilGrease: 2.8, cd: 0.005,
      pb: 'ND', hg: 'ND', fe: 0.18, mn: 'ND'
    }
  ]);
  
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    name: '',
    department: '',
    role: 'analyst' as 'admin' | 'analyst'
  });

  // All available parameters for assignment (can be extended dynamically)
  const [allParameters, setAllParameters] = useState([
    'pH', 'Temperature', 'Conductivity', 'Dissolved Oxygen', 'Turbidity', 
    'Suspended Solids', 'BOD', 'Boron', 'Oil & Grease', 'Fecal Coliform', 
    'Arsenic', 'Cadmium', 'Copper', 'Lead', 'Chromium', 'Nickel', 
    'Zinc', 'Mercury', 'Iron', 'Manganese'
  ]);

  // Get current project configuration
  const getCurrentProjectConfig = () => {
    return projectConfigurations.find(config => 
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
    const availableParams = getAvailableParameters();
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

  // Handle adding new parameter to system
  const handleAddParameter = () => {
    if (!newParameterName.trim()) {
      alert('Please enter a parameter name');
      return;
    }

    const parameterName = newParameterName.trim();
    if (allParameters.includes(parameterName)) {
      alert('Parameter already exists');
      return;
    }

    setAllParameters(prev => [...prev, parameterName]);
    setNewParameterName('');
    setNewParameterUnit('');
    setShowAddParameterForm(false);
    alert(`Parameter "${parameterName}" added successfully!`);
  };

  // Handle select all parameters in current session
  const handleSelectAllInSession = () => {
    if (!selectedProjectForParams || !selectedYearForParams || !selectedPeriodForParams) {
      alert('Please select project, year, and period first');
      return;
    }

    const availableParams = getAvailableParameters();
    const projectKey = getProjectKey(selectedProjectForParams, selectedYearForParams, selectedPeriodForParams);
    
    // Get all analyst users
    const analysts = users.filter(u => u.role === 'analyst');
    
    // Check if all parameters are already assigned
    const currentAssignments = projectParameterAssignments[projectKey] || {};
    const allAssignedParams = new Set();
    Object.values(currentAssignments).forEach(params => {
      params.forEach(param => allAssignedParams.add(param));
    });

    if (allAssignedParams.size === availableParams.length) {
      alert('All parameters are already assigned in this session');
      return;
    }

    // Find unassigned parameters
    const unassignedParams = availableParams.filter(param => !allAssignedParams.has(param));
    
    if (unassignedParams.length === 0) {
      alert('No unassigned parameters found');
      return;
    }

    // Assign unassigned parameters to users in round-robin fashion
    const updatedAssignments = { ...projectParameterAssignments };
    if (!updatedAssignments[projectKey]) {
      updatedAssignments[projectKey] = {};
    }

    let userIndex = 0;
    unassignedParams.forEach(param => {
      const userId = analysts[userIndex % analysts.length].id;
      if (!updatedAssignments[projectKey][userId]) {
        updatedAssignments[projectKey][userId] = [];
      }
      updatedAssignments[projectKey][userId].push(param);
      userIndex++;
    });

    setProjectParameterAssignments(updatedAssignments);
    alert(`${unassignedParams.length} unassigned parameters distributed among ${analysts.length} analysts`);
  };

  // Handle assign all available parameters to specific user (only unassigned ones)
  const handleAssignAllAvailableToUser = (userId: string) => {
    const availableParams = getAvailableParameters();
    const projectKey = getProjectKey(selectedProjectForParams, selectedYearForParams, selectedPeriodForParams);
    
    // Get all currently assigned parameters across all users
    const currentAssignments = projectParameterAssignments[projectKey] || {};
    const alreadyAssigned = new Set();
    Object.entries(currentAssignments).forEach(([id, params]) => {
      if (id !== userId) { // Exclude current user's assignments
        params.forEach(param => alreadyAssigned.add(param));
      }
    });

    // Find unassigned parameters
    const unassignedParams = availableParams.filter(param => !alreadyAssigned.has(param));
    
    if (unassignedParams.length === 0) {
      alert('No unassigned parameters available for this user');
      return;
    }

    setProjectParameterAssignments(prev => ({
      ...prev,
      [projectKey]: {
        ...prev[projectKey],
        [userId]: unassignedParams
      }
    }));

    alert(`Assigned ${unassignedParams.length} available parameters to ${users.find(u => u.id === userId)?.name}`);
  };

  // Handle clear all assignments in current session
  const handleClearAllInSession = () => {
    if (!selectedProjectForParams || !selectedYearForParams || !selectedPeriodForParams) {
      alert('Please select project, year, and period first');
      return;
    }

    if (confirm('Clear all parameter assignments for this session?')) {
      const projectKey = getProjectKey(selectedProjectForParams, selectedYearForParams, selectedPeriodForParams);
      
      setProjectParameterAssignments(prev => {
        const updated = { ...prev };
        delete updated[projectKey];
        return updated;
      });
      
      alert('All assignments cleared for this session');
    }
  };

  // Add parameter to project configuration
  const handleAddParameterToProject = (parameterName: string) => {
    const configIndex = projectConfigurations.findIndex(config => 
      config.projectId === selectedProject && 
      config.year === selectedYear && 
      config.period === selectedPeriod
    );

    if (configIndex !== -1) {
      const updatedConfigs = [...projectConfigurations];
      if (!updatedConfigs[configIndex].parameters.includes(parameterName)) {
        updatedConfigs[configIndex].parameters.push(parameterName);
        updatedConfigs[configIndex].updatedDate = new Date().toISOString().split('T')[0];
        setProjectConfigurations(updatedConfigs);
      }
    } else {
      // Create new configuration
      const newConfig = {
        id: (projectConfigurations.length + 1).toString(),
        projectId: selectedProject,
        year: selectedYear,
        period: selectedPeriod,
        parameters: [parameterName],
        createdDate: new Date().toISOString().split('T')[0],
        updatedDate: new Date().toISOString().split('T')[0]
      };
      setProjectConfigurations([...projectConfigurations, newConfig]);
    }
  };

  // Remove parameter from project configuration  
  const handleRemoveParameterFromProject = (parameterName: string) => {
    const configIndex = projectConfigurations.findIndex(config => 
      config.projectId === selectedProject && 
      config.year === selectedYear && 
      config.period === selectedPeriod
    );

    if (configIndex !== -1) {
      const updatedConfigs = [...projectConfigurations];
      updatedConfigs[configIndex].parameters = updatedConfigs[configIndex].parameters.filter(p => p !== parameterName);
      updatedConfigs[configIndex].updatedDate = new Date().toISOString().split('T')[0];
      setProjectConfigurations(updatedConfigs);
    }
  };

  // Add all parameters to current project configuration
  const handleAddAllParametersToProject = () => {
    if (!selectedProject || !selectedYear || !selectedPeriod) {
      alert('Please select project, year, and period first');
      return;
    }

    const configIndex = projectConfigurations.findIndex(config => 
      config.projectId === selectedProject && 
      config.year === selectedYear && 
      config.period === selectedPeriod
    );

    // Get all available parameters from all categories
    const allAvailableParams = Object.values(PARAMETER_CATEGORIES).flat();
    // Add any custom parameters that were added
    const customParams = allParameters.filter(param => !allAvailableParams.includes(param));
    const allParams = [...allAvailableParams, ...customParams];

    if (configIndex !== -1) {
      const updatedConfigs = [...projectConfigurations];
      updatedConfigs[configIndex].parameters = Array.from(new Set([...updatedConfigs[configIndex].parameters, ...allParams]));
      updatedConfigs[configIndex].updatedDate = new Date().toISOString().split('T')[0];
      setProjectConfigurations(updatedConfigs);
    } else {
      // Create new configuration with all parameters
      const newConfig = {
        id: (projectConfigurations.length + 1).toString(),
        projectId: selectedProject,
        year: selectedYear,
        period: selectedPeriod,
        parameters: allParams,
        createdDate: new Date().toISOString().split('T')[0],
        updatedDate: new Date().toISOString().split('T')[0]
      };
      setProjectConfigurations([...projectConfigurations, newConfig]);
    }

    alert(`Added ${allParams.length} parameters to the project configuration`);
  };

  // Clear all parameters from current project configuration
  const handleClearAllProjectParameters = () => {
    if (!selectedProject || !selectedYear || !selectedPeriod) {
      alert('Please select project, year, and period first');
      return;
    }

    if (confirm('Remove all parameters from this project configuration?')) {
      const configIndex = projectConfigurations.findIndex(config => 
        config.projectId === selectedProject && 
        config.year === selectedYear && 
        config.period === selectedPeriod
      );

      if (configIndex !== -1) {
        const updatedConfigs = [...projectConfigurations];
        updatedConfigs[configIndex].parameters = [];
        updatedConfigs[configIndex].updatedDate = new Date().toISOString().split('T')[0];
        setProjectConfigurations(updatedConfigs);
        alert('All parameters removed from project configuration');
      }
    }
  };

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

  // Data export functions
  const exportUserActivities = (format: 'excel' | 'csv') => {
    const headers = ['User Name', 'Department', 'Action', 'Project', 'Parameters Count', 'Stations Count', 'Timestamp', 'Status'];
    const data = userActivities.map(activity => {
      const user = users.find(u => u.id === activity.userId);
      return [
        user?.name || 'Unknown',
        user?.department || 'N/A',
        activity.action,
        activity.project,
        activity.parameters,
        activity.stations,
        activity.timestamp,
        activity.status
      ];
    });
    
    downloadData(headers, data, `user_activities_${new Date().toISOString().split('T')[0]}`, format);
  };

  const exportParameterData = (format: 'excel' | 'csv') => {
    // Filter stations data based on export filters
    const filteredStations = stationsData.filter(station => {
      const projectMatch = !exportFilters.project || 
        (exportFilters.project === 'iczmp' && station.iczmrRef.includes('CL')) ||
        (exportFilters.project === 'nwmp' && station.iczmrRef.includes('ME')) ||
        (exportFilters.project === 'outfall' && station.iczmrRef.includes('PP'));
      const yearMatch = !exportFilters.year || station.year === exportFilters.year;
      const periodMatch = !exportFilters.period || station.period === exportFilters.period;
      
      return projectMatch && yearMatch && periodMatch;
    });

    const headers = [
      'Period', 'Year', 'Sampling Stations', 'ICZMP Ref Point', 'CPCB Ref Point on Map', 'CPCB Station Code',
      'Temperature (°C)', 'DO (mg/L) or % Saturation (%S)', 'pH', 'BOD (mg/L)', 'Fecal Coliform (MPN)',
      'Turbidity (NTU)', 'Suspended Solids (mg/L)', 'O & G (mg/L)', 'Cd (mg/L)', 'Pb (mg/L)',
      'Hg (mg/L)', 'Fe (mg/L)', 'Mn (mg/L)'
    ];
    
    const data = filteredStations.map(station => [
      station.period,
      station.year,
      station.name,
      station.iczmrRef,
      station.cpcbRef,
      station.cpcbCode,
      station.temperature || 'ND',
      station.do || 'ND',
      station.ph || 'ND',
      station.bod || 'ND',
      station.fecalColiform || 'ND',
      station.turbidity || 'ND',
      station.suspendedSolids || 'ND',
      station.oilGrease || 'ND',
      station.cd || 'ND',
      station.pb || 'ND',
      station.hg || 'ND',
      station.fe || 'ND',
      station.mn || 'ND'
    ]);
    
    const filterSuffix = `${exportFilters.project}_${exportFilters.year}_${exportFilters.period}`.replace(/^_+|_+$/g, '').replace(/_+/g, '_');
    downloadData(headers, data, `parameter_analysis_${filterSuffix}_${new Date().toISOString().split('T')[0]}`, format);
  };

  const exportProjectSummary = (format: 'excel' | 'csv') => {
    const headers = ['Project Name', 'Total Stations', 'Completed Entries', 'Total Entries', 'Progress %', 'Active Users', 'Parameters Count'];
    const data = Object.entries(dashboardData.projectProgress).map(([projectId, progress]) => {
      const project = PROJECTS.find(p => p.id === projectId);
      const projectConfig = projectConfigurations.find(c => c.projectId === projectId);
      const activeUsers = userActivities.filter(a => a.project === project?.name).length;
      return [
        project?.name || projectId,
        progress.total,
        progress.completed,
        progress.total,
        progress.percentage,
        activeUsers,
        projectConfig?.parameters.length || 0
      ];
    });
    
    downloadData(headers, data, `project_summary_${new Date().toISOString().split('T')[0]}`, format);
  };

  // Helper function to get activity data based on time range
  const getActivityData = () => {
    switch (activityTimeRange) {
      case 'daily':
        return {
          data: dashboardData.dailyActivity,
          labelKey: 'date',
          maxValue: Math.max(...dashboardData.dailyActivity.map(d => d.entries))
        };
      case 'monthly':
        return {
          data: dashboardData.monthlyActivity,
          labelKey: 'month',
          maxValue: Math.max(...dashboardData.monthlyActivity.map(d => d.entries))
        };
      case 'yearly':
        return {
          data: dashboardData.yearlyActivity,
          labelKey: 'year',
          maxValue: Math.max(...dashboardData.yearlyActivity.map(d => d.entries))
        };
      default: // weekly
        return {
          data: dashboardData.weeklyActivity,
          labelKey: 'day',
          maxValue: Math.max(...dashboardData.weeklyActivity.map(d => d.entries))
        };
    }
  };

  const downloadData = (headers: string[], data: any[][], filename: string, format: 'excel' | 'csv') => {
    if (format === 'csv') {
      const csvContent = [headers, ...data].map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `${filename}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // For Excel format, we'll create a simple HTML table that Excel can import
      const tableHTML = `
        <table>
          <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${data.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      `;
      const blob = new Blob([tableHTML], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `${filename}.xls`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
              {[
                { id: 'overview', label: 'System Overview', icon: BarChart3 },
                { id: 'dashboard', label: 'Analytics Dashboard', icon: BarChart3 },
                { id: 'users', label: 'User Management', icon: Users },
                { id: 'projects', label: 'Project Management', icon: Database },
                { id: 'parameters', label: 'Parameter Assignment', icon: FileText },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );

  function renderTabContent() {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'dashboard':
        return renderAnalyticsDashboard();
      case 'users':
        return renderUsersTab();
      case 'projects':
        return renderProjectsTab();
      case 'parameters':
        return renderParametersTab();
      default:
        return renderOverviewTab();
    }
  }

  function renderOverviewTab() {
    return (
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
                <p className="text-sm font-medium text-orange-700">Parameters</p>
                <p className="text-2xl font-bold text-orange-900">{allParameters.length}</p>
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
                onClick={() => setActiveTab('projects')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left group"
              >
                <Database className="h-6 w-6 text-purple-600 mb-2 group-hover:text-purple-700" />
                <h4 className="font-medium text-gray-900 group-hover:text-purple-900">Manage Projects</h4>
                <p className="text-sm text-gray-500">Configure projects and monitoring periods</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderAnalyticsDashboard() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600 mt-2">Monitor user activities, project progress, and data analysis</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-700">Total Data Entries</p>
                <p className="text-2xl font-bold text-blue-900">{dashboardData.totalDataEntries}</p>
                <p className="text-xs text-blue-600">+12% from last week</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-500 rounded-lg">
                <Check className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-700">Completed Tasks</p>
                <p className="text-2xl font-bold text-green-900">{dashboardData.completedTasks}</p>
                <p className="text-xs text-green-600">+8% completion rate</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-500 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-700">Pending Tasks</p>
                <p className="text-2xl font-bold text-orange-900">{dashboardData.pendingTasks}</p>
                <p className="text-xs text-orange-600">-5% from yesterday</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-700">Active Users</p>
                <p className="text-2xl font-bold text-purple-900">{dashboardData.activeUsers}</p>
                <p className="text-xs text-purple-600">Currently online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Progress Chart */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Project Progress
              </h3>
              <p className="text-sm text-gray-600">Completion status by project</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(dashboardData.projectProgress).map(([projectId, progress]) => {
                  const project = PROJECTS.find(p => p.id === projectId);
                  return (
                    <div key={projectId}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">{project?.name || projectId}</span>
                        <span className="text-sm text-gray-500">{progress.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress.percentage}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {progress.completed} of {progress.total} entries completed
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Parameter Analysis Chart */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Parameter Analysis
              </h3>
              <p className="text-sm text-gray-600">Data entries by parameter type</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(dashboardData.parameterAnalysis).slice(0, 8).map(([param, count]) => (
                  <div key={param} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{param}</span>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Trend Chart with Date Range Filter */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Activity Trend
                </h3>
                <p className="text-sm text-gray-600">Data entry activities over selected time range</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
                <select
                  value={activityTimeRange}
                  onChange={(e) => setActivityTimeRange(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-end justify-between h-40 gap-4">
              {(() => {
                const { data, labelKey, maxValue } = getActivityData();
                return data.map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-blue-500 w-full rounded-t transition-all duration-300 hover:bg-blue-600"
                      style={{ height: `${(item.entries / (maxValue * 1.2)) * 100}%`, minHeight: '4px' }}
                      title={`${item.entries} entries`}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">
                      {labelKey === 'date' ? (item as any)[labelKey].split('-').slice(1).join('/') : (item as any)[labelKey]}
                    </span>
                    <span className="text-xs font-medium text-gray-900">{item.entries}</span>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>

        {/* User Activities & Data Export */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent User Activities */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent User Activities</h3>
              <p className="text-sm text-gray-600">Latest data entry activities</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {userActivities.slice(0, 5).map((activity) => {
                  const user = users.find(u => u.id === activity.userId);
                  return (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{activity.project} • {activity.parameters} parameters • {activity.stations} stations</p>
                        <p className="text-xs text-gray-400">{activity.timestamp}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Data Export Options */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Download className="h-5 w-5" />
                Data Export
              </h3>
              <p className="text-sm text-gray-600">Download reports and analytics data</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* User Activities Export */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">User Activities Report</h4>
                  <p className="text-sm text-gray-600 mb-3">Export user activity logs with detailed information</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => exportUserActivities('excel')}
                      className="px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Export Excel
                    </button>
                    <button
                      onClick={() => exportUserActivities('csv')}
                      className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Export CSV
                    </button>
                  </div>
                </div>

                {/* Parameter Analysis Export */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Parameter Analysis Report</h4>
                  <p className="text-sm text-gray-600 mb-3">Export station data with all parameters and measurements</p>
                  
                  {/* Export Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Project</label>
                      <select
                        value={exportFilters.project}
                        onChange={(e) => setExportFilters(prev => ({ ...prev, project: e.target.value }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Projects</option>
                        {PROJECTS.map(project => (
                          <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
                      <select
                        value={exportFilters.year}
                        onChange={(e) => setExportFilters(prev => ({ ...prev, year: e.target.value }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      >
                        {YEARS.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Period</label>
                      <select
                        value={exportFilters.period}
                        onChange={(e) => setExportFilters(prev => ({ ...prev, period: e.target.value }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Periods</option>
                        {PERIODS.map(period => (
                          <option key={period.id} value={period.name}>{period.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => exportParameterData('excel')}
                      className="px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Export Excel
                    </button>
                    <button
                      onClick={() => exportParameterData('csv')}
                      className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Export CSV
                    </button>
                  </div>
                </div>

                {/* Project Summary Export */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Project Summary Report</h4>
                  <p className="text-sm text-gray-600 mb-3">Export project progress and station details</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => exportProjectSummary('excel')}
                      className="px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Export Excel
                    </button>
                    <button
                      onClick={() => exportProjectSummary('csv')}
                      className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Export CSV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderUsersTab() {
    return (
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
    );
  }

  function renderParametersTab() {
    const availableParameters = getAvailableParameters();
    const showAssignments = selectedProjectForParams && selectedYearForParams && selectedPeriodForParams;

    return (
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
                  onChange={(e) => setSelectedProjectForParams(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  onChange={(e) => setSelectedYearForParams(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  onChange={(e) => setSelectedPeriodForParams(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Period</option>
                  {PERIODS.map(period => (
                    <option key={period.id} value={period.id}>{period.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {showAssignments && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Selected Configuration</h4>
                <div className="text-sm text-blue-800">
                  <p><strong>Project:</strong> {PROJECTS.find(p => p.id === selectedProjectForParams)?.name}</p>
                  <p><strong>Year:</strong> {selectedYearForParams}</p>
                  <p><strong>Period:</strong> {selectedPeriodForParams}</p>
                  <p><strong>Available Parameters:</strong> {availableParameters.length} parameters</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Parameter Assignment Matrix */}
        {showAssignments && availableParameters.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">User Parameter Assignments</h3>
              <p className="text-sm text-gray-600">Assign parameters to users for the selected project configuration</p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {users.filter(u => u.role === 'analyst').map((u) => {
                  const userParameters = getUserParametersForProject(u.id);
                  return (
                    <div key={u.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{u.name}</h4>
                          <p className="text-sm text-gray-500">{u.username} • {u.department}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleAssignAllParametersForProject(u.id)}
                            className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                          >
                            Assign All
                          </button>
                          <button
                            onClick={() => handleAssignAllAvailableToUser(u.id)}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Select All Available
                          </button>
                          <button
                            onClick={() => handleClearAllParametersForProject(u.id)}
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          >
                            Clear All
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {availableParameters.map((parameter) => {
                          const isAssigned = userParameters.includes(parameter);
                          const isAssignedToOther = isParameterAssignedToOtherUser(parameter, u.id);
                          return (
                            <label key={parameter} className={`flex items-center space-x-2 cursor-pointer ${isAssignedToOther ? 'opacity-50' : ''}`}>
                              <input
                                type="checkbox"
                                checked={isAssigned}
                                disabled={isAssignedToOther && !isAssigned}
                                onChange={(e) => handleProjectParameterAssignment(u.id, parameter, e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
                              />
                              <span className={`text-sm ${isAssignedToOther && !isAssigned ? 'text-gray-400' : 'text-gray-700'}`}>
                                {parameter}
                                {isAssignedToOther && !isAssigned && <span className="text-xs text-red-500 ml-1">(Assigned)</span>}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      
                      <div className="mt-3 text-sm text-gray-500">
                        {userParameters.length} of {availableParameters.length} parameters assigned for this project
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* No Configuration Selected */}
        {!showAssignments && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <div className="text-yellow-600 mb-2">
              <Database className="h-12 w-12 mx-auto mb-3" />
            </div>
            <h3 className="text-lg font-medium text-yellow-800 mb-2">Select Project Configuration</h3>
            <p className="text-yellow-700">Please select a project, year, and period to view and manage parameter assignments.</p>
          </div>
        )}
      </div>
    );
  }

  function renderProjectsTab() {
    const currentConfig = projectConfigurations.find(config => 
      config.projectId === selectedProject && 
      config.year === selectedYear && 
      config.period === selectedPeriod
    );
    const configuredParameters = currentConfig ? currentConfig.parameters : [];
    const showParameterManagement = selectedProject && selectedYear && selectedPeriod;

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
          <p className="text-gray-600 mt-2">Configure monitoring projects and data collection parameters</p>
        </div>

        {/* Project Configuration */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Project Configuration</h3>
            <p className="text-sm text-gray-600">Set up data collection parameters for monitoring projects</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Database className="h-4 w-4 inline mr-1" />
                  Project
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Period</option>
                  {PERIODS.map(period => (
                    <option key={period.id} value={period.name}>{period.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedProject && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Project Details</h4>
                <div className="text-sm text-blue-800">
                  <p><strong>Project:</strong> {PROJECTS.find(p => p.id === selectedProject)?.name}</p>
                  <p><strong>Year:</strong> {selectedYear}</p>
                  {selectedPeriod && <p><strong>Period:</strong> {selectedPeriod}</p>}
                  {showParameterManagement && <p><strong>Configured Parameters:</strong> {configuredParameters.length}</p>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Parameter Management */}
        {showParameterManagement && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Parameter Management</h3>
              <p className="text-sm text-gray-600">Add or remove parameters for the selected project configuration</p>
              
              {/* Parameter Management Controls */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleAddAllParametersToProject()}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Select All Parameters
                </button>
                <button
                  onClick={() => handleClearAllProjectParameters()}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Clear All Parameters
                </button>
                <button
                  onClick={() => setShowAddParameterForm(true)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-3 w-3 inline mr-1" />
                  Add New Parameter
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Parameter Categories */}
              <div className="space-y-6">
                {Object.entries(PARAMETER_CATEGORIES).map(([category, parameters]) => (
                  <div key={category} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-4 capitalize">{category} Parameters</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {parameters.map((parameter) => {
                        const isConfigured = configuredParameters.includes(parameter);
                        return (
                          <div key={parameter} className="flex items-center justify-between p-2 border border-gray-100 rounded">
                            <span className="text-sm text-gray-700">{parameter}</span>
                            <div className="flex gap-1">
                              {!isConfigured ? (
                                <button
                                  onClick={() => handleAddParameterToProject(parameter)}
                                  className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                  title="Add parameter"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleRemoveParameterFromProject(parameter)}
                                  className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                  title="Remove parameter"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Custom Parameters Section */}
                {(() => {
                  const standardParams = Object.values(PARAMETER_CATEGORIES).flat();
                  const customParams = allParameters.filter(param => !standardParams.includes(param));
                  
                  if (customParams.length > 0) {
                    return (
                      <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                        <h4 className="text-lg font-medium text-blue-900 mb-4">Custom Parameters</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {customParams.map((parameter) => {
                            const isConfigured = configuredParameters.includes(parameter);
                            return (
                              <div key={parameter} className="flex items-center justify-between p-2 border border-blue-100 rounded bg-white">
                                <span className="text-sm text-gray-700">{parameter}</span>
                                <div className="flex gap-1">
                                  {!isConfigured ? (
                                    <button
                                      onClick={() => handleAddParameterToProject(parameter)}
                                      className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                      title="Add parameter"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleRemoveParameterFromProject(parameter)}
                                      className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                      title="Remove parameter"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>

              {/* Configured Parameters Summary */}
              {configuredParameters.length > 0 && (
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Configured Parameters ({configuredParameters.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {configuredParameters.map((parameter) => (
                      <span key={parameter} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                        {parameter}
                        <button
                          onClick={() => handleRemoveParameterFromProject(parameter)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add New Parameter Form */}
        {showAddParameterForm && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Add New Parameter</h3>
              <p className="text-sm text-gray-600">Add a new water quality parameter to the system</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parameter Name *
                  </label>
                  <input
                    type="text"
                    value={newParameterName}
                    onChange={(e) => setNewParameterName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Total Nitrogen, Phosphorus, Chloride"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit (Optional)
                  </label>
                  <input
                    type="text"
                    value={newParameterUnit}
                    onChange={(e) => setNewParameterUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., mg/L, ppm, μg/L"
                  />
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">Existing Parameters:</h4>
                <div className="text-xs text-yellow-700 flex flex-wrap gap-2">
                  {allParameters.map((param, index) => (
                    <span key={param} className="bg-yellow-100 px-2 py-1 rounded">
                      {param}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleAddParameter}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Parameter
                </button>
                <button
                  onClick={() => {
                    setShowAddParameterForm(false);
                    setNewParameterName('');
                    setNewParameterUnit('');
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Available Projects */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Available Projects</h3>
            <p className="text-sm text-gray-600">Currently configured monitoring projects</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project) => {
                const projectConfigs = projectConfigurations.filter(config => config.projectId === project.id);
                return (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <p><strong>Configurations:</strong> {projectConfigs.length}</p>
                      <p><strong>Status:</strong> Ready for data collection</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
