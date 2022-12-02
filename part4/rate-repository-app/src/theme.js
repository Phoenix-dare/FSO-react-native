import { Platform } from "react-native";

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      danger:'#f32013'
    },
    fontSizes: {
      heading:18,
      body: 15,
      bodysmall:13,
      subheading: 16,
    },
    fonts:{
        specific: Platform.select({
          android: 'Roboto',
          ios: 'Arial',
          default: 'System',
        }),
      },
      
    fontWeights: {
      lean:'200',
      normal: '400',
      bold:'550',
      extrabold: '700',
    },
    highLights:{
      
    }
  };
  
  export default theme;