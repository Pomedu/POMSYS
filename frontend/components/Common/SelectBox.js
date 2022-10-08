const SelectBox = (props) => {
	return (
		<select className="form-control" value={props.value} name={props.name} onChange={event => props.index?props.onChange(event, props.index):props.onChange(event)}>
			<option>옵션을 선택하세요</option>
            {props.options.map((option) => (
				<option
                    key={option.value}
					value={option.value}
				>
					{option.name}
				</option>
			))}
		</select>
	);
};

export default SelectBox