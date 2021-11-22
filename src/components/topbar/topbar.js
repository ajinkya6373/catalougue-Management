import { useState, useEffect } from 'react'
import "./topbar.css"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import { useStateValue } from '../../context/productContext';
import Fuse from 'fuse.js'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Topbar() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [inputVlaue, setInputValue] = useState('');
    const [category, setCategory] = useState([]);
    const [allProducts, setAllproducts] = useState([]);
    const options = {
        isCaseSensitive: false,
        includeMatches: false,
        findAllMatches: false,
        keys: [
            "title",
        ]
    };
    const fuse = new Fuse(allProducts, options);
    const [, dispatch] = useStateValue();
    useEffect(() => {
        const fetchAllProducts = () => {
            axios.get("https://fakestoreapi.com/products").then((res) => {
                setAllproducts(res.data)
            })
        }
        fetchAllProducts();
    }, [])
    useEffect(() => {
        const fetchCategory = () => {
            axios.get("https://fakestoreapi.com/products/categories").then((res) => {
                setCategory(res.data)
            })
        }
        fetchCategory();
    }, [])


    useEffect(() => {
        const data = allProducts?.filter((p) => p.category === selectedCategory)
        dispatch({ type: "FILTER", payload: data })
    }, [selectedCategory, allProducts, dispatch])


    const changeHandler = (e) => {
        setInputValue(e.target.value);
        const data = fuse.search(inputVlaue)
        const newData = data.map((i) => i.item);
        dispatch({ type: "FILTER", payload: newData })
    }

    return (
        <div className="topbar">
            <div className="dropdown">
                <Box sx={{
                    backgroundColor: 'white',
                    color: "black",
                    ml: 0.1,
                    minWidth: 120,
                    margin: "2px 14px",
                    borderRadius: "4px",

                }}>
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label"
                            sx={{
                                color: 'black',
                                padding: "0px",
                                top: "-6px"
                            }}>
                            Category
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCategory}
                            label="select Category"
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            sx={{ padding: "0.1rem 0px", height: "42px" }}>
                            {
                                category.map((c) => {
                                    return <MenuItem value={c} key={c}>{c}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <Search sx={{ margin: "0px 41px" }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={changeHandler}
                />
            </Search>
        </div>
    )
}
