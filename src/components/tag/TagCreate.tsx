import { defineComponent, PropType } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { BackIcon } from "../../shared/BackIcon";
import { Icon } from "../../shared/Icon";
import { TagForm } from "./TagForm";
export const TagCreate = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {{
          title: () => "新建标签",
          icon: () => <BackIcon />,
          default: () => <TagForm />,
        }}
      </MainLayout>
    );
  },
});
