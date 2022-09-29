import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'


function AdminLectureList() {
  
  
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-4">강의 목록</h4>
                    <div>
                        <div className="right-side-btn">
                            <Link className='btn btn-primary mb-4' to='create/'>강의생성</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default AdminLectureList;


