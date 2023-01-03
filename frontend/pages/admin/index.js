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
import moment from "moment";

const AdminPage = ({ lecturesData, teachersData, studentsData, enrollsData }) => {
    
    const userData = useSelector(state=>state.accounts.userData);  
    
    const monthList = [];
    const salesList = [];
    const subjectsList = [];
    for(var i=11; i>-2; i-- ){
        monthList.push(moment().subtract(i,"M").format('yyyy-MM'));
        salesList.push(0);
        subjectsList.push(0);
    }
    
    for(var i=0; i<monthList.length; i++ ){
        for(var j=0; j<enrollsData.length;j++){
            if(moment(enrollsData[j].joined_at).format('yyyy-MM')<=monthList[i]&&monthList[i]<=moment(enrollsData[j].lecture.end_date).format('yyyy-MM')){
                salesList[i] += enrollsData[j].lecture.cost;
                subjectsList[i] += 1;
            }
        }
    }

    const increased_rate = Math.round((salesList[11]-salesList[10])/salesList[10]*1000)/10;
 

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
                                    <h4>{subjectsList[11]} 과목</h4>
                                    <span className="font-size-12 me-1"> 수강생 1명당  
                                        <span className="fw-semibold text-primary"> 평균 {Math.round(subjectsList[11]/studentsData.length*10)/10} 과목 </span>
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
                                            <h4 className="card-title mb-4">매출 및 수강과목 추이</h4>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="text-muted">
                                                    <div className="mb-4">
                                                        <h5>이번달 매출</h5>
                                                        <h4>{Math.round(salesList[11]/10000)}만원</h4>                                                
                                                        <div>
                                                        {salesList[11]-salesList[10]>0?
                                                        <span className="badge badge-soft-success font-size-12 me-1">+{increased_rate}%</span>:
                                                        <span className="badge badge-soft-danger font-size-12 me-1">{increased_rate}%</span>}
                                                          
                                                         지난달 대비</div>
                                                    </div>
                                                    
                                                    <div className="mt-4">
                                                        <p className="mb-2">지난달 매출</p>
                                                        <h5>{Math.round(salesList[10]/10000)}만원</h5>
                                                    </div> 
                                                    <div className="mb-4 mt-4">
                                                        <p>현재 등록된 수강과목 수</p>
                                                        <h4>{subjectsList[11]}과목</h4>                                                
                                                        <div>
                                                        {subjectsList[11]-subjectsList[10]>0?
                                                        <span className="badge badge-soft-success font-size-12 me-1">+{subjectsList[11]-subjectsList[10]}</span>:
                                                        <span className="badge badge-soft-danger font-size-12 me-1">{subjectsList[11]-subjectsList[10]}</span>}                                                          
                                                         지난달 대비</div>
                                                    </div>
                                                    
                                                                                                          
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <AChart 
                                                    options= {{                                              
                                                    xaxis: {
                                                        categories: monthList,
                                                        labels: {
                                                            formatter: function (value) {
                                                              return moment(value).format('yyyy-MM');
                                                            }
                                                        }
                                                        },                                                    
                                                    yaxis: [
                                                        {
                                                          title: {
                                                            text: "매출"
                                                          },
                                                        },
                                                        {
                                                          opposite: true,
                                                          title: {
                                                            text: "수강과목 수"
                                                          }
                                                        }
                                                      ],
                                                      annotations: {   
                                                        points: [{
                                                            x:  moment().format('yyyy-MM'),
                                                            y: salesList[11],
                                                            marker: {
                                                              size: 6,
                                                              fillColor: '#fff',
                                                              strokeColor: 'red',
                                                              radius: 2,
                                                            },
                                                            label: {
                                                              borderColor: '#FF4560',
                                                              offsetY: 0,
                                                              style: {
                                                                color: '#fff',
                                                                background: '#FF4560',
                                                              },
                                                        
                                                              text: '이번달',
                                                            }
                                                          },
                                                          {
                                                            x:  moment().add(1,'M').format('yyyy-MM'),
                                                            y: salesList[12],
                                                            marker: {
                                                              size: 6,
                                                              fillColor: '#fff',
                                                              strokeColor: 'green',
                                                              radius: 2,
                                                            },
                                                            label: {
                                                              borderColor: 'green',
                                                              offsetY: 0,
                                                              style: {
                                                                color: '#fff',
                                                                background: 'green',
                                                              },                                                        
                                                              text: '다음달',
                                                            }
                                                          }]},   
                                                    markers: {
                                                        size: 4,
                                                    },
                                                    }}
                                                    series= {[
                                                        {
                                                            name: "예상매출",
                                                            data:salesList,
                                                            type: 'line'    
                                                        },
                                                        {
                                                            name: "수강과목 수",
                                                            type: 'column',
                                                            data:subjectsList
                                                        }]}
                                                    />
                                            </div>                       
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title mb-4">과목별 매출비중</h4>

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