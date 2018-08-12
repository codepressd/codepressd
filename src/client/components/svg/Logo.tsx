import * as React from 'react';

interface ILogo {
    width?: number;
    height?: number;
    fontSize: string;
    fillColor?: string;
}

export const Logo: React.SFC<ILogo> = props => {
    const { height, width, fontSize } = props;
    return (
        <svg width={`${width ? width.toString() + "px" : "282px"}`} height={`${height ? height.toString() + "px" : "254px"}`} viewBox={`0 0 ${width ? width : 282} ${height ? height : 254}`} version="1.1" >

            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <text id="Codepressd" transform="translate(139.500000, 125.500000) rotate(-6.000000) translate(-139.500000, -125.500000) " fontFamily="Kylets-Demo, Kylets" fontSize={fontSize ? fontSize : "80"} fontWeight="normal" letterSpacing="-0.2545455" fill="#464546">
                    <tspan x="0.16725875" y="140">Codepressd</tspan>
                </text>
                <text id="UX-+UI-DEVELOPMENT" fontFamily="Avenir-Book, Avenir" fontSize="10" fontWeight="normal" letterSpacing="-0.231405" fill="#464546">
                    <tspan x="130.737645" y="178">UX +UI DEVELOPMENT</tspan>
                </text>
                <path d="M29.7250351,164.304606 C30.0440204,165.383427 30.3783363,166.455668 30.7277305,167.521076 C45.8623711,213.671152 89.2890008,247 140.5,247 C202.517444,247 253.118606,198.121089 255.88121,136.785543 C255.923309,135.850869 255.954299,134.913301 255.97405,133.97297 M251.847913,92.7000167 C251.40869,91.1086242 250.936265,89.5310068 250.43143,87.9679566 C235.444014,41.5644804 191.891709,8 140.5,8 C94.6189167,8 54.9861678,34.7523002 36.3495282,73.5091258 C35.7712011,74.711817 35.2130926,75.9260681 34.6756434,77.1514385" id="logo-circle" stroke="#464546" strokeWidth="3" strokeLinecap="round"></path>
                <path d="M22.9136741,164.960507 C37.7997403,215.838573 84.810112,253 140.5,253 C208.154882,253 263,198.154882 263,130.5 M258.666376,91.088437 C244.45633,39.16222 196.934797,1 140.5,1 C89.3963759,1 45.6015545,32.2927043 27.2319564,76.7616923 C26.8235822,77.7502814 26.4277737,78.7453825 26.0447297,79.7467964" id="logo-circle-copy" stroke="#8E8E8E" strokeLinecap="round"></path>
            </g>
        </svg>
    )
}