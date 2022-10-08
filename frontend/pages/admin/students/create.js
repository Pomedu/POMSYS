import React from "react";
import ContentTitle from "../../../components/Common/ContentTitle";
import CreateStudentForm from "../../../components/Forms/CreateStudentForm";

const AdminTeacherCreatePage = () => {

    return (
        <div>
            <ContentTitle title="학생 생성" mainTitle="학생 관리" />
            <div className="card">
                <div className="card-body">
                    <CreateStudentForm/>
                </div>
            </div>
        </div>
    );
};

AdminTeacherCreatePage.layout = "L1";

export default AdminTeacherCreatePage;
