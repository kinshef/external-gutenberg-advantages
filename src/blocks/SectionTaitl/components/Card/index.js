import { Fragment } from "@wordpress/element";
import "./style.scss";

const TitleBlock = ({ textTaitl, fontColor, fontWeight, lineHeight, letterSpacing, fontStyle, fontSize, margin, padding, background, textAlign, display, fontFamily }) => {
	let validationHex = function(a){
		return a[0] === '#' 
			? a 
			: "#"+a;
	}
	let MPValidation = function(value, validation) {
		if(value && validation){
			var a = value.split(' ').map(e => {
				if(Number.isNaN(parseFloat(e)) !== Number.isNaN(NaN)){
					return parseFloat(e)+'px ';
				}
			}).join('');
			return  a;
		}else{
			return value;
		}
	}
	return <div 
		style={{
			fontFamily: `"${fontFamily.fontFamilyName}", sans-serif`,
			margin: MPValidation(margin.margin, margin.validation),
			padding: MPValidation(padding.padding, padding.validation),
			backgroundColor: (
				background.validation == 'color'
					? validationHex(background.bgColor)
					: ''
			),
			backgroundImage: `url('${(
				background.validation == 'img'
					? background.bgImg
					: ''
			)}')`,
			color: validationHex(fontColor),
			fontSize: fontSize+"px", 
			fontWeight: fontWeight,
			lineHeight: lineHeight,
			letterSpacing: letterSpacing+"px",
			fontStyle: fontStyle,
			display: display,
			textAlign: textAlign,
		}}
	>{textTaitl}</div>
}

export const Card = {
	TitleBlock: TitleBlock,
}
