import React, { useEffect, useState } from 'react';
import AdminNavbar from '../Navbars/AdminNavbar';
import AdminTopbar from '../Navbars/AdminTopbar';
import Script from 'next/script'

const AdminLayout = ({ children }) => {
    // 모바일,PC 확인
    function useWindowSize() {

        const [windowSize, setWindowSize] = useState();

        useEffect(() => {

            if (typeof window !== 'undefined') {

                function handleResize() {

                    setWindowSize(window.innerWidth);
                }

                window.addEventListener("resize", handleResize);

                handleResize();


                return () => window.removeEventListener("resize", handleResize);
            }
        }, []);
        return windowSize;
    }

    const windoWidth = useWindowSize();
    const isMobile = windoWidth <= 992;

    const [sidebarisOpen, setSidebar] = useState(true); //

    useEffect(() => {
        if (isMobile) {
            if (sidebarisOpen) {
                document.querySelector("body").className = ("")
            } else {
                document.querySelector("body").className = ("sidebar-enable")
            }
        } else {
            if (sidebarisOpen) {
                document.querySelector("body").className = ("sidebar-enable")
            } else {
                document.querySelector("body").className = ("vertical-collpsed")
            }
        }

    }, [sidebarisOpen, isMobile]);

    return (
        <div>
            <AdminTopbar
                sidebarisOpen={sidebarisOpen}
                onChange={(isOpen) => setSidebar(isOpen)}
            />
            <AdminNavbar />
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {children}
                    </div>
                </div>
            </div>
            <Script src="/libs/simplebar/dist/simplebar.min.js" strategy="lazyOnload" />
            <Script src="/libs/node-waves/dist/waves.min.js" strategy="lazyOnload" />
        </div>
    );
};

export default AdminLayout