import React, { useState } from 'react';
import { BsCloudUpload } from 'react-icons/bs';

function Upload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files!)]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(event.dataTransfer.files)]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>UPLOAD DPR</h3>
      </div>

      <div className='upload-container'>
        <div
          className='dropzone'
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <BsCloudUpload className='upload-icon' />
          <p>Drag & Drop files here, or click to select files</p>
          <input
            type="file"
            id="fileInput"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept=".pdf,.txt"
          />
        </div>
        <button className='upload-btn'>Upload Files</button>

        {files.length > 0 && (
          <div className='file-list'>
            <h4>Selected Files:</h4>
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  {file.name} - {(file.size / 1024).toFixed(2)} KB
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

export default Upload;