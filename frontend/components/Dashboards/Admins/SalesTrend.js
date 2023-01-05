import moment from "moment";
import "moment/locale/ko"
import AChart from "../../Common/AChart";

const SalesTrendCard = (props) => {   
    const monthList = [];
    const salesList = [];
    const subjectsList = [];
    for(var i=11; i>-2; i-- ){
        monthList.push(moment().subtract(i,"M").format('yyyy-MM'));
        salesList.push(0);
        subjectsList.push(0);
    }
    
    for(var i=0; i<monthList.length; i++ ){
        for(var j=0; j<props.enrollsData.length;j++){
            if(moment(props.enrollsData[j].joined_at).format('yyyy-MM')<=monthList[i]&&monthList[i]<=moment(props.enrollsData[j].lecture.end_date).format('yyyy-MM')){
                salesList[i] += props.enrollsData[j].lecture.cost;
                subjectsList[i] += 1;
            }
        }
    }

    const increased_rate = Math.round((salesList[11]-salesList[10])/salesList[10]*1000)/10;
    return (
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
                        height='250px'
                        options= {{   
                        chart :{
                                toolbar: {
                                    show:false
                                }
                            }                                         ,                             
                        xaxis: {
                            categories: monthList,
                            labels: {
                                formatter: function (value) {
                                    return moment(value).format('MM');
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
    );
};

export default SalesTrendCard