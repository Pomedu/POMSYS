const AttendanceCard = (props) => {
    var attendList = [];
    var absentList = [];
    if (props.attendees) {
        attendList = props.attendees.filter((item) => item.attend == true);
        absentList = props.attendees.filter((item) => item.attend == false)
    }
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-3 text-center">
                        <div className="text-success font-size-14 mb-2 no-line-break">출석</div>
                        <h3 className="text-success">{attendList.length}</h3>
                    </div>
                    <div className="col-3 text-center">
                        <div className="text-danger font-size-14 mb-2 no-line-break">결석</div>
                        <h3 className="text-danger">{absentList.length}</h3>
                    </div>
                    <div className="col-3 text-center">
                        <div className="font-size-14 mb-2 no-line-break">총원</div>
                        <h3 className="text-success">{props.totalStudent}</h3>
                    </div>
                    <div className="col-3 text-center">
                        <div className="text-warning font-size-14 mb-2 no-line-break">미기입</div>
                        <h3 className="text-warning">{props.totalStudent - attendList.length - absentList.length}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceCard