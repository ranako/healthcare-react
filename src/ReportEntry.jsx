
import React from "react";
import { IoArrowForward } from "react-icons/io5";
import robotImage from "./assets/health.png";
import "./ReportEntry.css";

function ReportEntry({ onSendReports }) {
  return (
    <div className="report-entry">
      <div className="report-entry-container">
        <div className="image-section">
          <div className="report-entry-image">
            <img
              src={robotImage}
              alt="Health Report"
            />
          </div>
        </div>

        <div className="report-entry-content">
          <div className="text-container">
            <div className="text-content">
              <p>
                To help our AI provide you with accurate health guidance,
                personalized diet plans, and recommended exercises, we need some
                basic information about your health. Please upload your medical
                history and relevant documents. These will help us generate a plan
                tailored just for you.
              </p>
            </div>
            <div className="text-button">
              <button onClick={onSendReports} className="send-reports-btn">
                Send your Reports <IoArrowForward className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReportEntry;
