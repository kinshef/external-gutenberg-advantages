const { __ } = wp.i18n
const { InspectorControls, MediaUpload } = wp.blockEditor
const { PanelBody, PanelRow, RadioControl } = wp.components

const Controls = ({ attributes, setAttributes, className}) => {

  const onTextInputChanged = (e, attributeName) => {
    const value = e.target.value
    setAttributes({
      [attributeName]: value,
    })
  }

  const onTextInputObjectChanged = (e, attributeName, attributeObject) => {
    const value = e.target.value
    setAttributes({
      [attributeObject]: {
        ...attributes[attributeObject],
        [attributeName]: value,
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

//   const MyRadioControl = withState( {
//     option: 'a',
//       } )( ( { option, setState } ) => (
//     <RadioControl
//         label="User type"
//         help="The type of the current user"
//         selected={ option }
//         options={ [
//             { label: 'Author', value: 'a' },
//             { label: 'Editor', value: 'e' },
//         ] }
//         onChange={ ( option ) => { setState( { option } ) } }
//     />
// ) );


  return (
    <InspectorControls className={className}>
        <PanelBody title={__('Задний фон')} initialOpen={true}>
          <PanelRow>
            <RadioControl
              label="User type"
              help="The type of the current user"
              selected={ 'option' }
              options={ [
                { label: 'Author', value: 'a' },
                { label: 'Editor', value: 'e' },
              ] }
              onChange={ ( option ) => { console.log(option) } }
            />
          </PanelRow>
          <label>bg validation:</label><br />
          <input 
            id="bg-validation-1"
            type="radio"
            name="bg-validation"
            onChange={e => onTextInputObjectChanged(e, 'validation', 'background')}
            value='img'
            checked={attributes.background.validation === 'img'}
          />
          <label for="bg-validation-1">img</label><br />
          <input 
            id="bg-validation-2"
            type="radio"
            name="bg-validation"
            onChange={e => onTextInputObjectChanged(e, 'validation', 'background')}
            value='color'
            checked={attributes.background.validation === 'color'}
          />
          <label for="bg-validation-2">color</label><br />

          {attributes.background.validation === 'color'
            ? <input
                type='text'
                name='bgColor'
                onChange={e => onTextInputObjectChanged(e, 'bgColor', 'background')}
                value={attributes.background.bgColor}
              /> 
          : <MediaUpload
              onSelect={e => selectImage(e, 'bgImg', 'background')}
              render={({ open }) => {
                return <div>
                  {!!attributes.background.bgImg
                    ? <div><img src={attributes.background.bgImg} onClick={open} /><br/><button onClick={open}>Изменить</button></div>
                    : <button onClick={open}>Добавить</button>}
                </div>
              }}
            />
          }
        </PanelBody>
        <PanelBody title={__('Текст')} initialOpen={true}>
          <input
            type='text'
            name='taitl'
            onChange={e => onTextInputChanged(e, 'textTaitl')}
            value={attributes.textTaitl}
          />
        </PanelBody>
        <PanelBody title={__('Параметры текста')} initialOpen={true}>
          <label>font size:</label><br />
          <input
            type='number'
            name='font-size'
            onChange={e => onTextInputChanged(e, 'fontSize')}
            value={attributes.fontSize}
          />
          <br />
          <label>font color(hex):</label><br />
          <input
            type='text'
            name='font-color'
            onChange={e => onTextInputChanged(e, 'fontColor')}
            value={attributes.fontColor}
          />
          <br />
          <label>font weight(100-900):</label><br />
          <div>{attributes.fontWeight}</div>
          <input 
            type="range" 
            min="100" 
            max="900" 
            step="100"
            name="font-weight"
            onChange={e => onTextInputChanged(e, 'fontWeight')}
            value={attributes.fontWeight}
          />
          <br />
          <label>font style:</label><br />
          <input 
            id="font-style-1"
            type="radio"
            name="font-style"
            onChange={e => onTextInputChanged(e, 'fontStyle')}
            value="normal"
            checked={attributes.fontStyle === "normal"}
          />
          <label for="font-style-1">normal</label><br />
          <input 
            id="font-style-2"
            type="radio"
            name="font-style"
            onChange={e => onTextInputChanged(e, 'fontStyle')}
            value="italic"
            checked={attributes.fontStyle === "italic"}
          />
          <label for="font-style-2">italic</label><br />
          <label>letter spacing:</label><br />
          <input
            type='number'
            name='letter-spacing'
            onChange={e => onTextInputChanged(e, 'letterSpacing')}
            value={attributes.letterSpacing}
          />
          <br />
          <label>line height:</label><br />
          <input
            type='number'
            name='line-height'
            onChange={e => onTextInputChanged(e, 'lineHeight')}
            value={attributes.lineHeight}
          />
        </PanelBody>
        <PanelBody title={__('Внешние отступы')} initialOpen={true}>
          <label>margin(top right botton left):</label><br />
          <input
            type='text'
            name='margin'
            onChange={e => onTextInputObjectChanged(e, 'margin', 'margin')}
            value={attributes.margin.margin}
          />
          <br />
          <label>margin validation:</label><br />
          <input 
            id="margin-validation-1"
            type="radio"
            name="margin-validation"
            onChange={e => onTextInputObjectChanged(e, 'validation', 'margin')}
            value='true'
            checked={attributes.margin.validation === 'true'}
          />
          <label for="margin-validation-1">true</label><br />
          <input 
            id="margin-validation-2"
            type="radio"
            name="margin-validation"
            onChange={e => onTextInputObjectChanged(e, 'validation', 'margin')}
            value='false'
            checked={attributes.margin.validation === 'false'}
          />
          <label for="margin-validation-2">false</label><br />
        </PanelBody>
        <PanelBody title={__('Внутренние отступы')} initialOpen={true}>
          <label>padding(top right botton left):</label><br />
          <input
            type='text'
            name='padding'
            onChange={e => onTextInputObjectChanged(e, 'padding', 'padding')}
            value={attributes.padding.padding}
          />
          <br />
          <label>padding validation:</label><br />
          <input 
            id="padding-validation-1"
            type="radio"
            name="padding-validation"
            onChange={e => onTextInputObjectChanged(e, 'validation', 'padding')}
            value='true'
            checked={attributes.padding.validation === 'true'}
          />
          <label for="padding-validation-1">true</label><br />
          <input 
            id="padding-validation-2"
            type="radio"
            name="padding-validation"
            onChange={e => onTextInputObjectChanged(e, 'validation', 'padding')}
            value='false'
            checked={attributes.padding.validation === 'false'}
          />
          <label for="padding-validation-2">false</label><br />
        </PanelBody>
        <PanelBody title={__('Как элемент должен быть показанотступы')} initialOpen={true}>
          <label>display:</label><br />
          <input 
            id="display-1"
            type="radio"
            name="display"
            onChange={e => onTextInputChanged(e, 'display')}
            value='block'
            checked={attributes.display === 'block'}
          />
          <label for="display-1">block</label><br />
          <input 
            id="display-2"
            type="radio"
            name="display"
            onChange={e => onTextInputChanged(e, 'display')}
            value='inline'
            checked={attributes.display === 'inline'}
          />
          <label for="display-2">inline</label><br />
          <input 
            id="display-3"
            type="radio"
            name="display"
            onChange={e => onTextInputChanged(e, 'display')}
            value='inline-block'
            checked={attributes.display === 'inline-block'}
          />
          <label for="display-3">inline-block</label><br />
          <input 
            id="display-4"
            type="radio"
            name="display"
            onChange={e => onTextInputChanged(e, 'display')}
            value='none'
            checked={attributes.display === 'none'}
          />
          <label for="display-4">none</label><br />
        </PanelBody>
    </InspectorControls>
  )
}

export default Controls
