const { __ } = wp.i18n
const { InspectorControls, MediaUpload } = wp.blockEditor
const { PanelBody, PanelRow, RadioControl, Button, TextControl, RangeControl, CheckboxControl } = wp.components

const Controls = ({ attributes, setAttributes, className}) => {

  const getCheckboxControl = (label, help, attribute, twoObject) => (
    <PanelRow>
      <CheckboxControl
        label={label}
        help={help}
        checked={
          twoObject
            ? attributes[twoObject][attribute]
            : attributes[attribute]
        }
        onChange={e => setAttributes({ [attribute]: !attributes[attribute] })}
        onChange={ val => {
          twoObject
            ? setAttributes({ [twoObject]: { ...attributes[twoObject], [attribute]: !attributes[twoObject][attribute]}})
            : setAttributes({ [attribute]: !attributes[attribute] })
        } }
      />
    </PanelRow>
  )
  const getRadioControl = (label, help, options, attribute, twoObject ) => (
    <RadioControl
      label={label}
      help={help}
      selected={
        twoObject
          ? attributes[twoObject][attribute]
          : attributes[attribute]
      }
      options={options}
      onChange={ val => {
        twoObject
          ? setAttributes({ [twoObject]: {...attributes[twoObject],[attribute]: val}})
          : setAttributes({ [attribute]: val })
      } }
    />
  )
  const setAttributesObject = (ObjectOne, attributeKey, attributeVal) => {
    setAttributes({
      [ObjectOne]: {
        ...attributes[ObjectOne],
        [attributeKey]: attributeVal,
      }
    })
  }

  const selectImage = (e, attributeName, attributeObject) => {
    setAttributes({
      [attributeObject]: {
        ...attributes[attributeObject],
        [attributeName]: e.sizes.full.url,
      }
    })
  }

  return (
    <InspectorControls className={className}>
      <PanelBody title={__('dev')} initialOpen={true}>
        <PanelRow>
          <Button 
            isPrimary
            onClick={() => console.log(attributes)}>State</Button>
        </PanelRow>
      </PanelBody>
      <PanelBody title={__('Задний фон')} initialOpen={true}>
        {getRadioControl('bg validation: ', null, [
          { label: 'img', value: 'img' },
          { label: 'color', value: 'color' },
        ], 'validation', 'background')}
        {attributes.background.validation === 'color'
          ? <TextControl
              type='text'
              label='bg validation:'
              value={attributes.background.bgColor}
              onChange={e => setAttributesObject('background', 'bgColor', e)}
            />
          : <MediaUpload
              onSelect={e => selectImage(e, 'bgImg', 'background')}
              render={({ open }) => {
                return attributes.background.bgImg
                  ? <img src={attributes.background.bgImg} onClick={open} />
                  : <button onClick={open}>Добавить</button>
              }}
            />
        }
      </PanelBody>
      <PanelBody title={__('Текст')} initialOpen={true}>
        <PanelRow>
          <TextControl
            type='text'
            label='bg validation:'
            value={attributes.textTaitl}
            onChange={e => setAttributes({'textTaitl': e})}
          />
        </PanelRow>
      </PanelBody>
      <PanelBody title={__('Параметры текста')} initialOpen={true}>
        <PanelRow>
          <TextControl
            label='font size:'
            type='number'
            name='font-size'
            value={attributes.fontSize}
            onChange={e => setAttributes({'fontSize': e})}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            type='text'
            label='font color(hex):'
            value={attributes.fontColor}
            onChange={e => setAttributes({'fontColor': e})}
          />
        </PanelRow>
        <label>font weight(100-900):</label>
        <PanelRow>
          <RangeControl
            min={100}
            max={900}
            step={100}
            name="font-weight"
            value={attributes.fontWeight}
            onChange={ e => setAttributes({'fontWeight': e}) }
          />
        </PanelRow>
        {getRadioControl('font style:', null, [
          { label: 'normal', value: 'normal' },
          { label: 'italic', value: 'italic' },
        ], 'fontStyle')}
        <PanelRow>
          <TextControl
            label='letter spacing:'
            type='number'
            value={attributes.letterSpacing}
            onChange={e => setAttributes({'letterSpacing': e})}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label='line height:'
            type='number'
            value={attributes.lineHeight}
            onChange={e => setAttributes({'lineHeight': e})}
          />
        </PanelRow>
      </PanelBody>
      <PanelBody title={__('Внешние отступы')} initialOpen={true}>
        <PanelRow>
          <TextControl
            type='text'
            label='margin(top right botton left):'
            value={attributes.margin.margin}
            onChange={e => setAttributesObject('margin', 'margin', e)}
          />
        </PanelRow>
        {getCheckboxControl('margin validation', null, 'validation', 'margin')}
      </PanelBody>
      <PanelBody title={__('Внутренние отступы')} initialOpen={true}>
        <PanelRow>
          <TextControl
            type='text'
            label='padding(top right botton left):'
            value={attributes.padding.padding}
            onChange={e => setAttributesObject('padding', 'padding', e)}
          />
        </PanelRow>
        {getCheckboxControl('padding validation', null, 'validation', 'padding')}
      </PanelBody>
      <PanelBody title={__('Как элемент должен быть показанотступы')} initialOpen={true}>
        {getRadioControl('display:', null, [
          { label: 'block', value: 'block' },
          { label: 'inline', value: 'inline' },
          { label: 'inline-block', value: 'inline-block' },
          { label: 'none', value: 'none' },
        ], 'display')}
      </PanelBody>
    </InspectorControls>
  )
}

export default Controls
