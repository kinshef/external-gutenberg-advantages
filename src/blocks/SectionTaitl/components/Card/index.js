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
		return a[0] === '#' ? a : "#"+a;
	}
	var MPValidation = function(mp, validation) {
		if(mp && validation === 'true'){
			var a = mp.split(' ').map(e => {
				if(Number.isNaN(parseFloat(e)) !== Number.isNaN(NaN)){
					return parseFloat(e)+'px ';
				}
			}).join('');
			return  a;
		}else{
			return mp;
		}
	}
	var checkValue = function(value,what) {
		return background.validation == what ? value : '';
	}

	
	
	return (
		<div className={className}>
			<div style={{
				backgroundColor: checkValue(validationHex(background.bgColor), 'color'),
				backgroundImage: `url('${checkValue(background.bgImg, 'img')}')`,
				fontSize: fontSize+"px", 
				color: validationHex(fontColor), 
				fontWeight: fontWeight,
				lineHeight: lineHeight,
				letterSpacing: letterSpacing+"px",
				margin: MPValidation(margin.margin, margin.validation),
				padding: MPValidation(padding.padding, padding.validation),
				fontStyle: fontStyle,
				display: display,
			}}>{textTaitl}</div>
		</div>
	);
};

export default Card;
