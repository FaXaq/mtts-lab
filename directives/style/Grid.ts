import { DirectiveFunction, VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";

export interface IGridParams {
  columns?: number,
  rows?: number,
  elements: number,
  spacing?: string,
  auto?: 'row' | 'column' | 'row dense' | 'column dense',
  type?: 'square' | 'rectangle'
}

function getTemplateFromNumber(n: number, unit: string): string {
  let res = ''

  for (let i = 0; i < n; i++) {
    res += unit + ' ';
  }

  return res
}

export default (el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) => {
  let params = binding.value as IGridParams

  if (params.type === 'square') {
    params.columns = Math.round(Math.sqrt(params.elements))
    params.rows = params.columns
  }

  if (params.columns) {
    el.style.gridTemplateColumns = getTemplateFromNumber(params.columns, '1fr')
  }

  if (params.rows) {
    el.style.gridTemplateRows = getTemplateFromNumber(params.rows, '1fr')
  }

  el.style.display = 'grid'

  if (params.spacing) {
    el.style.gridGap = params.spacing
  }

  if (params.auto) {
    el.style.gridAutoFlow = params.auto
  }
}