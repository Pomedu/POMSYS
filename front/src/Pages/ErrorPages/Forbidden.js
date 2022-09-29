import React from "react";

import { Link } from "react-router-dom";
import MetaTag from "../../MetaTags/SEOMetaTag";
import './Errors.css'

const Forbidden = () => {
  return (
    <>
      <MetaTag
        title={`POMSYS`}
        description={"포엠 학습관리 시스템"}
      />
      <div>
        <div className="error-box">
          403 Error: 접근권한이 없습니다.
        </div>
        <div>
          <Link to="/">
            홈페이지로 이동
          </Link>
        </div>
      </div>
    </>
  );
};

export default Forbidden;
