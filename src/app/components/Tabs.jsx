"use client";
import { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="flex w-full">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 items-center text-center px-4 py-2 focus:outline-none ${
              activeTab === index
                ? "border-b-3 font-bold border-dark-blue text-dark-blue"
                : "text-black"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab] && tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
