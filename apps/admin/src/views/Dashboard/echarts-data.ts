import type { EChartsOption } from 'echarts'
import type {
  MonthlySales,
  UserAccessSource,
  WeeklyUserActivity
} from '@/api/dashboard/analysis/types'

type Translate = (key: string) => string

export const createLineOptions = (t: Translate, data: MonthlySales[]): EChartsOption => ({
  title: {
    text: t('analysis.monthlySales'),
    left: 'center'
  },
  xAxis: {
    type: 'category',
    data: data.map((item) => t(item.name)),
    boundaryGap: false,
    axisTick: { show: false }
  },
  grid: {
    left: 20,
    right: 20,
    bottom: 20,
    top: 80,
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' },
    padding: [5, 10]
  },
  yAxis: {
    type: 'value',
    axisTick: { show: false }
  },
  legend: {
    data: [t('analysis.estimate'), t('analysis.actual')],
    top: 50
  },
  series: [
    {
      name: t('analysis.estimate'),
      type: 'line',
      smooth: true,
      data: data.map((item) => item.estimate),
      animationDuration: 2800,
      animationEasing: 'cubicInOut'
    },
    {
      name: t('analysis.actual'),
      type: 'line',
      smooth: true,
      data: data.map((item) => item.actual),
      animationDuration: 2800,
      animationEasing: 'quadraticOut'
    }
  ]
})

export const createPieOptions = (t: Translate, data: UserAccessSource[]): EChartsOption => {
  const seriesData = data.map((item) => ({ name: t(item.name), value: item.value }))

  return {
    title: {
      text: t('analysis.userAccessSource'),
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: seriesData.map((item) => item.name)
    },
    series: [
      {
        name: t('analysis.userAccessSource'),
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: seriesData
      }
    ]
  }
}

export const createBarOptions = (t: Translate, data: WeeklyUserActivity[]): EChartsOption => ({
  title: {
    text: t('analysis.weeklyUserActivity'),
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  grid: {
    left: 50,
    right: 20,
    bottom: 20
  },
  xAxis: {
    type: 'category',
    data: data.map((item) => t(item.name)),
    axisTick: { alignWithLabel: true }
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: t('analysis.activeQuantity'),
      type: 'bar',
      data: data.map((item) => item.value)
    }
  ]
})
