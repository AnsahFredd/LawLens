import React from "react";
import { File } from "lucide-react";

const ClauseItem = ({ label, value }) => {
  return (
    <div className="flex items-center p-3 bg-white rouded  hover:bg-gray-50 space-x-8">
      <div className="flex items-center justify-center bg-[#F0F2F5] p-1.5 rounded-md">
        <File color="#121417" />
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-700">{value}</p>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    </div>
  );
};

export default ClauseItem;
