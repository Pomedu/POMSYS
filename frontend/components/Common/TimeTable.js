import dynamic from 'next/dynamic';
import React from 'react';

const TuiCalendar = dynamic(() => import('./TuiCalendar'), {
    ssr: false
});

const TimeTable = React.forwardRef((props, ref) => {
	return (
        <TuiCalendar  
        forwardedRef={ref}
        {...props}/>
    );
})

export default TimeTable