import React from "react";
import MetaTag from "../MetaTags/SEOMetaTag";
import { Link } from "react-router-dom";
import './Errors.css'

const InternalServerError = () => {
  return (
    <>
      <MetaTag
        title={`내기할래`}
        description={"우리, 내기할래? - 술자리 내기를 직접 해보자"}
      />
      <div>
          <div className="error-box">
            500 Error: 서버오류입니다.
          </div>
          <div className="encourage-bet-button-container">
            <Link to="/discovery" className="encourage-bet-button">
              <div className="encourage-bet-button-emoji">🏃&nbsp;</div>홈페이지로 이동
            </Link>
          </div>
        </div>
    </>
  );
};

export default InternalServerError;
