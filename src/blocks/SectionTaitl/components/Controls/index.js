const { __ } = wp.i18n
const { InspectorControls, MediaUpload } = wp.blockEditor
const { PanelBody, PanelRow, RadioControl, Button, TextControl, RangeControl, CheckboxControl } = wp.components
const {useState} = wp.element

const Controls = ({ attributes, setAttributes, className}) => {

  const [localState, setLocalState] = useState({})

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

  const getTextToState = (label, help, btn, key, object) => (
    <div>
      <TextControl
        label={label}
        help={help}
        value={
          object && localState[object]
            ? localState[object][key]
            : localState[key]
        }
        onChange={text => {
          object
            ? setLocalState({...localState, [object]: { ...localState[object], [key]: text }})
            : setLocalState({...localState, [key]: text})
        }}
      />
      <Button 
        style={{marginRight: "0.5rem"}}
        isPrimary
        onClick={() => {
          object && localState[object]
            ? [setAttributes({...attributes, [object]: {...attributes[object], [key]: localState[object][key]}}),
              setLocalState({...attributes, [object]: {...attributes[object], [key]: ''}})]
            : [setAttributes({...attributes, [key]: localState[key]}),
              setLocalState({...localState, [key]: ''})]
        }}>Click</Button>
      {btn
        ? <Button 
            isPrimary
            onClick={() => {
              let attr = {...attributes}
              {object
                ? delete attr[object][key]
                : delete attr[key]
              }
              setAttributes(attr)
            }}>Delete</Button>
        : null}
    </div>
  )


  return (
    <InspectorControls className={className}>
      <PanelBody title={__('dev')} initialOpen={true}>
        <PanelRow>
          <Button 
            isPrimary
            onClick={() => console.log(attributes)}>State</Button>
          <Button 
            isPrimary
            onClick={() => console.log(localState)}>localState</Button>
        </PanelRow>
      </PanelBody>
      <PanelBody title={__('Импорт шрифтов(Google)')} initialOpen={true}>
        {getTextToState('font family Url: '+ attributes.fontFamily.fontFamilyUrl,
          'Пример: https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
          false, 'fontFamily', 'fontFamilyUrl'
        )}
        {getTextToState('font family Name: '+ attributes.fontFamily.fontFamilyName,
          'Пример: Roboto', false, 'fontFamily', 'fontFamilyName'
        )}
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
                  : <Button isPrimary onClick={open}>Добавить</Button>
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
            value={+attributes.fontWeight}
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
      <PanelBody title={__('Выравнивание по горизонтали')} initialOpen={true}>
        {getRadioControl('text-align:', null, [
          { label: 'left', value: 'left' },
          { label: 'center', value: 'center' },
          { label: 'right', value: 'right' },
        ], 'textAlign')}
      </PanelBody>
    </InspectorControls>
  )
}

export default Controls
