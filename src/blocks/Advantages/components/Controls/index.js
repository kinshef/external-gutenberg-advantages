const { __ } = wp.i18n
const { InspectorControls, MediaUpload } = wp.blockEditor
const {useState, useEffect} = wp.element
import { Button } from "@wordpress/components";
const {PanelBody,PanelRow,TextControl,CheckboxControl,SelectControl} = wp.components


const Controls = ({ attributes, setAttributes }) => {

  const [localState, setLocalState] = useState({
    'colAdvantages': []
  })

  useEffect( () => {
    setLocalState({...localState, 'colAdvantages': [...numberToArrey(attributes.colAdvantages)] })
  }, [attributes.colAdvantages !== undefined])



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
            : <button onClick={open}>Добавить</button>}
        </div>
      }}
    />
  )

  const getTextToState = (label, help, attribute, objectAttribute, objectAttribute2) => (
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
        isPrimary
        onClick={() => {
          objectAttribute && localState[objectAttribute2]
            ? objectAttribute2
              ? attributes[objectAttribute] && attributes[objectAttribute][objectAttribute2]
                ? setAttributes({ [objectAttribute]: { ...attributes[objectAttribute], [objectAttribute2]: {...attributes[objectAttribute][objectAttribute2], [attribute]: localState[objectAttribute2][attribute]} }})
                : setAttributes({ [objectAttribute]: { ...attributes[objectAttribute], [objectAttribute2]: {[attribute]: localState[objectAttribute2][attribute]} }})
              : setAttributes({ [objectAttribute]: {...attributes[objectAttribute], [attribute]: localState[objectAttribute2][attribute]}})
            : setAttributes({...attributes, [attribute]: localState[objectAttribute2][attribute]})
            setLocalState({...localState, [objectAttribute2]: {[attribute]: ''}})
        }}>Click</Button>
    </div>
  )

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

  let numberToArrey = (a) => {
    var arr = [];
    for(let i=0;i<a;i++){arr.push(i)}
    return arr
  }

  let buildSection = localState.colAdvantages.map(e => {
    return <PanelBody title={__((e+1)+' Section')} initialOpen={true}>
      <PanelRow>{getTextToState('Advantages Taitl:'+(attributes.advantagesItems['section'+e] && attributes.advantagesItems['section'+e]['advantagesTaitl']
        ? ' '+attributes.advantagesItems['section'+e]['advantagesTaitl']
        : ' не введено'), null, 'advantagesTaitl', 'advantagesItems', 'section'+e)}</PanelRow>
      <PanelRow>{getTextToState('Advantages Subtitle: '+(attributes.advantagesItems['section'+e] && attributes.advantagesItems['section'+e]['advantagesSubtitle']
        ? ' '+attributes.advantagesItems['section'+e]['advantagesSubtitle']
        : ' не введено'), null, 'advantagesSubtitle', 'advantagesItems', 'section'+e)}</PanelRow>
      <PanelRow>{getImgToState('sectionImg', 'advantagesItems', 'section'+e)}</PanelRow>
    </PanelBody>
  })

  return (
    <InspectorControls>
      <PanelBody title={__('dev')} initialOpen={true}>
        <PanelRow>
          <Button 
            isPrimary
            onClick={() => console.log(localState)}>localStateControls</Button>
        </PanelRow>
        <PanelRow>
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
        <PanelRow>{getImgToState('bgImg')}</PanelRow>
        <PanelRow>
          {getCheckboxControl(
            'bootstrapGrid',
            null,
            'bootstrapGrid'
          )}
        </PanelRow>
        <PanelRow>
          {getCheckboxControl(
            'bootstrapGridContainer',
            null,
            'bootstrapGridContainer'
          )}
        </PanelRow>
      </PanelBody>
      {buildSection}
    </InspectorControls>
  )
}

export default Controls
