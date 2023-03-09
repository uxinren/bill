import s from './Welcome.module.scss';
import { RouterLink } from 'vue-router';
import { FunctionalComponent } from 'vue';
import { SkipFetures } from '../../shared/SkipFetures';

export const FirstAction: FunctionalComponent = () => {
  return <div class={s.actions}>
    <SkipFetures  class={s.fake}/>
    <RouterLink to="/welcome/2" >下一页</RouterLink>
    <SkipFetures />
  </div>
}

FirstAction.displayName = 'FirstAction'
