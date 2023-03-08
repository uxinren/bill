import { defineComponent, PropType, reactive } from "vue";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Form, FormItem } from "../shared/Form";
import { Icon } from "../shared/Icon";
import { OverlayIcon } from "../shared/Overlay";
import { validate } from "../shared/validate";
import s from "./SignPage.module.scss";
export const SignPage = defineComponent({
  setup: (props, context) => {
    const formDate = reactive({
      email: "",
      mailCode: "",
    });
    const errors = reactive({
      email: [],
      mailCode: [],
    });
    const onCodeClick=(() => {
      console.log("发送验证码");
    })
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
                  label="验证码"
                  type="mailCode"
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
