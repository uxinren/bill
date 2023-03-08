import { defineComponent,onMounted,PropType, ref} from 'vue';
import s from './LineCharts.module.scss';
import * as echarts from 'echarts';
export const LineCharts = defineComponent({
  setup:(props,context)=>{
    const refDiv = ref<HTMLDivElement>()
    onMounted(()=>{
        if(refDiv.value === undefined){return}
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(refDiv.value);
        // 绘制图表
        const option = {
          grid:{
            left:0,top:0,right:0,bottom:20
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true
            }
          ]
        };
        myChart.setOption(option);
      })
    return ()=>(
        <div ref={refDiv} class={s.wrapper}></div>
    )
  }
})