import { FunctionalComponent,defineComponent,ref,watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useSwipe } from "../../hooks/useSwipe";
import s from "./Welcome.module.scss";

export const First: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <svg>
        <use xlinkHref="#save"></use>
      </svg>
      <h2>
        会挣钱
        <br />
        还要会省钱
      </h2>
    </div>
  );
};

First.displayName = "First";
