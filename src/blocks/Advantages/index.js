// Import external components
import Controls from './components/Controls'
import { Card } from './components/Card'
import './style.scss';


const { __ } = wp.i18n // Import __() from wp.i18n
const { registerBlockType } = wp.blocks // Import registerBlockType() from wp.blocks
import { Fragment } from '@wordpress/element'
const { InnerBlocks } = wp.blockEditor


// registerBlockType('gutenberg-advantages/build-section-col', {
//   title: __('Build Section'),
//   category: 'common',
//   attributes: {
//     advantagesItems: {
//       type: 'Object',
//       default: {}
//     },
//     maxColToRow: {
//       type: 'number',
//       default: 2,
//     },
//     imgAndIcon: {
//       type: 'string',
//       default: 'ICON',
//     },
//   },
//   edit: ({attributes}) => {
//     const BuildSectionContent = ({ activeItem, advantagesItemString, type }) => {
//       return Object.keys(activeItem).map(i => {
//         if(i === advantagesItemString){
//           switch(type) {
//             case 'text':
//               return <div className={i}>
//                 {activeItem[i]}
//               </div>
//             case 'img':
//               return <div className={i+'-wrap'}>
//                 <img src={activeItem[i]}></img>
//               </div>
//             case 'icon':
//               return <div className={i+'-wrap'}>
//                 <i class={"fa-4x fa-fw "+activeItem[i]} aria-hidden="true"></i>
//               </div>
//             default:
//               return <div> Error </div>
//           }
//         }
//       })
//     }
//     return <div className={'row'}>
//       {Object.keys(attributes.advantagesItems).map( e => {
//         return <div className='col' style={{minWidth: Math.round(100/attributes.maxColToRow)+'%'}}>
//           <div className='advantages-item'>
//             <BuildSectionContent activeItem={attributes.advantagesItems[e]} advantagesItemString ='advantagesTaitl' type='text'/>
//             <BuildSectionContent activeItem={attributes.advantagesItems[e]} advantagesItemString ='advantagesSubtitle' type='text'/>
//             {attributes.imgAndIcon === 'IMG'
//               ? <BuildSectionContent activeItem={attributes.advantagesItems[e]} advantagesItemString ='sectionImg' type='img'/>
//               : <BuildSectionContent activeItem={attributes.advantagesItems[e]} advantagesItemString ='advantagesIcon' type='icon'/>
//             }
//           </div>
//         </div>
//       })}
//     </div>
//   },
//   save: ({attributes}) => {
//     const BuildSectionContent = ({ activeItem, advantagesItemString, type }) => {
//       return Object.keys(activeItem).map(i => {
//         if(i === advantagesItemString){
//           switch(type) {
//             case 'text':
//               return <div className={i}>
//                 {activeItem[i]}
//               </div>
//             case 'img':
//               return <div className={i+'-wrap'}>
//                 <img src={activeItem[i]}></img>
//               </div>
//             case 'icon':
//               return <div className={i+'-wrap'}>
//                 <i class={"fa-4x fa-fw "+activeItem[i]} aria-hidden="true"></i>
//               </div>
//             default:
//               return <div> Error </div>
//           }
//         }
//       })
//     }
//     return <div className={'row'}>
//       {Object.keys(attributes.advantagesItems).map( e => {
//         return <div className='col' style={{minWidth: Math.round(100/attributes.maxColToRow)+'%'}}>
//           <div className='advantages-item'>
//             <BuildSectionContent activeItem={attributes.advantagesItems[e]} advantagesItemString ='advantagesTaitl' type='text'/>
//             <BuildSectionContent activeItem={attributes.advantagesItems[e]} advantagesItemString ='advantagesSubtitle' type='text'/>
//             {attributes.imgAndIcon === 'IMG'
//               ? <BuildSectionContent activeItem={attributes.advantagesItems[e]} advantagesItemString ='sectionImg' type='img'/>
//               : <BuildSectionContent activeItem={attributes.advantagesItems[e]} advantagesItemString ='advantagesIcon' type='icon'/>
//             }
//           </div>
//         </div>
//       })}
//     </div>
//   }
// })

