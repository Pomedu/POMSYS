import * as Icons from "react-icons/bi";

const FileManagerCard = (props) => {

    const CustomFaIcon = ({ name }) => {
        const FaIcon = Icons[name];
        if (!FaIcon) return <></>;
      
        return <FaIcon />;
      };

    const clickHandler = () => {
        if(props.id){
            props.onClick(props.id);
        } else {    
            props.onClick();
        }
    }

    return (
        <div className="card shadow-none border" 
            style={props.selected==props.id?{ cursor: "pointer", backgroundColor:"rgba(116,120,141,.15)"}:{ cursor: "pointer"}} 
            onClick={clickHandler}>
            <div className="card-body p-3">
                <div className="d-flex justify-content-between">
                    <div className="avatar-xs m e-3 mb-3">
                        <div className="avatar-title bg-transparent rounded">
                            <i className="font-size-24" style={{color:props.iconColor}}><CustomFaIcon name={props.icon} /></i>
                        </div>
                    </div>
                    {props.selected==props.id?
                    <div className="">
                        <i className="font-size-24 text-success"><CustomFaIcon name="BiCheckCircle" /></i>
                    </div>:<></>}
                </div>
                <div className="d-flex">
                    <div className="overflow-hidden me-auto">
                        <h5 className="font-size-14 text-truncate mb-1"><a className="text-body">{props.title}</a></h5>
                        <p className="text-muted text-truncate mb-0">{props.subtitle}</p>
                    </div>
                    <div className="align-self-end ms-2">
                        <p className="text-muted mb-0 text-nowrap">{props.caption}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileManagerCard