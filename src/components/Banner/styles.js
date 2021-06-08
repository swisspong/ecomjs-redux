import { makeStyles } from "@material-ui/core/styles";
import banner from './banner.jpg'

export default makeStyles((theme)=>({
  hero: {
      height:'100vh',
      width:'100%',
      backgroundImage:`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0)), url(${banner})`,
      backgroundPosition:'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize:'cover',
      position:'relative',
      display: 'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize:'4rem',
      color:'white',
      [theme.breakpoints.down('xs')]: {
        fontSize:'3rem',
        padding:'2rem'
      },
      
  },
  btn:{
    marginTop:'2rem'
  }  
}))