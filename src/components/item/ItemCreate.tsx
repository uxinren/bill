import { defineComponent, onMounted, PropType, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { defaultHttpClient } from "../../shared/HttpClient";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { useTags } from "../../shared/UserTags";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
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
                  <Tab name="支出" class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {expensesTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                    <div>
                      {hasMore.value?
                      <div class={s.tag} onClick={fetchTags}>
                        <div class={s.sign}>
                          <Icon name="more" class={s.createTag} />
                        </div>
                        <div class={s.name}>更多</div>
                      </div>  
                      :''
                    }
                    </div>
                  </Tab>
                  <Tab name="收入" class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {incomeTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                    <div>
                      {hasMore2.value?
                      <div class={s.tag} onClick={fetchTags2}>
                        <div class={s.sign}>
                          <Icon name="more" class={s.createTag} />
                        </div>
                        <div class={s.name}>更多</div>
                      </div>  
                      :''
                    }
                    </div>
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
