import React from "react";
import ClauseItem from "../components/ClauseItem";
import { useParams } from "react-router-dom";

const DocumentReview = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Main content */}
      <div className=" flex flex-col  justify-center lg:items-start lg:justify-between lg:flex-row flex-1 lg:h-[calc(100vh-32px)] overflow-auto">
        <div className="w-full lg:w-2/3 p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-1">Document Review: {id}</h1>
            <p className="text-[#61758A] mb-2 ">
              Review the processed document, analyze identified clauses, and
              access summaries.
            </p>
          </div>
          {/* Left: Document Content */}
          <div className="flex items-center spac2 mb-4 ">
            <span className="underline cursor-pointer">
              Original Formatting
            </span>
            <span className="text-gray-400">|</span>
            <span className="cursor-pointer">Text-Only</span>
          </div>

          <div className="border-b mb-4 text-[#ccc]" />
          <p className="text-gray-700 leading-relaxed">
            This document pertains to a commercial lease agreement between a
            property owner, represented by Ms. Eleanor Vance, and a retail
            tenant, represented by Mr. Charles Bennett. The agreement
            outlines...
          </p>
        </div>

        {/* Right side: Clause overview + Summary */}
        <aside className="w-full lg:w-1/3 p-6 bg-white overflow-auto">
          <h2 className="text-xl font-bold mb-2">Clause Overview</h2>
          <ul className="space-y-2">
            <ClauseItem label="Leease Term" value="5 years" />
            <ClauseItem label="Rent Amount" value="$5,000/month" />
            <ClauseItem label="Renewal Option" value="5 years" />
            <ClauseItem label="Maintenance" value="Shared" />
            <ClauseItem label="Improvements" value="Tenant" />
            <ClauseItem label="Early Termination" value="Conditions Apply" />
            <ClauseItem label="Dispute Resolution" value="Mediation" />
            <ClauseItem label="Compliance" value="Local Regulations" />
          </ul>

          <h2 className="text-lg font-semibold mt-8 mb-2"></h2>
          <p className="text-gray-600 text-sm">
            This commercial lease agreement outlines the terms for a retail
            space lease between Eleanor Vance and Charles Bennett. The lease
            spans five years with a renewal option, setting the monthly rent at
            $5,000, subject to CPI-based annual increases...
          </p>
        </aside>
      </div>
    </div>
  );
};

export default DocumentReview;
