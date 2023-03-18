import { AxiosError } from "axios";
import { Dialog } from "vant";
import { defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { defaultHttpClient } from "../../shared/HttpClient";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
import { Tags } from "./Tags";
export const ItemCreate = defineComponent({
  setup: (props, context) => {
    //初始化类型、是否更多、当前页
    const formData = reactive({
      kind: '支出',
      tag_id: [],
      happen_at: new Date().toISOString(),
      amount: 0
    })
    const router = useRouter()
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        Dialog.alert({
          title: '出错',
          message: Object.values(error.response.data.errors).join('\n'),
        });
      }
      throw error;
    };
    //发送金额数据
    const onSubmit = async () => {
      await defaultHttpClient.post<Resource<Item>>('/items', formData,
      {params: { _mock: 'itemCreate'
    }}
      ).catch(onError)
      router.push('/items')
    }
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="left" class={s.icon} />,
          default: () => (
            <>
              {/* <Tabs selected = {refKind.value} onUpdateSelected={name=> refKind.value = name}> */}
              <div class={s.wrapper}>
                <Tabs
                  v-model:selected={formData.kind}
                  selected={formData.kind}
                  class={s.tabs}
                >
                  <Tab name="支出" >
                   <Tags kind='expenses' v-model:selected={formData.tag_id[0]}></Tags>
                  </Tab>
                  <Tab name="收入" >
                    <Tags kind='income' v-model:selected={formData.tag_id[0]}></Tags>
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad v-model:happenAt={formData.happen_at}
                            v-model:amount ={formData.amount}
                            onSubmit={onSubmit}
                  />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
