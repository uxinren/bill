import { defineComponent, onUpdated, PropType, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { defaultHttpClient } from "../../shared/HttpClient";
import { Icon } from "../../shared/Icon";
import { useTags } from "../../shared/UserTags";
import s from "./Tags.module.scss";
export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true,
    },
    selected: {
      type: Number,
    },
  },
  emits: ["update:selected"],
  setup: (props, context) => {
    //初始化类型、是否更多、当前页
    const { hasMore, tags, fetchTags } = useTags((page) => {
      return defaultHttpClient.get<Resources<Tag>>("/tags", {
        kind: props.kind,
        page: page + 1},
        {_mock: "tagIndex", _autoLoading: true}
        );
    });
    const router = useRouter()
    const onSelect = (tag: Tag) => {
      context.emit("update:selected", tag.id);
    };
    const onLongPress = (tagId: Tag['id']) => {
      router.push(`/tags/${tagId}/edit?kind=${props.kind}`)
    };
    const timerRef = ref<number>();
    const currentTagRef = ref<HTMLDivElement>();
    const ontouchsStart = (e: TouchEvent,tag:Tag) => {
      currentTagRef.value = e.target as HTMLDivElement;
      timerRef.value = setTimeout(() => {
        onLongPress(tag.id);
      }, 600);
    };
    const ontouchsEnd = (e: TouchEvent) => {
      clearTimeout(timerRef.value);
    };
    const onTouchsMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientY
      );
      if (
        currentTagRef.value !== pointedElement &&
        currentTagRef.value?.contains(pointedElement) === false
      ) {
        clearTimeout(timerRef.value);
      }
    };
    return () => (
      <>
        <div class={s.tags_wrapper} onTouchmove={onTouchsMove}>
          <RouterLink to={`/tags/create?kind=${props.kind}`} class={s.tag}>
            <div class={s.sign}>
              <Icon name="add" class={s.createTag} />
            </div>
            <div class={s.name}>新增</div>
          </RouterLink>
          {tags.value.map((tag) => (
            <div
              class={[s.tag, props.selected === tag.id ? s.selected : ""]}
              onClick={() => onSelect(tag)}
              onTouchstart={(e)=>ontouchsStart(e,tag)}
              onTouchend={ontouchsEnd}
            >
              <div class={s.sign}>{tag.sign}</div>
              <div class={s.name}>{tag.name}</div>
            </div>
          ))}
          <div>
            {hasMore.value ? (
              <div class={s.tag} onClick={fetchTags}>
                <div class={s.sign}>
                  <Icon name="more" class={s.createTag} />
                </div>
                <div class={s.name}>更多</div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  },
});
