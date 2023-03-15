import { defineComponent,onUpdated,PropType, ref} from 'vue';
import { defaultHttpClient } from '../../shared/HttpClient';
import { Icon } from '../../shared/Icon';
import { useTags } from '../../shared/UserTags';
import s from './Tags.module.scss';
export const Tags = defineComponent({
    props:{
      kind:{
        type: String as PropType<string>,
        required:true
    }
  },
  setup:(props,context)=>{
        //初始化类型、是否更多、当前页
        const {hasMore,tags,fetchTags} = useTags((page)=>{
          return defaultHttpClient.get<Resources<Tag>>("/tags", {
            kind: props.kind,
            page: page + 1,
            _mock: "tagIndex",
          });
        })
    return ()=><>
                <div class={s.tags_wrapper}>
                    <div class={s.tag}>
                        <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                        </div>
                        <div class={s.name}>新增</div>
                    </div>
                    {tags.value.map((tag) => (
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
                </div>
    </>
  }
})