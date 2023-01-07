import AChart from "../../Common/AChart";
import moment from "moment";
import "moment/locale/ko"

const TestScoresStatusCard = (props) => {
    
    return (
        <div>            
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className='mb-3'>
                        <div className="fw-semibold font-size-14 mb-2" style={{ color: "#5CB8E4" }}>테스트 점수</div>
                            <AChart
                                options={{
                                    plotOptions: {
                                        bar: {
                                            horizontal: true,
                                        }
                                    },
                                    colors: ['#00E396'],
                                    dataLabels: {
                                        formatter: function (val, opt) {
                                            const goals =
                                                opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                                                    .goals

                                            if (goals && goals.length) {
                                                return `${val} / ${goals[0].value}`
                                            }
                                            return val
                                        }
                                    },
                                    legend: {
                                        show: true,
                                        showForSingleSeries: true,
                                        customLegendItems: ['실제점수', '평균'],
                                        markers: {
                                            fillColors: ['#00E396', '#775DD0']
                                        }
                                    },
                                }}
                                series={[{
                                    name: "실제점수",
                                    data: [
                                        {
                                            x: '2011',
                                            y: 12,
                                            goals: [{
                                                name: '평균',
                                                value: 14,
                                                strokeWidth: 5,
                                                strokeHeight: 10,
                                                strokeColor: '#775DD0'
                                            }]
                                        },
                                        {
                                            x: '2012',
                                            y: 44,
                                            goals: [{
                                                name: '평균',
                                                value: 54,
                                                strokeWidth: 5,
                                                strokeHeight: 10,
                                                strokeColor: '#775DD0'
                                            }]
                                        }
                                    ]
                                }]}
                                type='bar' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestScoresStatusCard