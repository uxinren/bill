import { defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBool } from "../hooks/useBool";
import { MainLayout } from "../layouts/MainLayout";
import { BackIcon } from "../shared/BackIcon";
import { Button } from "../shared/Button";
import { Form, FormItem } from "../shared/Form";
import { defaultHttpClient } from "../shared/HttpClient";
import { Icon } from "../shared/Icon";
import { hasError, validate } from "../shared/validate";
import { useMeStore } from "../stores/useMeStore";
import s from "./SignPage.module.scss";
export const SignPage = defineComponent({
  setup: (props, context) => {
    const meStore = useMeStore();
    const formData = reactive({
      email: "315921205@qq.co",
      code: "",
    });
    const refMailCode = ref<any>();
    const router = useRouter()
    const route = useRoute()
    const {ref:refDisabled,on:disabled,off:enable} = useBool(false);
    const errors = reactive({
      email: [],
      code: [],
    });
    const onError = (error:any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
      throw error;
    }
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      Object.assign(errors, {
        email: [],
        code: [],
      });
      Object.assign(errors,validate(formData, [
          { key: "email", type: "required", message: "必填" },
          { key: "email",type: "pattern",regex: /.+@.+/,message: "邮箱格式不正确"},
          { key: "code", type: "required", message: "必填" },
        ]))
        if(!hasError(errors)){
          const response = await defaultHttpClient.post<{jwt:string}>('/session', formData).catch(onError)
          localStorage.setItem('jwt',response.data.jwt)
          const returnTo = route.query.returnTo?.toString()
          meStore.refreshMe()
          router.push(returnTo || '/')
        }
      };
    const onCodeClick= async () => {
        disabled();
        const response = await defaultHttpClient
        .post('/validation_codes', { email: formData.email }, {
          _autoLoading: true
        })
        .catch(onError)
        .finally(enable);
        //发送邮箱验证码成功
        refMailCode.value?.startCount();
      }
    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <BackIcon />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon name="rainbow" class={s.icon}/>
                <h1 class={s.appName}>彩虹记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  placeholder='请输入邮箱，然后点击发送验证码'
                  v-model={formData.email}
                  error={errors.email?.[0]}/>
                <FormItem
                  ref={refMailCode}
                  label="验证码"
                  type="code"
                  countFrom={60}
                  disabled={refDisabled.value}
                  placeholder='请输入六位验证码'
                  v-model={formData.code}
                  error={errors.code?.[0]}
                  onCodeClick={onCodeClick}/>
                <FormItem style={{ paddingTop: '72px' }}>
                  <Button size="large" type="submit">登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
