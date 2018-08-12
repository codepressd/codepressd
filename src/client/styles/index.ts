import { Theme } from "@material-ui/core/styles/createMuiTheme";

/**
 * This wraps our style objects in the format the withStyles needs for jss
 * @param styles
 */
export const wrapStyles = (styles: object) => (theme: Theme) => ({
    ...styles,
});

//////////////////////
// Common Variables //
//////////////////////

const mainText = `'Bentham', serif`;
const subText = `'Hind Siliguri', sans-serif`;
const slateColor = "#464546";
const creamColor = "#f6f5f3";


////////////
// Header //
////////////

export const header = {
    '@global': {
        html: {
            background: creamColor,
        }
    },
    wrap: {
        background: creamColor,
        boxShadow: "none",
        color: slateColor,
        position: "absolute",
        "& > div": {
            justifyContent: "space-between"
        },
        "& span": {
            color: slateColor,
            fontFamily: subText,
            fontWeight: 600,
            fontSize: "17px",
            "& svg": {
                marginRight: "5px"
            }
        }
    },
    socialIcons: {
        display: "flex",
        width: "120px",
        justifyContent: "space-around",
        "& a": {
            fontSize: "24px",
            textDecoration: "none",
            color: slateColor,
        }
    }
}

//////////
// Menu //
//////////

export const Menu = {
    wrap: {
        width: "120px",
        "& > div": {
            top: "60px",
            width: "108px",
            background: "transparent",
            border: "none",
            alignItems: "flex-end",
            "& > a": {
                fontFamily: subText,
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 600,
                color: slateColor,
                padding: "5px 0",
            }
        },
        menuItem: {
            fontFamily: subText,
            textTransform: "uppercase",
            textDecoration: "none",

        }
    }
}

///////////////
// Home Page //
///////////////

export const homePage = {
    wrap: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: `100vh`,
        width: "100%",
        background: "#f6f5f3"
    },
    navButtons: {
        display: "flex",
        flexDirection: "row",
        width: "50%",
        justifyContent: "space-around",
        margin: "60px 0",
        "& span": {
            fontSize: "18px"
        }
    },
    "@media (max-width: 600px)": {
        navButtons: {
            width: "100%"
        }
    }
}

