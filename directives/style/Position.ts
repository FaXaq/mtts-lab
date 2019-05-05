import { DirectiveBinding } from "vue/types/options";
import { VNode } from "vue";

export interface IPositionParams {
  top: number,
  left: number
}

export default (el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) => {
  const params: IPositionParams = binding.value as IPositionParams

  el.style.top = `${params.top}px`
  el.style.left = `${params.left}px`
}