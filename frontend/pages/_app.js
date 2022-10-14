import React from 'react'
import AdminLayout from '../components/Layouts/AdminLayout';
import ClientLayout from '../components/Layouts/ClientLayout';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"
import "../components/Footers/Footer.css"
import "../styles/globals.css"
import { Provider } from 'react-redux';
import wrapper from '../store/configureStore';

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
