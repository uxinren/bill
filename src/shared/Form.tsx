import { computed, defineComponent,PropType} from 'vue';
import { EmojiSelect } from './EmojiSelect';
import s from './Form.module.scss';
export const Form = defineComponent({
  props:{
    onSubmit:{
      type: Function as PropType<(e: Event) => void>
    }
  },
  setup:(props,context)=>{
    return ()=>(
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    )
  }
})



export const FormItem = defineComponent({
    props:{
      label:{
        type: String
    },
    modelValue:{
        type: [String,Number]
    },
    type:{
        type: String as PropType<'text'|'emojiSelect'|'date'>
    },
    error:{
        type: String
    }
  },
  setup: (props, context) => {
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input
            value={props.modelValue}
            onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
            class={[s.formItem, s.input, s.error]} />
        case 'emojiSelect':
          return <EmojiSelect
            modelValue={props.modelValue?.toString()}
            onUpdateModelValue={ value => context.emit('update:modelValue', value)}
            class={[s.formItem, s.emojiList, s.error]} />
        case 'date':
          return <input />
        case undefined:
          return context.slots.default?.()
      }
    })
    return ()=>{
      return <div class={s.formRow}>
        <label class={s.label}>{props.label}</label>
      </div>
    }
  }
})