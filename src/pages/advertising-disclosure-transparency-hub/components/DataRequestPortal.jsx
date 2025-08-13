import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { supabase } from '../../../lib/supabase';

const DataRequestPortal = ({ complianceData, onUpdate }) => {
  const [dataRequests, setDataRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchDataRequests();
  }, []);

  const fetchDataRequests = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase?.from('data_requests')?.select('*')?.order('created_at', { ascending: false });

      if (error) throw error;

      setDataRequests(data || []);
    } catch (err) {
      console.error('Error fetching data requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      const { error } = await supabase?.from('data_requests')?.update({ status: newStatus })?.eq('id', requestId);

      if (error) throw error;

      await fetchDataRequests();
      onUpdate?.();
    } catch (err) {
      console.error('Error updating request status:', err);
      alert('Failed to update request status. Please try again.');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      processing: { color: 'bg-blue-100 text-blue-800', label: 'Processing' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
      denied: { color: 'bg-red-100 text-red-800', label: 'Denied' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getRequestTypeIcon = (type) => {
    const typeIcons = {
      access: 'Eye',
      deletion: 'Trash2',
      portability: 'Download',
      rectification: 'Edit'
    };
    return typeIcons?.[type] || 'FileText';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredRequests = filterStatus === 'all' 
    ? dataRequests 
    : dataRequests?.filter(request => request?.status === filterStatus);

  const requestStats = {
    total: dataRequests?.length || 0,
    pending: dataRequests?.filter(r => r?.status === 'pending')?.length || 0,
    processing: dataRequests?.filter(r => r?.status === 'processing')?.length || 0,
    completed: dataRequests?.filter(r => r?.status === 'completed')?.length || 0
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Data Request Portal
        </h2>
        <p className="text-gray-600">
          Manage GDPR, CCPA, and LGPD data requests from users.
        </p>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{requestStats?.total}</p>
            </div>
            <Icon name="FileText" className="text-gray-400" size={24} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{requestStats?.pending}</p>
            </div>
            <Icon name="Clock" className="text-yellow-400" size={24} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-blue-600">{requestStats?.processing}</p>
            </div>
            <Icon name="RefreshCw" className="text-blue-400" size={24} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{requestStats?.completed}</p>
            </div>
            <Icon name="CheckCircle" className="text-green-400" size={24} />
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'All Requests' },
            { key: 'pending', label: 'Pending' },
            { key: 'processing', label: 'Processing' },
            { key: 'completed', label: 'Completed' },
            { key: 'denied', label: 'Denied' }
          ]?.map((filter) => (
            <button
              key={filter?.key}
              onClick={() => setFilterStatus(filter?.key)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                filterStatus === filter?.key
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' :'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {filter?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Requests List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {filteredRequests?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Inbox" className="text-gray-400 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Requests</h3>
            <p className="text-gray-600">
              {filterStatus === 'all' ? 'No data requests have been submitted yet.' : `No ${filterStatus} requests found.`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredRequests?.map((request) => (
              <div
                key={request?.id}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedRequest(request)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon name={getRequestTypeIcon(request?.request_type)} className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 capitalize">
                        {request?.request_type?.replace('_', ' ')} Request
                      </h3>
                      <p className="text-sm text-gray-600">
                        {request?.email} • {formatDate(request?.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(request?.status)}
                    <Icon name="ChevronRight" className="text-gray-400" size={16} />
                  </div>
                </div>

                {request?.request_details && (
                  <div className="ml-13 text-sm text-gray-600">
                    <p className="line-clamp-2">
                      {request?.request_details}
                    </p>
                  </div>
                )}

                {request?.status === 'pending' && (
                  <div className="ml-13 mt-3 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        updateRequestStatus(request?.id, 'processing');
                      }}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                    >
                      Start Processing
                    </button>
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        updateRequestStatus(request?.id, 'denied');
                      }}
                      className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      Deny Request
                    </button>
                  </div>
                )}

                {request?.status === 'processing' && (
                  <div className="ml-13 mt-3">
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        updateRequestStatus(request?.id, 'completed');
                      }}
                      className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                    >
                      Mark Complete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name={getRequestTypeIcon(selectedRequest?.request_type)} className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 capitalize">
                      {selectedRequest?.request_type?.replace('_', ' ')} Request
                    </h2>
                    <p className="text-gray-600">
                      Submitted {formatDate(selectedRequest?.created_at)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Contact Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{selectedRequest?.email}</span>
                  </div>
                  {selectedRequest?.full_name && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{selectedRequest?.full_name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Request Details */}
              {selectedRequest?.request_details && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Request Details</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedRequest?.request_details}
                    </p>
                  </div>
                </div>
              )}

              {/* Status Management */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Status Management</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Current Status:</span>
                    {getStatusBadge(selectedRequest?.status)}
                  </div>
                  
                  <div className="flex space-x-2">
                    {selectedRequest?.status === 'pending' && (
                      <button
                        onClick={() => {
                          updateRequestStatus(selectedRequest?.id, 'processing');
                          setSelectedRequest(null);
                        }}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Start Processing
                      </button>
                    )}
                    
                    {selectedRequest?.status === 'processing' && (
                      <button
                        onClick={() => {
                          updateRequestStatus(selectedRequest?.id, 'completed');
                          setSelectedRequest(null);
                        }}
                        className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Mark Complete
                      </button>
                    )}
                    
                    {selectedRequest?.status !== 'denied' && selectedRequest?.status !== 'completed' && (
                      <button
                        onClick={() => {
                          updateRequestStatus(selectedRequest?.id, 'denied');
                          setSelectedRequest(null);
                        }}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Deny Request
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Compliance Information */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Compliance Guidelines</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• GDPR: Respond within 30 days</li>
                  <li>• CCPA: Respond within 45 days</li>
                  <li>• LGPD: Respond within 15 days</li>
                  <li>• Always verify identity before processing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataRequestPortal;