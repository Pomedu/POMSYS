import React from "react";
import MetaTag from "../MetaTags/SEOMetaTag";
import { Link } from "react-router-dom";
import './Errors.css'

const NotFound = () => {
  return (
    <>
      <MetaTag
        title={`내기할래`}
        description={"우리, 내기할래? - 술자리 내기를 직접 해보자"}
      />
      <div>
        <div className="error-box">
          404 Error: 잘못된 url입니다.
        </div>
        <div className="encourage-bet-button-container">
          <Link to="/discovery" className="encourage-bet-button">
            <div className="encourage-bet-button-emoji">🏃&nbsp;</div>홈페이지로
            이동
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
