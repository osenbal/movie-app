import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
}

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,

}

export const theme = extendTheme({ breakpoints, config });