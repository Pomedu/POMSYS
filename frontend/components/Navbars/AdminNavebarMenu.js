import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminNavbarMenu = (props) => {
    const router = useRouter();
    const CustomFaIcon = ({ name }) => {
        const FaIcon = Icons[name];
        if (!FaIcon) return <></>;
      
        return <FaIcon />;
      };
    return (
        <li>
            <Link href={props.url}>
                <a className={router.pathname === props.url ? "mm-active waves-effect" : 'waves-effect'}
                    onClick={() => { props.isMobile ? props.setSidebar(true) : props.setSidebar(true) }}
                >
                    <i><CustomFaIcon name={props.icon} /></i>
                    <span>{props.name}</span>
                </a>
            </Link>
        </li>
    );
};

export default AdminNavbarMenu