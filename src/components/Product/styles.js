
import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    root:{
        maxWidth: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    cardActions:{
        display: 'flex',
        justifyContent: 'space-between'
    },
    cardContent:{
        display: 'flex',
        justifyContent: 'space-between'
    },
    wrapper:{
        position:'relative',
        // margin: theme.spacing(1)
    },
    fabProgress: {
        
        position: 'absolute',
        top: 2,
        left:3,
    
        zIndex: 2,
      }
}))
