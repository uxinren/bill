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
// export const First = defineComponent({
//   setup() {
//     const div = ref<HTMLElement>()
//     const router = useRouter();
//     const { swiping, direction } = useSwipe(div, {
//       beforeStart: (e) => e.preventDefault(),
//     });
//     watchEffect(() => {
//       if (swiping.value && direction.value === "left") {
//         router.push("/welcome/2");
//       }
//     });
//     return () => (
//       <div class={s.card} ref={div}>
//         <svg>
//           <use xlinkHref="#save"></use>
//         </svg>
//         <h2>
//           会挣钱
//           <br />
//           还要会省钱
//         </h2>
//       </div>
//     );
//   },
// });
