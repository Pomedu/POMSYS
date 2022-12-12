import dynamic from 'next/dynamic'
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AChart = (props) => {
	return (
        <ApexChart 
        {...props}/>
    );
}

export default AChart