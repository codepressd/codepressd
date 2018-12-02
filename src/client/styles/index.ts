import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { FormHelperText } from '@material-ui/core';

/**
 * This wraps our style objects in the format the withStyles needs for jss
 * @param styles
 */
export const wrapStyles = (styles: object) => (theme: Theme) => ({
    ...styles
});

//////////////////////
// Common Variables //
//////////////////////

const mainText = `'Bentham', serif`;
const subText = `'Hind Siliguri', sans-serif`;
const slateColor = '#464546';
const creamColor = '#f6f5f3';
const liteBrown = (opacity?: number) => `rgba(157,132,96, ${opacity ? opacity : 1})`;

const title = {
    color: slateColor,
    fontSize: '40px',
    fontFamily: mainText,
    margin: 0
};

const row = {
    display: 'flex',
    flexDirection: 'row'
};
const column = {
    display: 'flex',
    flexDirection: 'row'
};

////////////
// Header //
////////////

export const header = {
    '@global': {
        html: {
            background: creamColor,
            height: '100%'
        },
        body: {
            height: '100%',
            margin: '12px 8px 0 8px'
        }
    },
    wrap: {
        background: 'transparent',
        boxShadow: 'none',
        color: slateColor,
        position: 'absolute',
        '& > div': {
            justifyContent: 'space-between',
            height: '120px',
            '& Button': {
                padding: '0',
                '&:hover': {
                    background: 'transparent',
                    '& svg': {
                        transition: 'all 250ms ease',
                        fill: liteBrown()
                    },
                    '& span': {
                        transition: 'all 250ms ease',
                        color: liteBrown()
                    }
                }
            }
        },
        '& span': {
            color: slateColor,
            fontFamily: subText,
            fontWeight: 600,
            fontSize: '17px',
            '& svg': {
                marginRight: '5px'
            }
        }
    },
    logo: {
        cursor: 'pointer',
        visibility: 'hidden',
        transition: 'opacity .8s ease',
        opacity: 0
    },
    visible: {
        visibility: 'visible',
        opacity: 1
    },
    socialIcons: {
        display: 'flex',
        width: '80px',
        justifyContent: 'space-around',
        '& a': {
            fontSize: '24px',
            textDecoration: 'none',
            color: slateColor,
            transition: 'color 250ms ease',
            '&:hover': {
                color: liteBrown()
            }
        }
    }
};

//////////
// Menu //
//////////

export const Menu = {
    wrap: {
        width: '120px',
        '& > div': {
            top: '80px',
            width: '103px',
            background: 'transparent',
            border: 'none',
            alignItems: 'flex-end',
            '& > a': {
                fontFamily: subText,
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 600,
                color: slateColor,
                padding: '5px 0'
            }
        },
        menuItem: {
            fontFamily: subText,
            textTransform: 'uppercase',
            textDecoration: 'none'
        }
    }
};

///////////////
// Home Page //
///////////////

export const homePage = {
    wrap: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: `100vh`,
        width: '100%',
        background: '#f6f5f3',
        transition: 'opacity .8s ease',
        opacity: 1
    },
    fade: {
        opacity: 0
    },
    navButtons: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-around',
        margin: '60px 0',
        '& span': {
            fontSize: '18px'
        }
    },
    '@media (max-width: 600px)': {
        navButtons: {
            width: '100%'
        }
    }
};

//////////////
// PROJECTS //
//////////////

export const projects: Record<string, React.CSSProperties | Record<string, React.CSSProperties>> = {
    wrap: {
        display: 'grid',
        gridTemplateColumns:
            '[c-1] 10% [c-2] 10% [c-3] 10% [c-4] 10% [c-5] 10% [c-6] 10% [c-7] 10% [c-8] 10% [c-9] 10% [c-10] 10%',
        gridTemplateRows:
            '[r-1] 10% [r-2] 10% [r-3] 10% [r-4] 10% [r-5] 10% [r-6] 10% [r-7] 10% [r-8] 10% [r-9] 10% [r-10] 10%',
        width: '100%',
        height: '100vh'
    },
    mainImage: {
        width: '100%',
        height: `100%`,
        gridColumn: 'c-2/c-6',
        gridRow: 'r-3/r-10',
        '& img': {
            width: 'inherit'
        }
    },
    titleWrap: {
        gridColumn: 'c-7/c-10',
        gridRow: 'r-4/r-7',
        '& .title': {
            ...title
        },
        '& .description': {
            fontFamily: subText
        }
    },
    bottomBar: {
        display: 'grid',
        gridTemplateColumns:
            '[c-1] 10% [c-2] 10% [c-3] 10% [c-4] 10% [c-5] 10% [c-6] 10% [c-7] 10% [c-8] 10% [c-9] 10% [c-10] 10%',
        gridTemplateRows: '[r-1] 25% [r-2] 25% [r-3] 25% [r-4] 25%',
        gridColumn: 'c-1/spanc-10',
        gridRow: 'r-8/spanr-10',
        '& .leftWrap': {
            gridColumn: 'c-2/c-7',
            gridRow: 'r-1/spanr-4',
            '& .title': {
                fontSize: 20,
                fontWeight: 600,
                fontFamily: mainText,
                color: '#464546',
                margin: '10px 10px 10px 0',
                padding: '0 0 10px',
                borderBottom: `2px dashed ${liteBrown(0.3)}`
            },
            '& .details': {
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }
        },
        '& .rightWrap': {
            gridColumn: 'c-7/spanc-10',
            gridRow: 'r-1/spanr-4',
            borderTopLeftRadius: '8px',
            border: `2px dashed ${liteBrown(0.3)}`
        }
    },
    details: {
        width: '48%',
        '& .details-title': {
            fontWeight: 600,
            fontFamily: mainText,
            margin: '5px 0'
        },
        '& .list-wrap': {
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            '& .list-item': {
                width: '50%',
                fontSize: '14px',
                margin: '5px 0',
                fontFamily: subText
            }
        },
        '& .description-wrap': {
            fontSize: '14px',
            margin: '5px 0',
            fontFamily: subText
        }
    },
    rightContent: {
        width: '80%'
    }
};

///////////
// ABOUT //
///////////

export const about = {
    wrap: {
        width: '100%'
    }
};
/////////////
// CONTACT //
/////////////

export const contact = {
    wrap: {
        width: '100%'
    }
};
