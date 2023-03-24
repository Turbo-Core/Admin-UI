import { extendTheme } from '@mui/joy/styles';
import { Martel_Sans } from 'next/font/google';

const martel = Martel_Sans({ subsets: ["latin"], weight: "600" });

export default extendTheme({
    fontFamily: {
        display: martel.style.fontFamily,
        body: martel.style.fontFamily,
    }
});