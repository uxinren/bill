import { defineComponent, ref} from "vue";
import { RouterLink } from "vue-router";
import {Button} from "../shared/Button"
import {Center} from '../shared/Center';
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
import { Overlay } from "../shared/Overlay";
import s from './StartPage.module.scss';

export const startPage = defineComponent({
    setup:(props,context)=>{
        const refOverlayVisible=ref(false)
        const onClickMenu = () => {
            refOverlayVisible.value = !refOverlayVisible.value
            console.log(refOverlayVisible.value)
        };
       return ()=><>
        <div>
            <nav class={s.nav_wrapper}>
                <Navbar>{
                    {default:()=>'彩虹记账',
                    icon:()=><Icon name="menu" class={s.icon} onClick={onClickMenu}/> }
                }
                </Navbar>
            </nav>
            <Center class={s.pig_wrapper}>
                <Icon name="save" class={s.pig}></Icon>
            </Center>
            <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                    <Button class={s.button}>开始记账</Button>
                </RouterLink>
                <RouterLink to="/items/create">
                    <FloatButton IconName="add"/>
                </RouterLink>
            {refOverlayVisible.value && 
                <Overlay onClose={()=>refOverlayVisible.value = false}/>
            }
            </div>
        </div>
       </>
    }
})