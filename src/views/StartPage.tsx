import { defineComponent} from "vue";
import {Button} from "../shared/Button"
import {Center} from '../shared/Center';
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
import s from './StartPage.module.scss';

export const startPage = defineComponent({
    setup:(props,context)=>{
        const onClick = () => {
            console.log('hi');
        }
       return ()=><>
        <div>
            <nav class={s.nav_wrapper}>
                <Navbar>{
                    {default:'彩虹记账',icon:<Icon name="menu" class={s.icon}/> }
                }
                </Navbar>
            </nav>
            <Center class={s.pig_wrapper}>
                <Icon name="save" class={s.pig}></Icon>
            </Center>
            <div class={s.button_wrapper}>
            <Button class={s.button} onClick={onClick}>测试</Button>
            <FloatButton IconName="add"/>
            </div>
        </div>
       </>
    }
})