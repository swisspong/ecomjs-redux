
import { Card, CardActions, CardContent } from '@material-ui/core'
import useStyles from './styles'
import React from 'react'

import { Skeleton } from '@material-ui/lab'

const LoadingProduct = () => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Skeleton animation="wave" variant="rect" className={classes.media} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Skeleton animation="wave" height={50} width="40%" />
                    <Skeleton animation="wave" height={50} width="40%" />
                </div>
                <Skeleton animation="wave" height={20} style={{ marginTop: 6 }} />
                <Skeleton animation="wave" height={20} width="80%" />
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Skeleton animation="wave" variant="circle" width={40} height={40} style={{ marginRight: '20px', marginBottom: '20px' }} />
            </CardActions>
        </Card>
    )
}

export default LoadingProduct
