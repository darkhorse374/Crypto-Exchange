import {useEffect,useState,useRef} from "react";
import { Select, Tooltip } from 'antd';

import './index.css';

const { Option, OptGroup } = Select;

function SelectComponent(props) {
    const { optionList, groupName, defaultValue, onChange } = props;
    const handleChange = (value) => {
        onChange(value);
    }

    return (
        <Select className="w-full h-full custom-select" defaultValue={!defaultValue ? optionList[0].value : defaultValue} onChange={!groupName && handleChange}>
            {
                !groupName
                    ? optionList.map((option, index) => <Option key={index} value={option.value}>{option.name}</Option>)
                    : <OptGroup label={groupName}>
                        {optionList.map((option, index) => 
                            option.url && 
                                <Option key={index} value={option.value}>
                                    <Tooltip placement="right" title={option.url}><a href={option.url} target="_blank">{option.name}</a></Tooltip>
                                </Option>
                        )}
                    </OptGroup>
            }
        </Select>
  );
}

export default SelectComponent;
