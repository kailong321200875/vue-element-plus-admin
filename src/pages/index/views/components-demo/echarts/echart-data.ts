import type { EChartOption } from 'echarts'
export const lineOptions: EChartOption = {
  xAxis: {
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
    boundaryGap: false,
    axisTick: {
      show: false
    }
  },
  grid: {
    left: 10,
    right: 10,
    bottom: 20,
    top: 30,
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    padding: [5, 10]
  },
  yAxis: {
    axisTick: {
      show: false
    }
  },
  legend: {
    data: ['预期', '实际']
  },
  series: [{
    name: '预期',
    itemStyle: {
      normal: {
        color: '#FF005A',
        lineStyle: {
          color: '#FF005A',
          width: 2
        }
      }
    },
    smooth: true,
    type: 'line',
    data: [100, 120, 161, 134, 105, 160, 165],
    animationDuration: 2800,
    animationEasing: 'cubicInOut'
  },
  {
    name: '实际',
    smooth: true,
    type: 'line',
    itemStyle: {
      normal: {
        color: '#3888fa',
        lineStyle: {
          color: '#3888fa',
          width: 2
        },
        areaStyle: {
          color: '#f3f8ff'
        }
      }
    },
    data: [120, 82, 91, 154, 162, 140, 145, 250, 134, 56, 99, 123],
    animationDuration: 2800,
    animationEasing: 'quadraticOut'
  }
  ]
}

export const pieOptions: EChartOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  series: [{
    name: '用户访问来源',
    type: 'pie',
    radius: '55%',
    center: ['50%', '60%'],
    data: [{
      value: 335,
      name: '直接访问'
    },
    {
      value: 310,
      name: '邮件营销'
    },
    {
      value: 234,
      name: '联盟广告'
    },
    {
      value: 135,
      name: '视频广告'
    },
    {
      value: 1548,
      name: '搜索引擎'
    }
    ],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
}

export const barOptions: EChartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    name: '活跃量',
    data: [13253, 34235, 26321, 12340, 24643, 1322, 1324],
    type: 'bar'
  }]
}

export const pieOptions2: EChartOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  series: [{
    name: '访问来源',
    type: 'pie',
    radius: '55%',
    center: ['50%', '50%'],
    data: [{
      value: 335,
      name: '直接访问'
    },
    {
      value: 310,
      name: '邮件营销'
    },
    {
      value: 274,
      name: '联盟广告'
    },
    {
      value: 235,
      name: '视频广告'
    },
    {
      value: 400,
      name: '搜索引擎'
    }
    ].sort(function(a, b) {
      return a.value - b.value
    }),
    roseType: 'radius',
    label: {
      normal: {
      }
    },
    labelLine: {
      normal: {
        smooth: 0.2,
        length: 10,
        length2: 20
      }
    },
    animationType: 'scale',
    animationEasing: 'elasticOut',
    animationDelay: function() {
      return Math.random() * 200
    }
  }]
}
