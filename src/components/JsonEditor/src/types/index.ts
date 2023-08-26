export interface JsonEditorProps {
  value: any
  deep?: number
  showLength?: boolean
  showLineNumbers?: boolean
  showLineNumber?: boolean
  showIcon?: boolean
  showDoubleQuotes?: boolean
  virtual?: boolean
  height?: number
  itemHeight?: number
  rootPath?: string
  nodeSelectable?: (...args: any[]) => boolean
  selectableType?: 'multiple' | 'single'
  showSelectController?: boolean
  selectOnClickNode?: boolean
  highlightSelectedNode?: boolean
  collapsedOnClickBrackets?: boolean
  renderNodeKey?: (...args: any[]) => any
  renderNodeValue?: (...args: any[]) => any
  editable?: boolean
  editableTrigger?: 'click' | 'dblclick'
}
