import { defineComponent,PropType, reactive} from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { Form, FormItem } from '../shared/Form';
import { Icon } from '../shared/Icon';
import s from './SignPage.module.scss';
export const SignPage = defineComponent({
  setup:(props,context)=>{
    const formDate = reactive({
        email:'',
        mailCode:''
    })
    const errors = reactive({
      email:[],
      mailCode:[]
    })
    return ()=>(
    <MainLayout>{
    {
        title:()=>'登录',
        icon:()=><Icon name="left"/>,
        default:()=>
        
        <div class={s.wrapper}>
            <Form>
                <FormItem label='邮箱地址' type='text'
                v-model={formDate.email} error={errors.email?.[0] ?? ' '}
                ></FormItem>
                <FormItem label='验证码' type='mailCode'></FormItem>
                <FormItem>
                    <Button size='large' class={s.button}>登录</Button>
                </FormItem>
            </Form>
        </div>
    }    
    }
    </MainLayout>
    )
  }
})