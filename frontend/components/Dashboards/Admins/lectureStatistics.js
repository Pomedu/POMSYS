import moment from "moment";
import "moment/locale/ko"
import { BiClipboard } from "react-icons/bi";

const LectureStatisticsCard = (props) => {   
    const monthList = [];
    const subjectsList = [];
    for(var i=11; i>-2; i-- ){
        monthList.push(moment().subtract(i,"M").format('yyyy-MM'));
        subjectsList.push(0);
    }
    
    for(var i=0; i<monthList.length; i++ ){
        for(var j=0; j<props.enrollsData.length;j++){
            if(moment(props.enrollsData[j].joined_at).format('yyyy-MM')<=monthList[i]&&monthList[i]<=moment(props.enrollsData[j].lecture.end_date).format('yyyy-MM')){
                subjectsList[i] += 1;
            }
        }
    }
    return (
    <div className="card">
        <div className="card-body">
            <div className="d-flex align-items-center mb-3">
                <div className="avatar-xs me-3">
                    <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                        <BiClipboard/>
                    </span>
                </div>
                <h5 className="font-size-14 mb-0">전체 강의</h5>
            </div>
            <div className="text-muted mt-4">
                <h4>{props.lecturesData.filter(lecture=>lecture.status=='진행중').length} 개 진행중</h4>
                <div>
                <span className="font-size-12 me-1"> 강의 1개당  
                    <span className="fw-semibold text-primary"> 평균 {Math.round(subjectsList[11]/props.lecturesData.filter(lecture=>lecture.status=='진행중').length*10)/10} 명 </span>
                    수강
                </span>                                            
                </div>
            </div>  
        </div>
    </div>
    );
};

export default LectureStatisticsCard