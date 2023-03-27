import { Dialog } from "vant";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { BackIcon } from "../../shared/BackIcon";
import { Button } from "../../shared/Button";
import { defaultHttpClient } from "../../shared/HttpClient";
import s from "./Tag.module.scss";
import { TagForm } from "./TagForm";
export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute();
    const numberId = parseInt(route.params.id!.toString());
    if (Number.isNaN(numberId)) {
      return () => {
        <div>id不存在</div>;
      };
    }
    const onError = () => {
      Dialog.alert({
        title: "错误",
        message: "id不存在",
      });
    };
    const router = useRouter();
    const onDelete = async (options?: { withItems?: boolean }) => {
      await Dialog.confirm({
        title: "删除标签",
        message: "确认删除标签吗？",
      });
      await defaultHttpClient
      .delete(`/tags/${numberId}`, {
        with_items: options?.withItems ? 'true' : 'false',
      }, {_autoLoading: true})
        .catch(onError);
      router.back();
    };
    return () => (
      <MainLayout>
        {{
          title: () => "编辑标签",
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagForm id={numberId} />
              <div class={s.action}>
                <Button
                  level="danger"
                  size="large"
                  onClick={() => onDelete({ withItems: true })}
                >
                  全部删除
                </Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
