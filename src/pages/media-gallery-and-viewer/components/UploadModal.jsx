import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const UploadModal = ({ 
  isOpen, 
  onClose, 
  onUpload, 
  albums 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    
    const fileObjects = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      preview: URL.createObjectURL(file)
    }));
    
    setSelectedFiles(prev => [...prev, ...fileObjects]);
  };

  const removeFile = (fileId) => {
    setSelectedFiles(prev => {
      const updated = prev.filter(f => f.id !== fileId);
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updated;
    });
  };

  const formatFileSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    for (const file of selectedFiles) {
      setUploadProgress(prev => ({ ...prev, [file.id]: 0 }));
      
      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({ ...prev, [file.id]: progress }));
      }
    }
    
    // Call the upload handler
    onUpload(selectedFiles, selectedAlbum);
    
    // Reset state
    setSelectedFiles([]);
    setUploadProgress({});
    setSelectedAlbum('');
    setIsUploading(false);
    onClose();
  };

  const handleClose = () => {
    if (!isUploading) {
      selectedFiles.forEach(file => URL.revokeObjectURL(file.preview));
      setSelectedFiles([]);
      setUploadProgress({});
      setSelectedAlbum('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-onSurface">Upload Media</h2>
          <Button
            variant="ghost"
            onClick={handleClose}
            iconName="X"
            disabled={isUploading}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Album Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-onSurface mb-2">
              Select Album (Optional)
            </label>
            <select
              value={selectedAlbum}
              onChange={(e) => setSelectedAlbum(e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-onSurface"
              disabled={isUploading}
            >
              <option value="">No Album</option>
              {albums.map(album => (
                <option key={album.id} value={album.id}>{album.name}</option>
              ))}
            </select>
          </div>

          {/* Drop Zone */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary bg-opacity-10' :'border-gray-300 dark:border-gray-600 hover:border-primary'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
            />
            
            <Icon name="Upload" size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-onSurface mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Support for images and videos up to 100MB each
            </p>
            
            <Button
              variant="primary"
              onClick={() => fileInputRef.current?.click()}
              iconName="FolderOpen"
              disabled={isUploading}
            >
              Choose Files
            </Button>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-onSurface mb-4">
                Selected Files ({selectedFiles.length})
              </h3>
              
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {selectedFiles.map((file) => (
                  <div key={file.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-12 h-12 rounded overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                      {file.type === 'image' ? (
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon name="Video" size={20} className="text-gray-500" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-onSurface truncate">{file.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatFileSize(file.size)} • {file.type}
                      </p>
                      
                      {/* Progress Bar */}
                      {uploadProgress[file.id] !== undefined && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress[file.id]}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {uploadProgress[file.id]}% uploaded
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      onClick={() => removeFile(file.id)}
                      iconName="X"
                      size="sm"
                      disabled={isUploading}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
          </p>
          
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              onClick={handleClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || isUploading}
              loading={isUploading}
              iconName="Upload"
            >
              {isUploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;