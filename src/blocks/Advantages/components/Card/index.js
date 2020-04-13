import { Fragment } from "@wordpress/element";
import './style.scss';


const BootstrapContainer = ({ children, bootstrapGrid }) => {
	if(bootstrapGrid){
		return <div className='container'>{children}</div>
	} else {
		return children
	}
}

const BootstrapRow = ({ children, bootstrapGrid }) => {
	if(bootstrapGrid){
		return <div className='row'>
			{children}
		</div>
	} else {
		return children
	}
}

const BootstrapCol = ({ children, bootstrapGrid }) => {
	if(bootstrapGrid){
		return <div className='col'>
			{children}
		</div>
	} else {
		return children
	}
}



// const buildSectionCol = ({ advantagesItems, maxColToRow, advantagesItemString, booleanImg }) => {
// 	return Object.keys(advantagesItems).map(e => {
// 		return <div className='col' style={{minWidth: Math.round(100/maxColToRow)+'%'}}>
// 		{Object.keys(advantagesItems[e]).map(i => {
// 			if(i === advantagesItemString){
// 				if(booleanImg){
// 					return <div className={i+'-wrap'}>
// 						<img src={advantagesItems[e][i]}></img>
// 					</div>
// 				}else{
// 					return <div className={i}>
// 						{advantagesItems[e][i]}
// 					</div>
// 				}
// 			}
// 		})}
// 		</div>
// 	})
// }


const BuildSectionContent = ({ activeItem, advantagesItemString, booleanImg }) => {
	return Object.keys(activeItem).map(i => {
		if(i === advantagesItemString){
			if(booleanImg){
				return <div className={i+'-wrap'}>
					<img src={activeItem[i]}></img>
				</div>
			}else{
				return <div className={i}>
					{activeItem[i]}
				</div>
			}
		}
	})
}

const BuildSectionCol = ({ advantagesItems, maxColToRow }) => {
	return Object.keys(advantagesItems).map( e => {
		return <div className='col' style={{minWidth: Math.round(100/maxColToRow)+'%'}}>
			<BuildSectionContent activeItem={advantagesItems[e]} advantagesItemString ='advantagesTaitl'/>
			<BuildSectionContent activeItem={advantagesItems[e]} advantagesItemString ='advantagesSubtitle'/>
			<BuildSectionContent activeItem={advantagesItems[e]} advantagesItemString ='sectionImg' booleanImg/>
		</div>
	})
}

export const Card = {
	BootstrapContainer: BootstrapContainer,
	BootstrapRow: BootstrapRow,
	BootstrapCol: BootstrapCol,
	BuildSectionCol: BuildSectionCol,
}