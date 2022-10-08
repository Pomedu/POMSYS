import React, { useEffect, useState } from "react";
import ContentTitle from "../../../components/Common/ContentTitle";
import CreateLectureForm from "../../../components/Forms/CreateLectureForm";

const AdminLectureCreatePage = () => {

    return (
        <div>
            <ContentTitle title="강의 생성" mainTitle="강의 관리" />
            <div className="card">
                <div className="card-body">
                    <CreateLectureForm/>
                </div>
            </div>
        </div>
    );
};

AdminLectureCreatePage.layout = "L1";

export default AdminLectureCreatePage;
