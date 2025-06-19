import React, { useState } from "react";
import { Search, ArrowUp } from "lucide-react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const results = [
    {
      title: "Contract for Sale of Property",
      section: "Section 3.2",
      snippet:
        "The contract outlines the terms and conditions for the sale of the property, including the purchase price, payment schedule, and closing date.",
      confidence: 95,
    },
    {
      title: "Residential Lease Agreement",
      section: "Section 2.1",
      snippet:
        "The lease agreement specifies the monthly rent, security deposit, and responsibilities of both the landlord and tenant.",
      confidence: 88,
    },
    {
      title: "Employment Contract",
      section: "Section 4.5",
      snippet:
        "The employment contract details the employee's role, salary, benefits, and termination conditions.",
      confidence: 75,
    },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-200"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-3">
          {["Document Type", "Legal Domain", "Date Range"].map((filter) => (
            <button
              key={filter}
              className="border px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Search Results</h2>
        <div className="space-y-4">
          {results.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b pb-4"
            >
              <div>
                <h3 className="font-medium text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  {item.title} – {item.section}
                </p>
                <p className="text-sm text-gray-600 mt-1">{item.snippet}</p>
              </div>
              <p className="text-sm font-semibold text-gray-700 mt-2 sm:mt-0 sm:ml-4">
                {item.confidence}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Question Answering */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Question Answering</h2>

        <div className="relative mt-6 w-full lg:w-[500px] mb-4">
          <input
            type="text"
            placeholder="Type your question here"
            onChange={(e) => setQuery(e.target.value)}
            value={""}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim() !== "") {
                console.log("Submitted question query");
              }
            }}
            className="w-full px-4 pr-10 py-2 border bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />

          {query.trim() !== "" && (
            <button
              onClick={() => {
                console.log("Here");
              }}
              className="absolute right-1 -top-1/12   transform translate-y-1/2 transition"
            >
              <ArrowUp className="w-6 h-6 bg-[#61758A] cursor-pointer text-white 0.5 rounded-full" />
            </button>
          )}
        </div>
        {/* Dummy answer */}
        <p className="text-gray-800 text-sm">
          <strong>Answer:</strong> The purchase price for the property is
          $500,000, payable in installments as per the payment schedule outlined
          in Section 3.2 of the Contract for Sale of Property.
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Source: Contract for Sale of Property – Section 3.2
        </p>
      </div>
    </div>
  );
};

export default SearchPage;
