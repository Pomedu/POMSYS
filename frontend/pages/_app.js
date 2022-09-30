import React from 'react'
import AdminLayout from '../components/Layouts/AdminLayout';
import ClientLayout from '../components/Layouts/ClientLayout';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"
import "../components/Footers/Footer.css"
import "../components/Navbars/AdminTopbar.css"
import "../styles/globals.css"

const queryClient = new QueryClient();
const layouts = {
    L1: AdminLayout,
    L2: ClientLayout,
};


const MyApp = ({ Component, pageProps }) => {
    const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
    return (
        <Layout>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Layout>);

}

export default MyApp;