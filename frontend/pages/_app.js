import React from 'react'
import AdminLayout from '../components/Layouts/AdminLayout';
import ClientLayout from '../components/Layouts/ClientLayout';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import "../styles/clientside.css";
import 'swiper/css'; 
import { Provider } from 'react-redux';
import wrapper from '../store/configureStore';
import NoneLayout from '../components/Layouts/NoneLayout';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }) => {
    const queryClient = new QueryClient();
    const layouts = {
        L1: AdminLayout,
        L2: ClientLayout,
        L3: NoneLayout
    };
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
