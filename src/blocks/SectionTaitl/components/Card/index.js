import { Fragment } from "@wordpress/element";
import "./style.scss";

const Card = ({ data, className }) => {
	const {
		textTaitl,
		fontColor,
		fontWeight,
		lineHeight,
		letterSpacing,
		fontStyle,
		fontSize,
		margin,
		padding,
		background,
		display
	} = data;

	var validationHex = function(a){
		return a[0] === '#' 
			? a 
			: "#"+a;
	}
	var MPValidation = function(value, validation) {
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

	return (
		<div className={className}>
			<div 
				style={{
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
				}}
			>{textTaitl}</div>
		</div>
	);
};

export default Card;
