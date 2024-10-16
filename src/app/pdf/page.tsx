"use client";
import React, { useRef } from "react";
import generatePDF, { Margin } from "react-to-pdf";

// Define PDF options
const options = {
  filename: "employment_contract.pdf",
  page: {
    margin: {
      top: 20,
      bottom: 20,
      left: 10,
      right: 10,
    },
    format: "letter", // Change to 'A4' if needed
  },
};

const EmploymentContract: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    generatePDF(printRef, options);
  };

  return (
    <div>
      <button onClick={handleDownloadPDF}>Download PDF</button>
      <div ref={printRef} className="print-section">
        <h1>Employment Contract</h1>
        <h3>Between</h3>
        <p>
          <strong>Company Name:</strong> Your Company Name <br />
          <strong>Address:</strong> Company Address <br />
          <strong>Contact:</strong> Company Contact Info
        </p>

        <h3>And</h3>
        <p>
          <strong>Employee Name:</strong> Employee Full Name <br />
          <strong>Address:</strong> Employee Address <br />
          <strong>Contact:</strong> Employee Contact Info
        </p>

        <h2>1. Position</h2>
        <p>
          The employee will serve as a [Job Title] and will report directly to
          [Supervisor/Manager's Name].
        </p>

        <h2>2. Responsibilities</h2>
        <p>The employee's responsibilities include but are not limited to:</p>
        <ul>
          <li>Responsibility 1</li>
          <li>Responsibility 2</li>
          <li>Responsibility 3</li>
        </ul>

        {/* Add more content as necessary */}
      </div>
    </div>
  );
};

export default EmploymentContract;
