// Import external components
import Controls from './components/Controls'
import { Card } from './components/Card'

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
    colAdvantages: {
      type: 'number',
      default: 2,
    },
    bootstrapGrid: {
      type: 'bool',
      default: true,
    },
    bootstrapGridContainer: {
      type: 'bool',
      default: true,
    },
    advantagesItems: {
      type: 'Object',
      default: {}
    },
  },
  
  edit: ({ attributes, setAttributes }) => (
    <Fragment>
      <Controls attributes={attributes} setAttributes={setAttributes} />
      <Card.BootstrapContainer bootstrapGridContainer={attributes.bootstrapGridContainer}>
        {Object.keys(attributes.advantagesItems).length
          ? <Card.BootstrapRow bootstrapGrid={attributes.bootstrapGrid}>
              <InnerBlocks />
              <Card.buildSection advantagesItems={attributes.advantagesItems} advantagesItemString ='advantagesTaitl'/>
              <Card.buildSection advantagesItems={attributes.advantagesItems} advantagesItemString ='advantagesSubtitle'/>
              <Card.buildSection advantagesItems={attributes.advantagesItems} advantagesItemString ='sectionImg' booleanImg={true}/>
            </Card.BootstrapRow>
          : <Card.BootstrapRow bootstrapGrid={attributes.bootstrapGrid}>
              <InnerBlocks />
              <div className='col'>Заполните хотя-бы одну секцию</div>
            </Card.BootstrapRow>}
      </Card.BootstrapContainer>
    </Fragment>
  ),
  save: ({ attributes }) => (
    <Card.BootstrapContainer bootstrapGridContainer={attributes.bootstrapGridContainer}>
      {Object.keys(attributes.advantagesItems).length
        ? <Card.BootstrapRow bootstrapGrid={attributes.bootstrapGrid}>
            <InnerBlocks.Content />
            <Card.buildSection advantagesItems={attributes.advantagesItems} advantagesItemString ='advantagesTaitl'/>
            <Card.buildSection advantagesItems={attributes.advantagesItems} advantagesItemString ='advantagesSubtitle'/>
            <Card.buildSection advantagesItems={attributes.advantagesItems} advantagesItemString ='sectionImg' booleanImg={true}/>
          </Card.BootstrapRow>
        : <Card.BootstrapRow bootstrapGrid={attributes.bootstrapGrid}>
            <InnerBlocks />
            <div className='col'>Заполните хотя-бы одну секцию</div>
          </Card.BootstrapRow>}
      
    </Card.BootstrapContainer>
  ),
})
