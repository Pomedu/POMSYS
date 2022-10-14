import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from 'react';

const AdminNavbarMenuCollapse = (props) => {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const urls = [];
    if(props.submenu){
    for(let i=0;i<props.submenu.length;i++){
        urls.push(props.submenu[i].url);
    }}
    return (
        <li>
            <a className={urls.includes(router.pathname)? "mm-active waves-effect" : 'waves-effect'}
                onClick={()=>setMenuOpen(!menuOpen)}>
                <i><FontAwesomeIcon icon={Icons[props.icon]} /></i>
                <span>{props.name}</span>
            </a>
            <ul className={menuOpen?"sub-menu mm-collapse mm-show":"sub-menu mm-collapse"}>
                {props.submenu.map((menu,index)=> 
                    {return (
                        <Link href={menu.url} key={index}>
                            <li>
                                <a className={router.pathname === menu.url ? "mm-active waves-effect" : 'waves-effect'} 
                                    onClick={() => { props.isMobile ? props.setSidebar(true) : props.setSidebar(true) }}
                                    >
                                    {menu.menuName}
                                </a>
                            </li>
                        </Link>
                    )} 
                )}
            </ul>
        </li>
    );
};

export default AdminNavbarMenuCollapse