registerBlockType('gutenberg-advantages/advantages', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('Advantages'), // Block title.
  icon: 'cart', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'Guttenberg Advantages', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [__('Advantages')],
  attributes: {
    imgAndIcon: {
      type: 'string',
      default: 'ICON',
    },
    colAdvantages: {
      type: 'number',
      default: 3,
    },
    maxColToRow: {
      type: 'number',
      default: 2,
    },
    bootstrapGrid: {
      type: 'bool',
      default: true,
    },
    advantagesItems: {
      type: 'Object',
      default: {}
    },
  },
  
  edit: ({ attributes, setAttributes, className }) => {
    // const setInnerBlock = (arr, gutenBlock) => {
    //   let arrey = [];
    //   arr.map( () => {
    //     typeof(gutenBlock) === "string"
    //       ? arrey.push([gutenBlock])
    //       : arrey.push([...gutenBlock])
    //   })
    //   return <InnerBlocks
    //       templateLock='all'
    //       templateInsertUpdatesSelection={false}
    //       template={arrey}
    //     />
    // }
    return <Fragment>
      <Controls attributes={attributes} setAttributes={setAttributes} />
      <section id='section_advantages' 
        additionalClasses={attributes.className ? attributes.className : ''} 
        className= {className+' section_advantages text-center'}
        preventClick={true}
      >
        <Card.BootstrapContainer bootstrapGrid={attributes.bootstrapGrid}>
          <Card.BootstrapRow bootstrapGrid={attributes.bootstrapGrid}>
            <Card.BootstrapCol bootstrapGrid={attributes.bootstrapGrid}>
              <InnerBlocks />
            </Card.BootstrapCol>
          </Card.BootstrapRow>
          {/* {setInnerBlock(Object.keys(attributes.advantagesItems), 'gutenberg-advantages/section-taitl')} */}
          {/* {setInnerBlock(Object.keys(attributes.advantagesItems), [
            'gutenberg-advantages/build-section-col',
            {
              imgAndIcon: attributes.imgAndIcon,
              advantagesItems: attributes.advantagesItems,
              maxColToRow: attributes.maxColToRow
            }
          ])} */}
          {Object.keys(attributes.advantagesItems).length 
          ? <Card.BootstrapRow bootstrapGrid={attributes.bootstrapGrid}>
              <Card.BuildSectionCol imgAndIcon={attributes.imgAndIcon} advantagesItems={attributes.advantagesItems} maxColToRow={attributes.maxColToRow} />
            </Card.BootstrapRow>
            : <div>Заполните хотя-бы одну секцию</div>}
        </Card.BootstrapContainer>
      </section>
    </Fragment>
  },
  save: ({ attributes, className }) => (
    <section id='section_advantages'
      additionalClasses={attributes.className ? attributes.className : ''}
      className= {className+' section_advantages text-center'}
    >
      <Card.BootstrapContainer bootstrapGrid={attributes.bootstrapGrid}>
        <Card.BootstrapRow bootstrapGrid={attributes.bootstrapGrid}>
          <Card.BootstrapCol bootstrapGrid={attributes.bootstrapGrid}>
            <InnerBlocks.Content />
          </Card.BootstrapCol>
        </Card.BootstrapRow>
        {Object.keys(attributes.advantagesItems).length
          ? <Card.BootstrapRow bootstrapGrid={attributes.bootstrapGrid}>
              <Card.BuildSectionCol imgAndIcon={attributes.imgAndIcon} advantagesItems={attributes.advantagesItems} maxColToRow={attributes.maxColToRow} />
            </Card.BootstrapRow>
          : <div>Заполните хотя-бы одну секцию</div>}
      </Card.BootstrapContainer>
    </section>
  ),
})
