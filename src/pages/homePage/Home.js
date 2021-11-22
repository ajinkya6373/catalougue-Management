import { useEffect, useState } from 'react'
import { Topbar, CardComponent, PieChart } from '../../components'
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useStateValue } from '../../context/productContext';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import "./home.css"

export default function Home() {
    const [{ products }, dispatch] = useStateValue();
    const [open, setOpen] = useState(false);
    const [allProducts, setAllProducts] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        const fetchProduct = async () => {
            await axios.get("https://fakestoreapi.com/products").then((res) => {
                dispatch({ type: "SET_PRODUCTS", payload: res.data })
                setAllProducts(res.data);
            })
        }
        fetchProduct();
    }, [dispatch])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div >
            <Topbar />
            <div style={{ marginLeft: "15px", marginRight: "15px" }}>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                      products.length !==0? products?.map((p) => {
                            return <Grid item xs={2} sm={4} md={4} key={p.id}>
                                <CardComponent data={p} />
                            </Grid>
                        })
                        :
                         <h1 
                        style={{top:"60px",position:"relative",margin:"auto"}} >No result found 😕</h1>
                    }
                </Grid>
            </div>
            <Fab variant="extended" color="primary" aria-label="add"
                onClick={handleOpen}
                sx={{ position: "fixed", top: "590px", right: "38px", borderRadius: "5px" }}>
                ANALYSE

            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <PieChart allProducts={allProducts} />
                </Box>
            </Modal>
        </div>
    )
}
