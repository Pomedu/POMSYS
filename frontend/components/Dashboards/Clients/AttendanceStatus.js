import AChart from "../../Common/AChart";
import moment from "moment";
import "moment/locale/ko"

const AttendanceStatusCard = (props) => {

    // 출석 관련 내용
    const class_names = [];
    const num_classes = [];
    const num_attends = [];
    const num_absents = [];

    for (var i = 0; i < props.enrollsData.length; i++) {
        num_classes.push(0);
        num_attends.push(0);
        num_absents.push(0);
        class_names.push(props.enrollsData[i].lecture.name)
        for (var j = 0; j < props.lessonsData.length; j++) {
            if (props.lessonsData[j].date >= props.enrollsData[i].joined_at && props.lessonsData[j].date <= moment().format('yyyy-MM-DD')) {
                if (props.lessonsData[j].lecture.id == props.enrollsData[i].lecture.id) {
                    num_classes[i] += 1;
                }
            }
        }
        for (var k = 0; k < props.attendancesData.length; k++) {
            if (props.attendancesData[k].lesson.lecture.id == props.enrollsData[i].lecture.id) {
                if (props.attendancesData[k].attend) {
                    num_attends[i] += 1;
                } else {
                    num_absents[i] += 1;
                }
            }
        }
    }

    const attends = num_attends.reduce((a, b) => a + b, 0)
    const absents = num_absents.reduce((a, b) => a + b, 0)
    const blanks = num_classes.reduce((a, b) => a + b, 0) - num_attends.reduce((a, b) => a + b, 0) - num_absents.reduce((a, b) => a + b, 0)
    const attendRate = parseInt(Math.round(attends / (attends + absents + blanks) * 100))
   
    return (
        <div>            
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className='mb-3'>
                            <div className="fw-semibold font-size-14 mb-2">출석현황</div>
                            <AChart height={300} options={{
                                colors: ["#20E647"],
                                plotOptions: {
                                    radialBar: {
                                        hollow: {
                                            margin: 0,
                                            size: "70%",
                                            background: "#293450"
                                        },
                                        track: {
                                            dropShadow: {
                                                enabled: true,
                                                top: 2,
                                                left: 0,
                                                blur: 4,
                                                opacity: 0.15
                                            }
                                        },
                                        dataLabels: {
                                            name: {
                                                offsetY: -10,
                                                color: "#fff",
                                                fontSize: "13px"
                                            },
                                            value: {
                                                color: "#fff",
                                                fontSize: "30px",
                                                show: true
                                            }
                                        }
                                    }
                                },
                                fill: {
                                    type: "gradient",
                                    gradient: {
                                        shade: "dark",
                                        type: "vertical",
                                        gradientToColors: ["#87D4F9"],
                                        stops: [0, 100]
                                    }
                                },
                                labels: ["출석률"]
                            }}
                                series={[attendRate]}
                                type='radialBar' />

                            <div className="table-responsive">
                                <table className="table table-sm table-dark w-100 table-bordered">
                                    <thead>
                                        <tr>
                                            <th>강의</th>
                                            <th>출석</th>
                                            <th>결석</th>
                                            <th>미기입</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {class_names.map((name, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{name}</td>
                                                    <td>{num_attends[index]}</td>
                                                    <td>{num_absents[index]}</td>
                                                    <td>{num_classes[index] - num_attends[index] - num_absents[index]}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr className="text-warning fw-semibold">
                                            <td>총계</td>
                                            <td>{attends}</td>
                                            <td>{absents}</td>
                                            <td>{blanks}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceStatusCard