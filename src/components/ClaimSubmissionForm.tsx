import React, { useState } from 'react';
import { Upload, User, DollarSign, FileText, AlertCircle } from 'lucide-react';

interface ClaimSubmissionFormProps {
  onSubmit: (
    claimData: {
      claimType: 'medical' | 'auto' | 'property' | 'life';
      claimAmount: number;
      claimant: {
        name: string;
        email: string;
        phone: string;
        policyNumber: string;
      };
    },
    files: File[]
  ) => Promise<void>;
  loading: boolean;
}

export function ClaimSubmissionForm({ onSubmit, loading }: ClaimSubmissionFormProps) {
  const [claimType, setClaimType] = useState<'medical' | 'auto' | 'property' | 'life'>('auto');
  const [claimAmount, setClaimAmount] = useState('');
  const [claimant, setClaimant] = useState({
    name: '',
    email: '',
    phone: '',
    policyNumber: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      alert('Please upload at least one document');
      return;
    }

    await onSubmit(
      {
        claimType,
        claimAmount: parseFloat(claimAmount),
        claimant
      },
      files
    );

    // Reset form
    setClaimAmount('');
    setClaimant({ name: '', email: '', phone: '', policyNumber: '' });
    setFiles([]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center mb-6">
        <FileText className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Submit New Claim</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Claim Type
            </label>
            <select
              value={claimType}
              onChange={(e) => setClaimType(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="auto">Auto Insurance</option>
              <option value="medical">Medical Insurance</option>
              <option value="property">Property Insurance</option>
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
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Claimant Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={claimant.name}
              onChange={(e) => setClaimant(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Full Name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="email"
              value={claimant.email}
              onChange={(e) => setClaimant(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Email Address"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="tel"
              value={claimant.phone}
              onChange={(e) => setClaimant(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Phone Number"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="text"
              value={claimant.policyNumber}
              onChange={(e) => setClaimant(prev => ({ ...prev, policyNumber: e.target.value }))}
              placeholder="Policy Number"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center mb-4">
            <Upload className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Document Upload</h3>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drag and drop files here, or click to select
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Support for PDF, images, and text files
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
              accept=".pdf,.jpg,.jpeg,.png,.gif,.txt,.doc,.docx"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              Select Files
            </label>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">{file.name}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center p-4 bg-blue-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-3" />
          <p className="text-sm text-blue-800">
            Your claim will be automatically processed using our AI-powered system. 
            Simple claims may be auto-approved, while complex cases will be routed to human reviewers.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Submit Claim'}
        </button>
      </form>
    </div>
  );
}