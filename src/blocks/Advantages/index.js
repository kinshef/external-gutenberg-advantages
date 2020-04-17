// Import external components
import Controls from './components/Controls'
import { Card } from './components/Card'
import './style.scss';


const { __ } = wp.i18n // Import __() from wp.i18n
const { registerBlockType } = wp.blocks // Import registerBlockType() from wp.blocks
import { Fragment } from '@wordpress/element'
const { InnerBlocks } = wp.blockEditor


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
  
  edit: ({ attributes, setAttributes, className }) => (
    <Fragment>
      <Controls attributes={attributes} setAttributes={setAttributes} />
      <section ib='section_advantages' 
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
          {Object.keys(attributes.advantagesItems).length
          ? <Card.BootstrapRow bootstrapGrid={attributes.bootstrapGrid}>
              <Card.BuildSectionCol imgAndIcon={attributes.imgAndIcon} advantagesItems={attributes.advantagesItems} maxColToRow={attributes.maxColToRow} />
            </Card.BootstrapRow>
          : <div>Заполните хотя-бы одну секцию</div>}
        </Card.BootstrapContainer>
      </section>
    </Fragment>
  ),
  save: ({ attributes, className }) => (
    <section ib='section_advantages'
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
