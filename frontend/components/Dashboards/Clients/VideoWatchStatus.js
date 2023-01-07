import AChart from "../../Common/AChart";
import moment from "moment";
import "moment/locale/ko"

const VideoWatchStatusCard = (props) => {
    // 영상 복습 관련
    const class_names = [];    
    const num_videos = [];
    const num_watch = [];
    const num_watchs = [];

    for (var i = 0; i < props.enrollsData.length; i++) {
        class_names.push(props.enrollsData[i].lecture.name)
        num_videos.push(0);
        num_watch.push(0);
        num_watchs.push(0);
        for (var j = 0; j < props.videoWatchRecordsData.length; j++) {
            if (props.videoWatchRecordsData[j].video.lesson.lecture == props.enrollsData[i].lecture.name) {
                num_videos[i] += 1;
                if (props.videoWatchRecordsData[j].clicked > 0) {
                    num_watch[i] += 1;
                    num_watchs[i] += props.videoWatchRecordsData[j].clicked
                }
            }
        }
    }

    const video_all = num_videos.reduce((a, b) => a + b, 0)
    const watch_all = num_watch.reduce((a, b) => a + b, 0)
    const watchs_all = num_watchs.reduce((a, b) => a + b, 0)
    const watchRate = parseInt(Math.round(watch_all / video_all * 100))

    return (
        <div>            
            <div className="card">
                <div className="card-body">
                    <div className="row">                     
                        <div className='mb-3'>
                            <div className="fw-semibold font-size-14 mb-2" style={{ color: "#A555EC" }}>영상복습 현황</div>
                            <AChart
                                height={300}
                                options={{
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
                                    labels: ["복습률"]
                                }}
                                series={[watchRate]}
                                type='radialBar' />
                            <div className="table-responsive">
                                <table className="table table-sm table-dark w-100 table-bordered">
                                    <thead>
                                        <tr>
                                            <th>강의</th>
                                            <th>영상</th>
                                            <th>복습완료</th>
                                            <th>평균 복습횟수</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {class_names.map((name, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{name}</td>
                                                    <td>{num_videos[index]}</td>
                                                    <td>{num_watch[index]}</td>
                                                    <td>{Math.round(num_watchs[index] / num_videos[index] * 10) / 10}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr className="text-warning fw-semibold">
                                            <td>총계</td>
                                            <td>{video_all}</td>
                                            <td>{watch_all}</td>
                                            <td>{Math.round(watchs_all / video_all * 10) / 10}</td>
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

export default VideoWatchStatusCard