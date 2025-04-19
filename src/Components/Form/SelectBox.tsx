import React from 'react'
import Select from 'react-select'

type SelectOption = {
  value: string
  label: string
}

interface SelectBoxProps {
  value: SelectOption | null;
  options: SelectOption[]
  isDisabled?: boolean
  onChange: (option: SelectOption | null) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  value,
  options,
  isDisabled = false,
  onChange,
}) => {
  return (
  <Select options={options} value={value} isDisabled={isDisabled} onChange={onChange}/>
)}

export default SelectBox;