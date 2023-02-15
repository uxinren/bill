import { defineComponent} from "vue";
import {Button} from "../shared/Button"
import { FloatButton } from "../shared/FloatButton";
import s from './StartPage.module.scss';

export const startPage = defineComponent({
    setup:(props,context)=>{
        const onClick = () => {
            console.log('hi');
        }
       return ()=><>
        <div>
            <div class={s.button_wrapper}>
            <Button class={s.button} onClick={onClick}>测试</Button>
            <FloatButton></FloatButton>
            </div>
        </div>
       </>
    }
})