import React from "react";
import MetaTag from "../../MetaTags/SEOMetaTag";
import { Link } from "react-router-dom";
import './Errors.css'

const NotFound = () => {
  return (
    <>
      <MetaTag
        title={`POMSYS`}
        description={"포엠 학습관리 시스템"}
      />
      <div>
        <div className="error-box">
          404 Error: 잘못된 url입니다.
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

export default NotFound;
