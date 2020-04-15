const { __ } = wp.i18n
const { InspectorControls, MediaUpload } = wp.blockEditor
const {useState} = wp.element
import { Button, RadioControl } from "@wordpress/components";
const {PanelBody, PanelRow, TextControl, CheckboxControl, SelectControl} = wp.components


const Controls = ({ attributes, setAttributes }) => {

  let numberToArrey = (a) => {
    var arr = [];
    for(let i=0;i<a;i++){arr.push(i)}
    return arr
  }
  const [localState, setLocalState] = useState({
    'colAdvantages': [...numberToArrey(attributes.colAdvantages)]
  })

  const stringToBoolean = (str) => {
    if(str === 'true') {return true}
    if(str === 'false') {return false}
  }

  const getCheckboxControl = (label, help, attribute) => (
    <PanelRow>
      <CheckboxControl
        label={label}
        help={help}
        checked={attributes[attribute]}
        onChange={e => setAttributes({ [attribute]: !attributes[attribute] })}
      />
    </PanelRow>
  )
  const getRadioControl = (label, help, options, attribute, boolean ) => (
    <PanelRow>
      <RadioControl
        label={label}
        help={help}
        selected={ attributes[attribute] }
        options={options}
        onChange={ val => {
          boolean
            ? setAttributes({ [attribute]: stringToBoolean(val) })
            : setAttributes({ [attribute]: val })
        } }
      />
    </PanelRow>
  )

  const getImgToState = (attribute, objectAttribute, objectAttribute2 ) => (
    <MediaUpload
      onSelect={e => {
        objectAttribute
          ? objectAttribute2
            ? attributes[objectAttribute] && attributes[objectAttribute][objectAttribute2]
              ? setAttributes({ [objectAttribute]: { ...attributes[objectAttribute], [objectAttribute2]: {...attributes[objectAttribute][objectAttribute2], [attribute]: e.sizes.full.url}}})
              : setAttributes({ [objectAttribute]: { ...attributes[objectAttribute], [objectAttribute2]: {...attributes[objectAttribute][objectAttribute2], [attribute]: e.sizes.full.url}}})
            : setAttributes({ [objectAttribute]: {...attributes[objectAttribute], [attribute]: e.sizes.full.url}})
          : setAttributes({...attributes, [attribute]: e.sizes.full.url})
      }}
      render={({ open }) => {
        return <div>
          {attributes[objectAttribute] !== undefined && attributes[objectAttribute][attribute] !== undefined
            ? <img src={attributes[objectAttribute][attribute]} onClick={open} />
            : <Button isPrimary onClick={open}>Добавить иконку</Button>}
        </div>
      }}
    />
  )

  const getTextToStateTwoObject = (label, help, attribute, objectAttribute, objectAttribute2) => (
    <div>
      <TextControl
        label={label}
        help={help}
        value={localState[objectAttribute2] && localState[objectAttribute2][attribute]
          ? localState[objectAttribute2][attribute]
          : ''}
        onChange={text => setLocalState({...localState, [objectAttribute2]: { [attribute]: text}})}
      />
      <Button 
        style={{marginRight: "0.5rem"}}
        isPrimary
        onClick={() => {
          localState[objectAttribute2]
            ? setAttributes({...attributes, [objectAttribute]: { ...attributes[objectAttribute], [objectAttribute2]: {...attributes[objectAttribute][objectAttribute2], [attribute]: localState[objectAttribute2][attribute] } }})
            : null
          setLocalState({...localState, [objectAttribute2]: {[attribute]: ''}})
        }}>Click</Button>
      <Button 
        isPrimary
        onClick={() => {
          var attr = { ...attributes, [objectAttribute]: {...attributes[objectAttribute], [objectAttribute2]: {...attributes[objectAttribute][objectAttribute2]}}};
          delete attr[objectAttribute][objectAttribute2][attribute]
          if(Object.keys(attr[objectAttribute][objectAttribute2]).length === 0) {
            delete attr[objectAttribute][objectAttribute2]
          }
          setAttributes(attr)
        }}>Delete</Button>
    </div>
  )

  let buildSection = localState.colAdvantages.map(e => {
    return <PanelBody title={__((e+1)+' Section')} initialOpen={true}>
      <PanelRow>
        {getTextToStateTwoObject('Advantages Taitl:'+(attributes.advantagesItems['section'+e] && attributes.advantagesItems['section'+e]['advantagesTaitl']
          ? ' '+attributes.advantagesItems['section'+e]['advantagesTaitl']
          : ' не введено'), null, 'advantagesTaitl', 'advantagesItems', 'section'+e)}
      </PanelRow>
      <PanelRow>
        {getTextToStateTwoObject('Advantages Subtitle: '+(attributes.advantagesItems['section'+e] && attributes.advantagesItems['section'+e]['advantagesSubtitle']
          ? ' '+attributes.advantagesItems['section'+e]['advantagesSubtitle']
          : ' не введено'), null, 'advantagesSubtitle', 'advantagesItems', 'section'+e)}
      </PanelRow>
      {getRadioControl('imgAndIcon', null, [
            { label: 'IMF', value: 'IMG' },
            { label: 'Icon', value: 'ICON' },
          ], 'imgAndIcon')}
      <PanelRow>
        {attributes.imgAndIcon === 'IMG'
          ? getImgToState('sectionImg', 'advantagesItems', 'section'+e)
          : getTextToStateTwoObject(
            <span>Advantages Icon: {
              (attributes.advantagesItems['section'+e] && attributes.advantagesItems['section'+e]['advantagesIcon']
                ? <span className={'dashicons dashicons-' + attributes.advantagesItems['section'+e]['advantagesIcon']}></span>
                : <span> не введено</span>
              )
            }</span>, <a target="_blank" href='https://developer.wordpress.org/resource/dashicons/'>Icon</a>, 'advantagesIcon', 'advantagesItems', 'section'+e)
        }
      </PanelRow>
      <PanelRow>
        <Button 
          isPrimary
          onClick={() => {
            var attribute = { ...attributes, ['advantagesItems']: {...attributes['advantagesItems']}};
            delete attribute.advantagesItems['section'+e]
            setAttributes(attribute)
        }}>Delete section</Button>
      </PanelRow>
    </PanelBody>
  })

  return (
    <InspectorControls>
      <PanelBody title={__('dev')} initialOpen={true}>
        <PanelRow>
          <Button 
            isPrimary
            onClick={() => console.log(localState)}>localStateControls</Button>
          <Button 
            isPrimary
            onClick={() => console.log(attributes)}>State</Button>
        </PanelRow>
      </PanelBody>

      <PanelBody title={__('main')} initialOpen={true}>
        <PanelRow>
          <TextControl
            label='Col Advantages'
            type="number"
            value={attributes.colAdvantages}
            onChange={text =>{
              setAttributes({'colAdvantages': text})
              setLocalState({...localState, 'colAdvantages': [...numberToArrey(text)]})
            }}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label='max Col To Row'
            type="number"
            value={attributes.maxColToRow}
            onChange={text =>{
              setAttributes({'maxColToRow': +text})
            }}
          />
        </PanelRow>
      </PanelBody>
      {buildSection}
    </InspectorControls>
  )
}

export default Controls
