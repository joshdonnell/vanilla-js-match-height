type OptionsDefault = {
  parent?: string | null,
  byRow?: boolean,
  timeOut?: number
}

type Options = {
  parent: string | null,
  byRow: boolean,
  timeOut: number
}

type MatchHeightItem = {
  elements: NodeListOf<HTMLElement>,
  parent?: HTMLElement, // defaults to empty
  rows: MatchHeightRow[]
}

type MatchHeightRow = {
  height: string|number, // defaults to 0
  offset: number,
  elements: HTMLElement[]
}

type TemporaryRow = {
  offset: number,
  elements: HTMLElement[]
}

interface IMatchHeight {
  element: string;
  options: Options;
  elements: MatchHeightItem[];
}

export {
  OptionsDefault,
  Options,
  IMatchHeight,
  MatchHeightItem,
  TemporaryRow
}