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
const liteBrown = "#9d8460";


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
        background: 'transparent',
        boxShadow: "none",
        color: slateColor,
        position: "absolute",
        "& > div": {
            justifyContent: "space-between",
            height: "120px",
            "& Button": {
                padding: "0",
                "&:hover": {
                    background: "transparent",
                    "& svg": {
                        transition: "all 250ms ease",
                        fill: liteBrown,
                    },
                    "& span": {
                        transition: "all 250ms ease",
                        color: liteBrown,
                    }
                }
            }
        },
        "& span": {
            color: slateColor,
            fontFamily: subText,
            fontWeight: 600,
            fontSize: "17px",
            "& svg": {
                marginRight: "5px",
            }
        }
    },
    logo: {
        cursor: "pointer",
        visibility: "hidden",
        transition: "opacity .8s ease",
        opacity: 0
    },
    visible: {
        visibility: "visible",
        opacity: 1
    },
    socialIcons: {
        display: "flex",
        width: "80px",
        justifyContent: "space-around",
        "& a": {
            fontSize: "24px",
            textDecoration: "none",
            color: slateColor,
            transition: "color 250ms ease",
            "&:hover": {
                color: liteBrown,
            }
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
            top: "80px",
            width: "103px",
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
        background: "#f6f5f3",
        transition: "opacity .8s ease",
        opacity: 1,
    },
    fade: {
        opacity: 0,
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

//////////////
// PROJECTS //
//////////////

export const projects = {
    wrap: {
        width: "100%"
    }
}

///////////
// ABOUT //
///////////

export const about = {
    wrap: {
        width: "100%"
    }
}
/////////////
// CONTACT //
/////////////

export const contact = {
    wrap: {
        width: "100%"
    }
}