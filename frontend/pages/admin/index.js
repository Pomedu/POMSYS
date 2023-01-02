import React from "react";
import Link from "next/link";
import { fetchLectures } from "../../store/modules/lecturesSlice";
import { fetchTeachers } from "../../store/modules/teachersSlice";
import { fetchStudents } from "../../store/modules/studentsSlice";
import { fetchAllEnrolls, fetchEnrolls } from "../../store/modules/enrollsSlice";
import wrapper from "../../store/configureStore";
import ContentTitle from "../../components/Common/ContentTitle";
import { FaEllipsisV, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { BiMale, BiRegistered, BiUser } from "react-icons/bi";
import AChart from "../../components/Common/AChart";

const AdminPage = ({ lecturesData, teachersData, studentsData, enrollsData }) => {
    
    const userData = useSelector(state=>state.accounts.userData);   

    
    return (
        <div className="row">
            <ContentTitle title="대시보드" mainTitle="홈" />
            <div className="row">
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-4">
                            <span className="text-primary"><FaUserCircle size="30"/></span>                            
                            <span className="text-primary fw-semibold font-size-16 ms-2">{userData.name}</span>
                            <span className="font-size-16">님 환영합니다.</span>
                        </div>
                        <div>
                            <h5>{userData.role=='A'?"관리자":"강사"}</h5>
                            <p className="text-muted mb-1">연락처: {userData.phone_number}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-8">                
                {userData.role=="A"?
                <div className="row">
                    <div className="col-lg-4">
                        <Link href={'/admin/teachers'}>
                        <div className="card clickable">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="avatar-xs me-3">
                                        <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                                            <BiMale/>
                                        </span>
                                    </div>
                                    <h5 className="font-size-14 mb-0">전체 강사</h5>
                                </div>
                                <div className="text-muted mt-4">
                                    <h4>{teachersData.length} 명</h4>
                                    <div>
                                        <span className="badge badge-soft-success font-size-12 me-1"> 수학: {teachersData.filter(teacher=>teacher.subject=="수학").length}</span> 
                                        <span className="badge badge-soft-warning font-size-12 me-1"> 국어: {teachersData.filter(teacher=>teacher.subject=="국어").length}</span> 
                                        <span className="badge badge-soft-danger font-size-12 me-1"> 영어: {teachersData.filter(teacher=>teacher.subject=="영어").length}</span> 
                                        <span className="badge badge-soft-info font-size-12 me-1"> 과학: {teachersData.filter(teacher=>teacher.subject=="과학").length}</span> 
                                        <span className="badge badge-soft-primary font-size-12 me-1"> 사회: {teachersData.filter(teacher=>teacher.subject=="사회").length}</span>
                                        <span className="badge badge-soft-secondary font-size-12 me-1"> 논술: {teachersData.filter(teacher=>teacher.subject=="논술").length}</span>                                         
                                    </div>
                                </div>  
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div className="col-lg-4">
                        <Link href={'/admin/students'}>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="avatar-xs me-3">
                                        <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                                            <BiUser/>
                                        </span>
                                    </div>
                                    <h5 className="font-size-14 mb-0">전체 학생</h5>
                                </div>
                                <div className="text-muted mt-4">
                                    <h4>{studentsData.length} 명</h4>
                                    <div>
                                        <span className="badge badge-soft-success font-size-12 me-1"> 지곡점: {studentsData.filter(student=>student.branch=="지곡").length}</span> 
                                        <span className="badge badge-soft-warning font-size-12 me-1"> 센텀점: {studentsData.filter(student=>student.branch=="센텀").length}</span>                                              
                                    </div>
                                </div>  
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div className="col-lg-4">
                    <Link href={'/admin/enrolls'}>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="avatar-xs me-3">
                                        <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                                            <BiRegistered/>
                                        </span>
                                    </div>
                                    <h5 className="font-size-14 mb-0">전체 수강등록</h5>
                                </div>
                                <div className="text-muted mt-4">
                                    <h4>{enrollsData.length} 과목</h4>
                                    <span className="font-size-12 me-1"> 수강생 1명당  
                                        <span className="fw-semibold text-primary"> 평균 {Math.round(enrollsData.length/studentsData.length*10)/10} 과목 </span>
                                        수강
                                    </span> 
                                </div>  
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>:
                 <div className="row">
                 
                </div>                
                }                    
                </div>
                <div className="row">
                <div className="col-xl-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="clearfix">                                            
                                            <h4 className="card-title mb-4">매출</h4>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="text-muted">
                                                    <div className="mb-4">
                                                        <p>이번달(예상)</p>
                                                        <h4>$2453.35</h4>
                                                        {lecturesData.map((lecture)=>(
                                                            <div>[{lecture.name}]의 수강료: {lecture.cost}, 수강생:{enrollsData.filter(enroll=>enroll.lecture.id==lecture.id).length}</div>
                                                        ))}
                                                        <div><span className="badge badge-soft-success font-size-12 me-1"> + 0.2% </span> From previous period</div>
                                                    </div>

                                                    <div>
                                                        <a href="javascript: void(0);" className="btn btn-primary waves-effect waves-light btn-sm">View Details <i className="mdi mdi-chevron-right ms-1"></i></a>
                                                    </div>
                                                    
                                                    <div className="mt-4">
                                                        <p className="mb-2">Last month</p>
                                                        <h5>$2281.04</h5>
                                                    </div>
                                                    
                                                </div>
                                            </div>

                                            <AChart 
                                            options= {{                                              
                                                colors: ['#00E396'],                                                
                                                legend: {
                                                  show: true,
                                                  showForSingleSeries: true,
                                                  customLegendItems: ['실제점수', '평균'],
                                                  markers: {
                                                    fillColors: ['#00E396', '#775DD0']
                                                  }
                                                },
                                              }}
                                              series= {[{
                                                name: "실제점수",
                                                data: [
                                                    {
                                                        x: '2011',
                                                        y: 12,                                                       
                                                    },
                                                    {
                                                        x: '2012',
                                                        y: 44,                                                       
                                                    }
                                                ]
                                                }]}
                                              type='line'/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title mb-4">Sales Analytics</h4>

                                        <div>
                                            <div id="donut-chart" data-colors='["--bs-primary", "--bs-success", "--bs-danger"]' className="apex-charts"></div>
                                        </div>

                                        <div className="text-center text-muted">
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="mt-4">
                                                        <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-primary me-1"></i> Product A</p>
                                                        <h5>$ 2,132</h5>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="mt-4">
                                                        <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-success me-1"></i> Product B</p>
                                                        <h5>$ 1,763</h5>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="mt-4">
                                                        <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-danger me-1"></i> Product C</p>
                                                        <h5>$ 973</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>
        </div>
    )

}

AdminPage.layout = "L1";

export default AdminPage

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    await store.dispatch(fetchLectures());
    await store.dispatch(fetchTeachers());
    await store.dispatch(fetchStudents());
    await store.dispatch(fetchAllEnrolls());

    const lecturesData = store.getState().lectures.lecturesData;
    const teachersData = store.getState().teachers.teachersData;
    const studentsData = store.getState().students.studentsData;
    const enrollsData = store.getState().enrolls.enrollsData;

    return { props: { lecturesData, teachersData, studentsData, enrollsData }, };

});