import { Fragment } from "@wordpress/element";
import './style.scss';





const BootstrapContainer = ({ children, bootstrapGridContainer }) => {
	if(bootstrapGridContainer){
		return <div className='container'>{children}</div>
	} else {
		return children
	}
}

const BootstrapRow = ({ children, bootstrapGrid }) => {
	if(bootstrapGrid){
		return <div className='row'>
			<div className="col-12 text-center">
				{children}
			</div>
		</div>
	} else {
		return children
	}
}



const buildSection = ({ advantagesItems, advantagesItemString, booleanImg }) => {
	// if(Object.keys(advantagesItems).length){
		var asdas = Object.keys(advantagesItems).map(e => {
			return <div className='col'>
				{Object.keys(advantagesItems[e]).map(i => {
					if(i === advantagesItemString){
						if(booleanImg){
							return <div className={i+'-wrap'}>
								<img src={advantagesItems[e][i]}></img>
							</div>
						}else{
							return <div className={i}>
								{advantagesItems[e][i]}
							</div>
						}
					}
				})}
			</div>
		})
		return <div className='row'>
			{asdas}
		</div>
	// }else{
	// 	return <div>Нет ниодного {advantagesItemString}</div>
	// }
}



// const buildSection = ({ advantagesItems }) => {
// 	if(Object.keys(advantagesItems).length){
// 		var asdas = Object.keys(advantagesItems).map(e => {
// 			return <div className='col'>
				
// 				{Object.keys(advantagesItems[e]).sort(s => {
// 					switch (s) {
						
// 					}
// 				})}

// 				{Object.keys(advantagesItems[e]).map(i => {
// 					switch (i) {
// 						case 'advantagesTaitl':
// 							return <div className={i}>
// 								{advantagesItems[e][i]}
// 							</div>
// 						case 'advantagesSubtitle':
// 							return <div className={i}>
// 								{advantagesItems[e][i]}
// 							</div>
// 						case 'sectionImg':
// 							return <div className={i+'-wrap'}>
// 								<img src={advantagesItems[e][i]}></img>
// 							</div>
// 					}
// 				})}
// 			</div>
// 		})
// 		return <div className='row'>
// 			{asdas}
// 		</div>
// 	}else{
// 		return <div>Заполните хотя-бы одну секцию</div>
// 	}
// }


export const Card = {
	BootstrapContainer: BootstrapContainer,
	BootstrapRow: BootstrapRow,
	buildSection: buildSection,
}