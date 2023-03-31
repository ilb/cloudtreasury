import {Select} from "antd";

function filterOption(input, option) {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

const Search = ({ placeholder, value, options, onChange }) => {
  return (
    <Select
      showSearch
      optionFilterProp="children"
      filterOption={filterOption}
      value={value}
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      style={{ width: '100%', marginBottom: '15px' }}
    />
  );
}

export default Search;