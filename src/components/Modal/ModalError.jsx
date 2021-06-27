import { Divider, List, ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import {Link} from 'react-router-dom'
import { Button } from "@material-ui/core";
import { Backdrop, Modal, Paper, Typography } from "@material-ui/core"
import { CardMedia } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';

import useStyles from './styles'

const ModalError = ({ products }) => {
    const classes = useStyles()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={true}
            // onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={true}>
                <main className={classes.layout}>

                    <Paper className={classes.paper}>
                        <Typography variant="h4" align="center">สินค้ามีจำนวนจำกัด</Typography>
                        {/* <h2 id="transition-modal-title">Transition modal</h2>
                    <p id="transition-modal-description">react-transition-group animates me.</p> */}
                        <Typography variant="h6" gutterBottom>
                            {/* Order summary */}
                        </Typography>
                        <List disablePadding>
                            {products.map(product => (
                                <ListItem style={{ padding: '10px 0' }} key={product.id}>
                                    <CardMedia
                                        className={classes.media}
                                        image={product.media.source}
                                        title="Contemplative Reptile"
                                    />
                                    <ListItemText primary={product.name} />
                                    {product.inventory.available > 0 ? (
                                        <Typography variant="body2">{`จำนวนคงเหลือ ${product.inventory.available}`}</Typography>
                                    ) : (
                                        <Typography color='error' variant="body1">สินค้าหมด</Typography>
                                    )}
                                </ListItem>
                            )
                            )}
                        </List>
                        <br/>
                        <Divider/>
                        <br />
                        <Typography variant="body2">ทางเราจะปรับจำนวนสินค้าให้กับคุณลูกค้าทันที</Typography>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button component={Link} to="/" variant="outlined">กลับไปที่หน้าหลัก</Button>
                            {/* <Button type="submit" variant="contained" color="primary">Next</Button> */}
                        </div>
                    </Paper>
                </main>

            </Fade>
        </Modal>
    )
}
export default ModalError
