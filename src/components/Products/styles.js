import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    toolbar:theme.mixins.toolbar,
    content:{
        flexGrow:1,
        backgroundColor:theme.palette.background.default,
        padding:theme.spacing(3),
        minHeight:'100vh'
    },
    root:{
        flexGrow: 1,
    },
    title:{
        textAlign: 'center'
    },
    spinner: {
        display: 'flex',
        minHeight:'100vh',
        flexGrow:1,
        justifyContent: 'center',
        alignItems: 'center',
      },
}))