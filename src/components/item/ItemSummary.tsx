import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "vue";
import { Money } from "../../shared/Money";
import { Button } from "../../shared/Button";
import { DateTime } from "../../shared/DateTime";
import { FloatButton } from "../../shared/FloatButton";
import { defaultHttpClient } from "../../shared/HttpClient";
import s from "./ItemSummary.module.scss";
import { Icon } from "../../shared/Icon";
import { RouterLink } from "vue-router";
import { Center } from "../../shared/Center";
import { useMeStore } from "../../stores/useMeStore";
import { useAfterMe } from "../../hooks/useAfterMe";
export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false,
    },
    endDate: {
      type: String as PropType<string>,
      required: false,
    },
  },
  setup: (props, context) => {
    const items = ref<Item[]>([]);
    const hasMore = ref(false);
    const page = ref(0);
    const fetchItems = async () => {
      if (!props.startDate || !props.endDate) {
        return;
      }
      const response = await defaultHttpClient.get<Resources<Item>>(
        "/items",
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          page: page.value + 1,
        },
        { _mock: "itemIndex", _autoLoading: true }
      );
      const { resources, pager } = response.data;
      items.value?.push(...resources);
      hasMore.value =
        (pager.page - 1) * pager.per_page + resources.length < pager.count;
      page.value += 1;
    };
    useAfterMe(fetchItems)
    watch(
      () => [props.startDate, props.endDate],
      () => {
        items.value = [];
        hasMore.value = false;
        page.value = 0;
        fetchItems();
      }
    );

    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0,
    });
    const fetchItemsBalance = async () => {
      if (!props.startDate || !props.endDate) {
        return;
      }
      const response = await defaultHttpClient.get(
        "/items/balance",
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          page: page.value + 1,
        },
        { _mock: "itemIndexBalance", _autoLoading: true }
      );
      Object.assign(itemsBalance, response.data);
    };
    useAfterMe(fetchItemsBalance)
    watch(
      () => [props.startDate, props.endDate],
      () => {
        Object.assign(itemsBalance, {
          expenses: 0,
          income: 0,
          balance: 0,
        });
        fetchItemsBalance();
      }
    );
    return () => (
      <div class={s.wrapper}>
        {items.value && items.value.length > 0 ? (
          <>
            <ul class={s.total}>
              <li>
                <span>收入</span>
                <Money value={itemsBalance.income} />
              </li>
              <li>
                <span>支出</span>
                <Money value={itemsBalance.expenses} />
              </li>
              <li>
                <span>净收入</span>
                <Money value={itemsBalance.balance} />
              </li>
            </ul>
            <ol class={s.list}>
              {items.value.map((item) => (
                <li>
                  <div class={s.sign}>
                    <span>
                      {item.tags && item.tags.length > 0
                        ? item.tags[0].sign
                        : "💰"}
                    </span>
                  </div>
                  <div class={s.text}>
                    <div class={s.tagAndAmount}>
                      <span class={s.tag}>
                        {item.tags && item.tags.length > 0
                          ? item.tags[0].name
                          : "未分类"}
                      </span>
                      <span class={s.amount}>
                        ￥<Money value={item.amount} />
                      </span>
                    </div>
                    <div class={s.time}>
                      <DateTime value={item.happen_at} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div class={s.more}>
              {hasMore.value ? (
                <Button onClick={fetchItems}>加载更多</Button>
              ) : (
                <span>没有更多</span>
              )}
            </div>
          </>
        ) : (
          <>
            <Center class={s.pig_wrapper}>
              <Icon name="save" class={s.pig}></Icon>
            </Center>
            <div class={s.button_wrapper}>
              <RouterLink to="/items/create">
                <Button class={s.button}>开始记账</Button>
              </RouterLink>
            </div>
          </>
        )}
        <RouterLink to="/items/create">
          <FloatButton IconName="add" />
        </RouterLink>
      </div>
    );
  },
});
