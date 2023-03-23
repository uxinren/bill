import { RouteRecordRaw } from 'vue-router'
import { First } from '../components/welcome/First'
import { FirstAction } from '../components/welcome/FirstAction'
import { SecondAction } from '../components/welcome/SecondAction'
import { ThirdAction } from '../components/welcome/ThirdAction'
import { ForthAction } from '../components/welcome/ForthAction'
import { Second } from '../components/welcome/Second'
import { Third } from '../components/welcome/Third'
import { Forth } from '../components/welcome/Forth'
import { Welcome } from '../views/Welcome'
import { ItemPage } from '../views/ItemPage'
import { ItemList } from '../components/item/ItemList'
import { ItemCreate } from '../components/item/ItemCreate'
import { TagPage } from '../views/TagPage'
import { TagCreate } from '../components/tag/TagCreate'
import { TagEdit } from '../components/tag/TagEdit'
import { SignPage } from '../views/SignPage'
import { StatisticsPage } from '../views/StatisticsPage'
import { defaultHttpClient } from '../shared/HttpClient'
import { ComingSoon } from '../shared/ComingSoon'

export const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/welcome' },
    {
      path: '/welcome',
      component: Welcome,
      beforeEnter: (to, from, next) => {
        localStorage.getItem('skipFeatures') === 'yes' ? next('/items') : next()
      },
      children: [
        { path: '', redirect: '/welcome/1', },
        { path: '1', name:"welcome1", components: { main: First, footer: FirstAction }, },
        { path: '2', name:"welcome2", components: { main: Second, footer: SecondAction }, },
        { path: '3', name:"welcome3", components: { main: Third, footer: ThirdAction}, },
        { path: '4', name:"welcome4", components: { main: Forth, footer: ForthAction }, },
      ]
    },
    {path:'/items',component:ItemPage,
    children:[
      { path:'',component:ItemList},
      { path:'create',component:ItemCreate},
    ]},
  {path:'/tags', component: TagPage,
  children:[
    {path:'create', component:TagCreate},
    {path:':id/edit', component:TagEdit},
  ]},
  {path:'/sign_in',component: SignPage},
  {path:'/statistics',component: StatisticsPage},
  {path: '/export', component: ComingSoon},
  {path: '/notify', component: ComingSoon}
  ]
