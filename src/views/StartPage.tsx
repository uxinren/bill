import { defineComponent} from "vue";
import { RouterLink } from "vue-router";
import { MainLayout } from "../layouts/MainLayout";
import {Button} from "../shared/Button"
import {Center} from '../shared/Center';
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { OverlayIcon } from "../shared/Overlay";
import s from './StartPage.module.scss';

export const StartPage = defineComponent({
    setup:(props,context)=>{
       return ()=><>
            <MainLayout>{{
                title:()=>'彩虹记账',
                icon:()=><OverlayIcon/>,
                default:()=><>
                <Center class={s.pig_wrapper}>
                    <Icon name="save" class={s.pig}></Icon>
                </Center>
                <div class={s.button_wrapper}>
                    <RouterLink to="/items/create">
                        <Button size="large" level="primary" class={s.button}>开始记账</Button>
                    </RouterLink>
                    <RouterLink to="/items/create">
                        <FloatButton IconName="add"/>
                    </RouterLink>

                </div>
                </>}}
            </MainLayout>    
       </>
    }
})