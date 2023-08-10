import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import styled from "styled-components";


export const CustomSelect = styled(Select).attrs((props) => ({
    MenuProps: {
        sx: {
            maxHeight: "50%",
            borderRadius: "6px",
            "& .MuiPaper-root": {
                borderRadius: "6px",
            },
            "& .MuiMenu-list": {
                color: "white",
                backgroundColor: "black",
                padding: "0px !important",
                "& .MuiMenuItem-root": {
                    minHeight: "30px !important",
                },
            },
        },
    },
}))`
  width: 100%;
  padding: 0.2rem;
  margin-bottom: 6px;
  width: ${({ width }) => (width ? width : "")};
  flex: 1;
  height: 30px;
  font-size: 0.9rem !important;
  font-weight: 400 !important;
  border-radius: 12px !important;
  border: 1px solid #ffbd39;
  background-color: ${({ bg }) => (bg ? bg : "black")};
  box-shadow: none;
  outline: none;
  & fieldset {
    border: 1px solid #ffbd39!important;
  }
`;

export default function MultiSelectDropdown({ selected, tags }) {
    const [tagName, setTagName] = useState(selected || []);
    const [showFilter, setShowFilter] = useState(false);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setTagName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleFilter = () => {
        if (tagName.length > 0) {
            const newUrl = `/blogs/?tag=${tagName.join(',')}`;
            window.location.replace(newUrl)
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }

    const handleClear = () => {
        const newUrl = `/blogs/`;
        window.location.replace(newUrl)
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    }

    useEffect(() => {
        if (selected.length > 0) {
            setShowFilter(true);
        }
    }, [])

    return (
        <>
            {showFilter ?
                <div className='flex-fill d-flex flex-column flex-md-row justify-content-sm-center align-items-md-end align-items-center'>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <h5>Tags</h5>
                        <CustomSelect
                            multiple
                            value={tagName}
                            onChange={handleChange}
                            renderValue={(selected) => selected.join(', ')}
                            displayEmpty
                            SelectDisplayProps={{
                                style: {
                                    color: "white",
                                }
                            }}
                        >
                            <MenuItem
                                disabled
                                value=""
                                sx={{
                                    backgroundColor: "white !important",
                                    display: "none",
                                }}
                            >
                                Tags
                            </MenuItem>
                            {tags.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox sx={{
                                        '&.Mui-checked': {
                                            color: "#ffbd39",
                                        },
                                    }} checked={tagName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </CustomSelect>
                    </FormControl>
                    <div className='d-flex justify-content-around mb-3'>
                        <a onClick={handleFilter} className="btn m-1 btn-primary py-3 px-5">
                            Filter
                        </a>
                        <a onClick={handleClear} className="btn m-1 btn-primary py-3 px-5">
                            Clear
                        </a>
                    </div>
                </div> :
                <a onClick={() => {
                    setShowFilter(true);
                }} className="btn btn-primary p-3" style={{marginLeft:"5rem"}}>
                    + Add Filter
                </a>}
        </>
    );
}