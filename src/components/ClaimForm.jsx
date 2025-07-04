import React, { useState } from 'react';
import { Upload, User, DollarSign, FileText, AlertCircle } from 'lucide-react';
import { processClaimWithML } from '../services/mlProcessor';

function ClaimForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    type: 'auto',
    amount: '',
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Process with ML
      const result = await processClaimWithML(formData, files);
      onSubmit(result);
      
      // Reset form
      setFormData({
        type: 'auto',
        amount: '',
        name: '',
        email: '',
        phone: '',
        description: ''
      });
      setFiles([]);
    } catch (error) {
      alert('Error processing claim: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <FileText className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Submit New Claim</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Claim Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="auto">Auto Insurance</option>
              <option value="medical">Medical</option>
              <option value="property">Property</option>
              <option value="life">Life Insurance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Claim Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="border-t pt-6">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Full Name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Phone"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Claim Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe what happened..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supporting Documents
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-blue-600 hover:text-blue-700"
            >
              Click to upload files
            </label>
            <p className="text-sm text-gray-500 mt-2">PDF, images, documents</p>
          </div>
          {files.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">{files.length} file(s) selected</p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="flex items-center p-4 bg-blue-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-3" />
          <p className="text-sm text-blue-800">
            Your claim will be processed using machine learning algorithms for automatic routing and priority assignment.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={processing}
          className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {processing ? 'Processing with ML...' : 'Submit Claim'}
        </button>
      </form>
    </div>
  );
}

export default ClaimForm;