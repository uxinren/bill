import s from "./Icon.module.scss";
import { defineComponent, PropType } from "vue";

export type IconName =
  | "add"
  | "chart"
  | "clock"
  | "cloud"
  | "logo"
  | "rainbow"
  | "save"
  | "menu"
  | "charts"
  | "notify"
  | "export"
  | "left"
  | "notes"
  | "date"
  | "more";
export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true,
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <svg class={s.icon} onClick={props.onClick}>
        <use xlinkHref={"#" + props.name}></use>
      </svg>
    );
  },
});
