import { defineComponent, reactive, ref } from "vue";
import { useBool } from "../hooks/useBool";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Form, FormItem } from "../shared/Form";
import { defaultHttpClient } from "../shared/HttpClient";
import { Icon } from "../shared/Icon";
import { validate } from "../shared/validate";
import s from "./SignPage.module.scss";
export const SignPage = defineComponent({
  setup: (props, context) => {
    const formDate = reactive({
      email: "315921205@qq.com",
      mailCode: "",
    });
    const refMailCode = ref<any>();
    const {ref:refDisabled,toggle,on:disabled,off:enable} = useBool(false);
    const errors = reactive({
      email: [],
      mailCode: [],
    });
    const onError = (error:any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
      throw error;
    }
    const onCodeClick= async () => {
      disabled();
      const response = await defaultHttpClient
      .post('/validation_codes', { email: formDate.email })
      .catch(onError)
      .finally(enable);
      //发送邮箱验证码成功
      refMailCode.value?.startCount();
    }
    const onSubmit = (e: Event) => {
      e.preventDefault();
      Object.assign(errors, {
        email: [],
        mailCode: [],
      });

      Object.assign(
        errors,
        validate(formDate, [
          { key: "email", type: "required", message: "必填" },
          {
            key: "email",
            type: "pattern",
            regex: /.+@.+/,
            message: "邮箱格式不正确",
          },
          { key: "mailCode", type: "required", message: "必填" },
        ])
      );
    };
    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <Icon name="left" />,
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
                  v-model={formDate.email}
                  error={errors.email?.[0]}
                ></FormItem>
                <FormItem
                  ref={refMailCode}
                  label="验证码"
                  type="mailCode"
                  countFrom={1}
                  disabled={refDisabled.value}
                  placeholder='请输入六位验证码'
                  v-model={formDate.mailCode}
                  error={errors.mailCode?.[0]}
                  onCodeClick={onCodeClick}
                ></FormItem>
                <FormItem>
                  <Button size="large" class={s.button} type="submit">
                    登录
                  </Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
