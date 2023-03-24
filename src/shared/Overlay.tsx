import { Dialog } from "vant";
import { defineComponent, onMounted, PropType, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useMeStore } from "../stores/useMeStore";
import { Icon } from "./Icon";
import s from "./Overlay.module.scss";
export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    },
  },
  setup: (props, context) => {
    const meStore = useMeStore();
    const close = () => {
      props.onClose?.();
    };
    const route = useRoute();
    const router = useRouter();
    const me = ref<User>();
    const returnTo = route.query.return_to;
    onMounted(async() => {
        const response = await meStore.mePromise
        me.value = response?.data.resource
    });
    const onSignOut = async () => {
        await Dialog.confirm({
            title: '退出登录',
            message: '确定要退出登录吗？'
        })
        localStorage.removeItem('jwt')
        router.push('/sign_in')
    }
    return () => (
      <>
        <div class={s.mask} onClick={close}></div>
        <div class={s.overlay}>
          <section class={s.currentUser}>
            {me.value ? (
               <div>
                <h3 class={s.email}>{me.value.email}</h3>
                <p onClick={onSignOut}>点击这里退出登录</p>
                </div>
            ):(
                <RouterLink to={`/sign_in?return_to=${returnTo}`}>
                    <h3>未登录用户</h3>
                    <p>点击这里登录</p>
                </RouterLink>
            )}

          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to="/statistics" class={s.router}>
                  <Icon name="charts" class={s.icon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={s.router}>
                  <Icon name="export" class={s.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notify" class={s.router}>
                  <Icon name="notify" class={s.icon} />
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  },
});

export const OverlayIcon = defineComponent({
  setup: (props, context) => {
    const refOverlayVisible = ref(false);
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value;
    };
    return () => (
      <>
        <Icon name="menu" class={s.icon} onClick={onClickMenu} />
        {refOverlayVisible.value && (
          <Overlay onClose={() => (refOverlayVisible.value = false)} />
        )}
      </>
    );
  },
});
