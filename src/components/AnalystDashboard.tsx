'use client';

import React, { useState } from 'react';
import { 
  FileText, LogOut, Home, Database, Download, Save, Plus,
  Calendar, MapPin, BarChart3, User
} from 'lucide-react';
import { User as UserType } from '../types';
import { PROJECTS, PERIODS, YEARS, DEFAULT_PARAMETER_ASSIGNMENTS } from '../data/constants';
import { getDistrictsByProject } from '../lib/utils';

interface AnalystDashboardProps {
  user: UserType;
  onLogout: () => void;
  getUserParametersForProject: (userId: string, projectId: string, year: string, period: string) => string[];
}

export default function AnalystDashboard({ user, onLogout, getUserParametersForProject }: AnalystDashboardProps) {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [dataEntries, setDataEntries] = useState<Record<string, Record<string, string>>>({});
  
  // Function to handle data entry changes
  const handleDataChange = (stationId: string, parameter: string, value: string) => {
    setDataEntries(prev => ({
      ...prev,
      [stationId]: {
        ...prev[stationId],
        [parameter]: value
      }
    }));
  };

  // Function to save data for a specific station
  const saveStationData = (stationId: string) => {
    const stationData = dataEntries[stationId];
    if (stationData) {
      console.log('Saving data for station:', stationId, stationData);
      alert(`Data saved for station ${stationId}!`);
    }
  };

  // Function to save all data
  const saveAllData = () => {
    console.log('Saving all data:', dataEntries);
    alert('All data saved successfully!');
  };

  // Function to clear form
  const clearForm = () => {
    setDataEntries({});
    // Also clear the date/time inputs
    const inputs = document.querySelectorAll('input[type="date"], input[type="time"], input[type="number"]');
    inputs.forEach(input => {
      if (input instanceof HTMLInputElement) {
        if (input.type === 'date') {
          input.value = new Date().toISOString().split('T')[0];
        } else if (input.type === 'time') {
          input.value = new Date().toTimeString().slice(0, 5);
        } else {
          input.value = '';
        }
      }
    });
  };

  const districts = selectedProject ? getDistrictsByProject(selectedProject) : [];
  const stations = selectedDistrict 
    ? districts.find(d => d.id === selectedDistrict)?.stations || []
    : [];
  
  // Get assigned parameters for current user and selected project/year/period
  const userAssignedParameters = selectedProject && selectedYear && selectedPeriod 
    ? getUserParametersForProject(user.id, selectedProject, selectedYear, selectedPeriod)
    : [];
  
  // All available parameters from the constants (Date and Time are handled by admin separately)
  const allParameters = [
    'Temperature', 'Dissolved Oxygen', 'pH', 'Conductivity', 
    'Turbidity', 'Suspended Solids', 'BOD', 'Boron', 'Oil & Grease', 
    'Fecal Coliform', 'Arsenic', 'Cadmium', 'Copper', 'Lead', 'Chromium', 
    'Nickel', 'Zinc', 'Mercury', 'Iron', 'Manganese'
  ];

  const handleNewAnalysis = () => {
    if (!selectedProject || !selectedYear || !selectedPeriod || !selectedDistrict) {
      alert('Please select Project, Year, Period, and District to start a new analysis.');
      return;
    }
    
    // Analysis setup complete - data entry will be handled through separate interface
    alert(`Analysis setup complete for ${districts.find(d => d.id === selectedDistrict)?.name} district with ${stations.length} stations. Data entry will be handled through the designated interface.`);
  };

  // Parameter editability function removed - Excel data entry form has been removed

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">CMC Analyst Dashboard</h1>
                <p className="text-sm text-gray-500">Water Quality Data Entry System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.department}</p>
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
        {/* Quick Start Card */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">New Water Quality Analysis</h2>
            <p className="text-sm text-gray-600">Select parameters to start a new data entry session</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Project Selection */}
              <div>
                <label htmlFor="project-select" className="block text-sm font-medium text-gray-700 mb-2">
                  <Database className="h-4 w-4 inline mr-1" />
                  Project
                </label>
                <select
                  id="project-select"
                  value={selectedProject}
                  onChange={(e) => {
                    setSelectedProject(e.target.value);
                    setSelectedDistrict('');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Project</option>
                  {PROJECTS.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.code} - {project.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Selection */}
              <div>
                <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Year
                </label>
                <select
                  id="year-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {YEARS.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Period Selection */}
              <div>
                <label htmlFor="period-select" className="block text-sm font-medium text-gray-700 mb-2">
                  <BarChart3 className="h-4 w-4 inline mr-1" />
                  Period
                </label>
                <select
                  id="period-select"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Period</option>
                  {PERIODS.map((period) => (
                    <option key={period.id} value={period.id}>
                      {period.name} ({period.months})
                    </option>
                  ))}
                </select>
              </div>

              {/* District Selection */}
              <div>
                <label htmlFor="district-select" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  District
                </label>
                <select
                  id="district-select"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!selectedProject}
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name} ({district.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {selectedProject && (
                  <span className="mr-4 text-blue-600 font-medium">
                    {districts.length} districts available in {PROJECTS.find(p => p.id === selectedProject)?.name}
                  </span>
                )}
                {selectedDistrict && (
                  <span>
                    {stations.length} stations available in selected district
                  </span>
                )}
              </div>
              <button
                onClick={handleNewAnalysis}
                disabled={!selectedProject || !selectedYear || !selectedPeriod || !selectedDistrict}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="h-4 w-4" />
                Start New Analysis
              </button>
            </div>
          </div>
        </div>

        {/* Excel-type Data Entry Form */}
        {selectedDistrict && (
          <div className="bg-white rounded-lg shadow-sm border mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Data Entry Form - {districts.find(d => d.id === selectedDistrict)?.name} District
              </h3>
              <p className="text-sm text-gray-600">
                Enter water quality parameters for monitoring stations
              </p>
              {userAssignedParameters.length > 0 ? (
                <div className="mt-2 p-2 bg-blue-50 rounded">
                  <p className="text-sm text-blue-700">
                    <strong>Your assigned parameters:</strong> {userAssignedParameters.join(', ')}
                  </p>
                </div>
              ) : (
                <div className="mt-2 p-2 bg-yellow-50 rounded">
                  <p className="text-sm text-yellow-700">
                    <strong>Notice:</strong> {selectedProject && selectedYear && selectedPeriod 
                      ? `No parameters assigned for ${PROJECTS.find(p => p.id === selectedProject)?.name} (${selectedYear}, ${PERIODS.find(p => p.id === selectedPeriod)?.name}). Contact admin to assign parameters for this project configuration.`
                      : 'Select project, year, and period to view assigned parameters.'
                    }
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-700 w-32">
                        Station Code
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-700 w-24">
                        Date
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-700 w-20">
                        Time
                      </th>
                      {userAssignedParameters.length > 0 ? (
                        userAssignedParameters.map((param) => (
                          <th key={param} className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-700 min-w-24">
                            {param}
                          </th>
                        ))
                      ) : (
                        <th className="border border-gray-300 px-3 py-2 text-center text-xs font-medium text-gray-500 min-w-48">
                          No Parameters Assigned
                        </th>
                      )}
                      <th className="border border-gray-300 px-3 py-2 text-center text-xs font-medium text-gray-700 w-20">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stations.map((station, stationIndex) => (
                      <tr key={station.id} className={stationIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-3 py-2">
                          <div className="text-sm font-medium text-blue-600">
                            {station.cpcbCode || station.code}
                          </div>
                          <div className="text-xs text-gray-500 truncate max-w-24">
                            {station.name}
                          </div>
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          <input
                            type="date"
                            className="w-full text-xs border-0 focus:ring-1 focus:ring-blue-500 rounded px-1 py-1"
                            defaultValue={new Date().toISOString().split('T')[0]}
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          <input
                            type="time"
                            className="w-full text-xs border-0 focus:ring-1 focus:ring-blue-500 rounded px-1 py-1"
                            defaultValue={new Date().toTimeString().slice(0, 5)}
                          />
                        </td>
                        {userAssignedParameters.length > 0 ? (
                          userAssignedParameters.map((param) => (
                            <td key={`${station.id}-${param}`} className="border border-gray-300 px-2 py-1">
                              <input
                                type="number"
                                step="0.01"
                                placeholder="--"
                                value={dataEntries[station.id]?.[param] || ''}
                                onChange={(e) => handleDataChange(station.id, param, e.target.value)}
                                className="w-full text-xs border-0 focus:ring-1 focus:ring-blue-500 rounded px-1 py-1 text-center"
                              />
                            </td>
                          ))
                        ) : (
                          <td className="border border-gray-300 px-3 py-4 text-center text-gray-500 text-sm">
                            {selectedProject && selectedYear && selectedPeriod 
                              ? 'No parameters assigned for this project configuration'
                              : 'Select project, year, and period first'
                            }
                          </td>
                        )}
                        <td className="border border-gray-300 px-2 py-1 text-center">
                          <button
                            onClick={() => saveStationData(station.id)}
                            className="text-green-600 hover:text-green-800 text-xs"
                            title="Save Row"
                            disabled={userAssignedParameters.length === 0}
                          >
                            💾
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <button 
                    onClick={saveAllData}
                    disabled={userAssignedParameters.length === 0}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Save All Data
                  </button>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={clearForm}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                  >
                    Clear Form
                  </button>
                </div>
              </div>

              {/* Parameter Units Info */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Parameter Units Reference:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-blue-700">
                  <div>pH: pH units</div>
                  <div>Temperature: °C</div>
                  <div>Conductivity: µS/cm</div>
                  <div>Dissolved Oxygen: mg/L</div>
                  <div>Turbidity: NTU</div>
                  <div>BOD: mg/L</div>
                  <div>Suspended Solids: mg/L</div>
                  <div>Heavy Metals: mg/L</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Excel-like Data Entry Interface - Removed as per requirement */}
        {/* Date/Time are now handled by admin, not in analyst data entry */}

        {/* Recent Analyses */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Analyses</h3>
            <p className="text-sm text-gray-600">Your recent water quality data entries</p>
          </div>
          <div className="p-6">
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="mb-2">No recent analyses found</p>
              <p className="text-sm">Start a new analysis using the form above</p>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900">Data Entry</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Enter water quality parameters for assigned monitoring stations (Date/Time managed by admin)
            </p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              New Entry
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900">Import Data</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Import water quality data from Excel files
            </p>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Import Excel
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Save className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900">Export Data</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Export entered data to Excel or PDF format
            </p>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
