import moment from "moment";
import "moment/locale/ko"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherEnrolls } from "../../../store/modules/enrollsSlice";
import { fetchTeacherLectures } from "../../../store/modules/lecturesSlice";
import AChart from "../../Common/AChart";

const TeacherSalesRatioCard = (props) => {
    const teacher_pk = 0;
    const dispatch = useDispatch();
    useEffect(()=>{
        if(props.userData.role=='T'){
            teacher_pk = props.teachersData.find(teacher=>teacher.name==props.userData.name&&teacher.phone_number==props.userData.phone_number).id;
            dispatch(fetchTeacherEnrolls(teacher_pk));
            dispatch(fetchTeacherLectures(teacher_pk));
        }
    },[])
    const enrollsData = useSelector(state=>state.enrolls.enrollsData);  
    const lecturesData = useSelector(state=>state.lectures.lecturesData);  
    let salesRatioDic = {};
    let salesRatio = [];
    lecturesData.map((lecture)=>{
        salesRatioDic[lecture.name] = 0;  
    })
    enrollsData.map((enroll)=>{
        salesRatioDic[enroll.lecture.name] += enroll.lecture.cost;
    })
    for(const key in salesRatioDic) {
        salesRatio.push({name:key, data:[salesRatioDic[key]]})
    }
    
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title mb-4">강의별 매출비중</h4>
                <div className="text-center text-muted">
                    <div>
                        <AChart
                            height="100px"
                            options={{
                                chart: {
                                    type: 'bar',
                                    stacked: true,
                                    stackType: '100%',
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: true,
                                    },
                                },
                                yaxis: {
                                    show: false
                                },
                                xaxis: {
                                    axisTicks: {
                                        show: false
                                    },
                                    labels: {
                                        show: false
                                    }
                                },
                                colors: ['#34c38f', '#f1b44c', '#f46a6a', '#50a5f1', '#556ee6', '#74788d']
                            }}
                            series={salesRatio}

                            type="bar"
                        />
                    </div>
                    <div className="row">                        
                            {salesRatio.map(lecture=>
                            <div className="col-4" key={lecture.id}>
                            <div className="mt-4">
                                <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-primary me-1"></i> {lecture.name}</p>
                                <h5>{Math.round(lecture.data / 10000)}만원</h5>
                            </div>
                            </div> 
                            )}                         
                    </div>                    
                </div>
            </div>
        </div>
    );
};

export default TeacherSalesRatioCard