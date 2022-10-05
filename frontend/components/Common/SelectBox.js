const SelectBox = (props) => {
	return (
		<select className="form-control" name={props.name} onChange={event => props.onChange(event)}>
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