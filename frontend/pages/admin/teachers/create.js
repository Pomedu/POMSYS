import React from "react";
import ContentTitle from "../../../components/Common/ContentTitle";
import CreateTeacherForm from "../../../components/Forms/CreateTeacherForm";

const AdminTeacherCreatePage = () => {

    return (
        <div>
            <ContentTitle title="강사 생성" mainTitle="강사 관리" />
            <div className="card">
                <div className="card-body">
                    <CreateTeacherForm/>
                </div>
            </div>
        </div>
    );
};

AdminTeacherCreatePage.layout = "L1";

export default AdminTeacherCreatePage;
