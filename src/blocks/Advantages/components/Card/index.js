import { Fragment } from "@wordpress/element";


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


const BuildSectionContent = ({ activeItem, advantagesItemString, type }) => {
	return Object.keys(activeItem).map(i => {
		if(i === advantagesItemString){
			switch(type) {
				case 'text':
					return <div className={i}>
						{activeItem[i]}
					</div>
				case 'img':
					return <div className={i+'-wrap'}>
						<img src={activeItem[i]}></img>
					</div>
				case 'icon':
					return <div className={i+'-wrap'}>
						<span class={"dashicons dashicons-"+activeItem[i]}></span>
					</div>
				default:
					return <div> Error </div>
			}
		}
	})
}

const BuildSectionCol = ({ advantagesItems, maxColToRow, imgAndIcon }) => {
	return Object.keys(advantagesItems).map( e => {
		return <div className='col' style={{minWidth: Math.round(100/maxColToRow)+'%'}}>
			<div className='advantages-item'>
				<BuildSectionContent activeItem={advantagesItems[e]} advantagesItemString ='advantagesTaitl' type='text'/>
				<BuildSectionContent activeItem={advantagesItems[e]} advantagesItemString ='advantagesSubtitle' type='text'/>
				{imgAndIcon === 'IMG'
					? <BuildSectionContent activeItem={advantagesItems[e]} advantagesItemString ='sectionImg' type='img'/>
					: <BuildSectionContent activeItem={advantagesItems[e]} advantagesItemString ='advantagesIcon' type='icon'/>
				}
			</div>
		</div>
	})
}

export const Card = {
	BootstrapContainer: BootstrapContainer,
	BootstrapRow: BootstrapRow,
	BootstrapCol: BootstrapCol,
	BuildSectionCol: BuildSectionCol,
}