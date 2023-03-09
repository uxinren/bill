import s from "./Welcome.module.scss";
import { RouterLink } from "vue-router";
import { FunctionalComponent } from "vue";
import { SkipFetures } from "../../shared/SkipFetures";

export const ForthAction: FunctionalComponent = () => {
  const onClick = () => {
    localStorage.setItem("skipFeatures", "yes");
  };
  return (
    <div class={s.actions}>
      <SkipFetures class={s.fake}/>
      <span onClick={onClick} >
        <RouterLink to="/start">完成</RouterLink>
      </span>
      <SkipFetures  class={s.fake}/>
    </div>
  );
};

ForthAction.displayName = "ForthAction";
