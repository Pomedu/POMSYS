import moment from "moment";
import "moment/locale/ko"
import AChart from "../../Common/AChart";

const SalesRatioCard = (props) => {
    const mathLectures = [];
    props.teachersData.filter(teacher=>teacher.subject=='수학').map(teacher=>teacher.lectures.map(lecture=>mathLectures.push(lecture.id)));
    let mathSales = 0;
    props.enrollsData.filter(enroll=>mathLectures.includes(enroll.lecture.id)).map(enroll=> mathSales+=enroll.lecture.cost)
    const engLectures = [];
    props.teachersData.filter(teacher=>teacher.subject=='영어').map(teacher=>teacher.lectures.map(lecture=>engLectures.push(lecture.id)));
    let engSales = 0;
    props.enrollsData.filter(enroll=>engLectures.includes(enroll.lecture.id)).map(enroll=> engSales+=enroll.lecture.cost)
    const korLectures = [];
    props.teachersData.filter(teacher=>teacher.subject=='국어').map(teacher=>teacher.lectures.map(lecture=>korLectures.push(lecture.id)));
    let korSales = 0;
    props.enrollsData.filter(enroll=>korLectures.includes(enroll.lecture.id)).map(enroll=> korSales+=enroll.lecture.cost)
    const sciLectures = [];
    props.teachersData.filter(teacher=>teacher.subject=='과학').map(teacher=>teacher.lectures.map(lecture=>sciLectures.push(lecture.id)));
    let sciSales = 0;
    props.enrollsData.filter(enroll=>sciLectures.includes(enroll.lecture.id)).map(enroll=> sciSales+=enroll.lecture.cost)
    const socLectures = [];
    props.teachersData.filter(teacher=>teacher.subject=='사회').map(teacher=>teacher.lectures.map(lecture=>socLectures.push(lecture.id)));
    let socSales = 0;
    props.enrollsData.filter(enroll=>socLectures.includes(enroll.lecture.id)).map(enroll=> socSales+=enroll.lecture.cost)
    const essLectures = [];
    props.teachersData.filter(teacher=>teacher.subject=='논술').map(teacher=>teacher.lectures.map(lecture=>essLectures.push(lecture.id)));
    let essSales = 0;
    props.enrollsData.filter(enroll=>essLectures.includes(enroll.lecture.id)).map(enroll=> essSales+=enroll.lecture.cost)

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title mb-4">과목별 매출비중</h4>
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
                            series={[
                                { name: "수학", data: [mathSales] },
                                { name: "국어", data: [korSales] },
                                { name: "영어", data: [engSales] },
                                { name: "과학", data: [sciSales] },
                                { name: "사회", data: [socSales] },
                                { name: "논술", data: [essSales] },
                            ]}

                            type="bar"
                        />
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="mt-4">
                                <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-primary me-1"></i> 수학</p>
                                <h5>{Math.round(mathSales / 10000)}만원</h5>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mt-4">
                                <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-success me-1"></i> 국어</p>
                                <h5>{Math.round(korSales / 10000)}만원</h5>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mt-4">
                                <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-danger me-1"></i> 영어</p>
                                <h5>{Math.round(engSales / 10000)}만원</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="mt-4">
                                <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-primary me-1"></i> 과학</p>
                                <h5>{Math.round(sciSales / 10000)}만원</h5>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mt-4">
                                <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-success me-1"></i> 사회</p>
                                <h5>{Math.round(socSales / 10000)}만원</h5>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mt-4">
                                <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-danger me-1"></i> 논술</p>
                                <h5>{Math.round(essSales / 10000)}만원</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesRatioCard