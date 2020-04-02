// Import external components
import Card from './components/Card'
import Controls from './components/Controls'

const { __ } = wp.i18n // Import __() from wp.i18n
const { registerBlockType } = wp.blocks // Import registerBlockType() from wp.blocks
import { Fragment } from '@wordpress/element'

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
      default: '400',
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
        validation: 'true',
      },
    },
    padding: {
      type: 'object',
      default: {
        padding: '0px',
        validation: 'false',
      },
    },
    display: {
      type: 'text',
      default:  'block',
    },
  },
  edit: ({ attributes, setAttributes, className}) => (
    <Fragment>
      <Controls attributes={attributes} setAttributes={setAttributes} />
      <Card
        additionalClasses={attributes.className ? attributes.className : ''}
        data={attributes}
        preventClick={true}
        className= {className}
      />
    </Fragment>
  ),
  save: ({ attributes, className}) => (
    <Card
      additionalClasses={attributes.className ? attributes.className : ''}
      data={attributes}
      className= {className}
    />
  ),
})
