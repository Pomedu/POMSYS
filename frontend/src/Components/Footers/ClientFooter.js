import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./Footer.css";

export default function ClientFooter() {
  return (
    <div className="footer">
      <div className="wrap">
        <div className="corporate-info">
          <div className="corporate-name">주식회사 포엠에듀</div>
          <div className="corporate-ceo">대표 허준성</div>
          <div className="corporate-register-number">
            사업자등록번호 326-81-00707
          </div>
          <div className="corporate-address">
            주소 경상북도 포항시 남구 유강길          </div>
          <div className="corporate-email">Email master@pomedu.page</div>
        </div>
        <div className="service-terms">
          <div
            className="terms-of-service"
            onClick={() => {
              window.open(
                "/"
              );
            }}
          >
            이용약관
          </div>
          <div
            className="privacy-policy"
            onClick={() => {
              window.open(
                "/"
              );
            }}
          >
            개인정보취급방침
          </div>
        </div>
      </div>
    </div>
  );
}
