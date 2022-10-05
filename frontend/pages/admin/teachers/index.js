import React from "react";
import Link from "next/link";

const AdminTeacherListPage = () => {

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-4">강사 목록</h4>
                    <div>
                        <div className="right-side-btn">
                            <Link className='btn btn-primary mb-4' href={'create/'}>강사생성</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

AdminTeacherListPage.layout = "L1";

export default AdminTeacherListPage