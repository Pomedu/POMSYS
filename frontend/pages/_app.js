import React from 'react'
import AdminLayout from '../components/Layouts/AdminLayout';
import ClientLayout from '../components/Layouts/ClientLayout';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"
import "../components/Footers/Footer.css"
import "../components/Navbars/AdminTopbar.css"
import "../styles/globals.css"
import wrapper from '../store/configureStore';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();
const layouts = {
    L1: AdminLayout,
    L2: ClientLayout,
};


const MyApp = ({ Component, pageProps }) => {
    const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
    const { store, props } = wrapper.useWrappedStore(pageProps);
    return (
        <Provider store={store}>
            <Layout>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </Layout>
        </Provider>
    )
}

export default MyApp;
