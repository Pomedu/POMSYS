import React from "react";
import Link from "next/link";

const AdminLectureListPage = () => {

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-4">강의 목록</h4>
                    <div>
                        <div className="right-side-btn">
                            <Link className='btn btn-primary mb-4' href={'create/'}>강의생성</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

AdminLectureListPage.layout = "L1";

export default AdminLectureListPage