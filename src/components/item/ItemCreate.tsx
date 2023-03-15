import { defineComponent, onMounted, PropType, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { defaultHttpClient } from "../../shared/HttpClient";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { useTags } from "../../shared/UserTags";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
import { Tags } from "./Tags";
export const ItemCreate = defineComponent({
  setup: (props, context) => {
    //初始化类型、是否更多、当前页
    const refKind = ref("支出");
    const {hasMore,tags:expensesTags,fetchTags} = useTags((page)=>{
      return defaultHttpClient.get<Resources<Tag>>("/tags", {
        kind: "expenses",
        page: page + 1,
        _mock: "tagIndex",
      });
    })
    const {hasMore:hasMore2,tags:incomeTags,fetchTags:fetchTags2} = useTags((page)=>{
      return defaultHttpClient.get<Resources<Tag>>("/tags", {
        kind: "income",
        page: page + 1,
        _mock: "tagIndex",
      });
    })
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
                  v-model:selected={refKind.value}
                  selected={refKind.value}
                  onUpdate:selected={() => {
                    console.log("update");
                  }}
                  class={s.tabs}
                >
                  <Tab name="支出" >
                   <Tags kind='expenses'></Tags>
                  </Tab>
                  <Tab name="收入" >
                    <Tags kind='income'></Tags>
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
