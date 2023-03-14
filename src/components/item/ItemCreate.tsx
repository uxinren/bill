import { defineComponent, onMounted, PropType, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { defaultHttpClient } from "../../shared/HttpClient";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
export const ItemCreate = defineComponent({
  setup: (props, context) => {
    //初始化类型、是否更多、当前页
    const refKind = ref("支出");
    const refHasMore = ref(false);
    const refPage = ref(0);
    //获取数据
    onMounted(async () => {
      const response = await defaultHttpClient.get<Resources<Tag>>("/tags", {
        kind: "expenses",
        _mock: "tagIndex",
      });
      const { resources, pager } = response.data;
      refExpensesTags.value = resources;
      refHasMore.value =(pager.page - 1) * pager.per_page + resources.length < pager.count;
      console.log(refHasMore.value);
      
    });
    const refExpensesTags = ref<Tag[]>([]);
    onMounted(async () => {
      const response = await defaultHttpClient.get<{ resources: Tag[] }>(
        "/tags",
        {
          kind: "income",
          _mock: "tagIndex",
        }
      );
      refIncomeTags.value = response.data.resources;
    });
    const refIncomeTags = ref<Tag[]>([]);
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
                    {refExpensesTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                    <div>
                      {refHasMore.value?
                      <div class={s.tag}>
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
                    {refIncomeTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
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
