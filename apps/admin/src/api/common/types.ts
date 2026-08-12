export interface DictionaryOption {
  label: string
  value: string | number
}

export type DictionaryMap = Record<string, DictionaryOption[]>
