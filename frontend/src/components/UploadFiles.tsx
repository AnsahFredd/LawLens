import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "../components/ui/Button";

import toast from "react-hot-toast";
import axios from "axios";

const UploadFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const maxSize = 10 * 1024 * 1024; //10mb

  const API = import.meta.env.VITE_API_BASE_URL;
  console.log("VITE_API_BASE_URL =", API);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      multiple: false,
      maxSize,
      accept: {
        "application/pdf": [".pdf"],
        "application/vnd.openxmlformates-officedocument.wordprocessingml.document":
          [".docx"],
        "text/plain": [".txt"],
      },
    });

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      setLoading(true);

      const response = await axios.post(`${API}/documents/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Upload successfully.");
      console.log("Uploaded document", response.data);

      setFiles([]);
    } catch (error) {
      console.error("Failed to upload file", error);
      toast.error("Upload failed. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-14 mb-14 gap-10 items-center justify-center">
      <div
        {...getRootProps()}
        className={`w-full border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-700">
            {isDragActive
              ? "Drop the files here..."
              : "Drag and drop files here"}
          </h2>

          <p className="text-sm text-gray-500">
            Or click to browse. Accepted formats:{" "}
            <span className="font-medium">PDF, DOCX, TXT</span> — Max size:{" "}
            <span className="font-medium">10MB</span> per file
          </p>

          <div className="inline-block mt-4">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded-md shadow hover:bg-blue-700 transition text-sm"
            >
              Select Files
            </button>
          </div>

          {files.length > 0 && (
            <ul className="mt-4 text-sm text-gray-700">
              {files.map((file) => (
                <li key={file.name}>
                  <span className="font-medium">{file.name}</span> —{" "}
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </li>
              ))}
            </ul>
          )}

          {fileRejections.length > 0 && (
            <p className="mt-2 text-sm text-red-500">
              Some files were rejected due to size/type.
            </p>
          )}
        </div>
      </div>
      <button
        className="bg-black text-white text-xl border px-2 py-3 rounded-md w-full md:w-1/4"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadFiles;
