// Import external components
import { Card } from './components/Card'
import Controls from './components/Controls'

const { __ } = wp.i18n // Import __() from wp.i18n
const { registerBlockType } = wp.blocks // Import registerBlockType() from wp.blocks
import { Fragment } from '@wordpress/element'
const { InnerBlocks } = wp.blockEditor



registerBlockType('gutenberg-advantages/section-taitl', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('Section Taitl'), // Block title.
  icon: 'editor-bold', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'Guttenberg Advantages', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [__('Section'), __('Taitl')],
  attributes: {
    textTaitl: {
      type: 'string',
      default: 'Заголовок',
    },
    fontSize: {
      type: 'number',
      default: 16,
    },
    fontColor: {
      type: 'number',
      default: '000000',
    },
    lineHeight: {
      type: 'number',
      default: 1,
    },
    letterSpacing: {
      type: 'number',
      default: 0,
    },
    fontStyle: {
      type: 'text',
      default: 'normal',
    },
    fontWeight: {
      type: 'number',
      default: '100',
    },
    background: {
      type: 'object',
      default: {
        bgImg: '',
        bgColor: 'transparent',
        validation: 'img',
        repeat: 'repeat',
      },
    },
    margin: {
      type: 'object',
      default: {
        margin: '0px',
        validation: true,
      },
    },
    // innerBlock: {
    //   type: 'boolean',
    //   default: false,
    // },
    padding: {
      type: 'object',
      default: {
        padding: '0px',
        validation: false,
      },
    },
    fontFamily: {
      type: 'object',
      default: {
        fontFamilyUrl: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
        fontFamilyName: 'Roboto',
      },
    },
    display: {
      type: 'string',
      default:  'block',
    },
    textAlign: {
      type: 'string',
      default:  'center',
    },
  },
  edit: ({ attributes, setAttributes, className}) => (
    <Fragment>
      <Controls attributes={attributes} setAttributes={setAttributes} />
      <div additionalClasses={attributes.className ? attributes.className : ''} className= {className} preventClick={true}>
        <link href={attributes.fontFamily.fontFamilyUrl} rel="stylesheet"></link>
        <Card.TitleBlock 
          textTaitl={attributes.textTaitl}
          fontColor={attributes.fontColor}
          fontWeight={attributes.fontWeight}
          lineHeight={attributes.lineHeight}
          letterSpacing={attributes.letterSpacing}
          fontStyle={attributes.fontStyle}
          fontSize={attributes.fontSize}
          margin={attributes.margin}
          padding={attributes.padding}
          background={attributes.background}
          textAlign={attributes.textAlign}
          display={attributes.display}
          fontFamily={attributes.fontFamily}
        />
        {/* {attributes.innerBlock
          ? <InnerBlocks
              templateLock={false}
            />
          : null} */}
      </div>
    </Fragment>
  ),
  save: ({ attributes, className}) => (
    <div additionalClasses={attributes.className ? attributes.className : ''} className= {className}>
      <link href={attributes.fontFamily.fontFamilyUrl} rel="stylesheet"></link>
      <Card.TitleBlock 
        textTaitl={attributes.textTaitl}
        fontColor={attributes.fontColor}
        fontWeight={attributes.fontWeight}
        lineHeight={attributes.lineHeight}
        letterSpacing={attributes.letterSpacing}
        fontStyle={attributes.fontStyle}
        fontSize={attributes.fontSize}
        margin={attributes.margin}
        padding={attributes.padding}
        background={attributes.background}
        textAlign={attributes.textAlign}
        display={attributes.display}
        fontFamily={attributes.fontFamily}
      />
      {/* {attributes.innerBlock
        ? <InnerBlocks.Content />
        : null} */}
    </div>
  ),
})
