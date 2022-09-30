import React, { useEffect, useState } from 'react';
import AdminNavbar from '../Navbars/AdminNavbar';
import AdminTopbar from '../Navbars/AdminTopbar';


const AdminLayout = ({ children }) => {
    // 모바일,PC 확인
    function useWindowSize() {
        // Initialize state with undefined width/height so server and client renders match
        // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
        const [windowSize, setWindowSize] = useState();

        useEffect(() => {
            // only execute all the code below in client side
            if (typeof window !== 'undefined') {
                // Handler to call on window resize
                function handleResize() {
                    // Set window width/height to state
                    setWindowSize(window.innerWidth);
                }

                // Add event listener
                window.addEventListener("resize", handleResize);

                // Call handler right away so state gets updated with initial window size
                handleResize();

                // Remove event listener on cleanup
                return () => window.removeEventListener("resize", handleResize);
            }
        }, []); // Empty array ensures that effect is only run on mount
        return windowSize;
    }

    const windoWidth = useWindowSize();
    const isMobile = windoWidth <= 992;

    const [sidebarisOpen, setSidebar] = useState(true); //

    useEffect(() => {
        if (isMobile) {
            if (sidebarisOpen) {
                document.querySelector("body").className = ("sidebar-enable")
            } else {
                document.querySelector("body").className = ("")
            }
        } else {
            if (sidebarisOpen) {
                document.querySelector("body").className = ("")
            } else {
                document.querySelector("body").className = ("sidebar-enable vertical-collpsed")
            }
        }

    }, [sidebarisOpen, isMobile] );

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
    </div>
);
};

export default AdminLayout