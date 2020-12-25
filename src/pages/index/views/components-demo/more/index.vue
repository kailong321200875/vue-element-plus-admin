<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="显示更多组件。"
      type="info"
      style="margin-bottom: 20px;"
    />

    <el-alert
      effect="dark"
      :closable="false"
      title="默认显示一行，超出隐藏。"
      type="info"
      style="margin-bottom: 20px;margin-top: 20px;"
    />
    <div>
      <More :line-clamp="3" content="2020版是根据（前端）全栈工程师岗位要求，结合时下技术热点及未来前端术发展趋势全新制作的课程，让你实现从零基础到具备全栈能力的就业水平。相比之前的版本，我们有几大重要内容：1. 两大核心企业项目贯穿整个体系，实现项目闭环开发，亲历从0到1的企业级项目。项目之间强关联，还原企业开发模式，渐进式实现，过程更顺滑。第一个旅游网项目，还原企业迭代开发，同一个项目从PC端演变到移动webapp，掌握跨端开发能力。 第二个电商全栈项目，用Vue.js 实现前端，node.js+koa2+MongoDB实现后端，打造6大核心业务，15+精美网页，12+真实数据接口，并打通前后端数据联调。2. 项目驱动式教学，案例融入课程讲解中，让学习不枯燥。多领域案例帮你开拓眼界和经验。3. 不用担心版本问题，课程截止上线使用最新版本。比如Vue3.0等，让大家学到新技术。4. 技术覆盖更实用更全面，从0基础到全栈能力循序渐进的培养，慕课网宗旨只学有用的。帮你打通跨端和全栈技能。5. 慕课网网红讲师亲授，讲解更细致，阶梯式习题，整门课程代码量将达到6万行，相当于1~2年工作经验所敲代码。" />
    </div>
    <el-alert
      effect="dark"
      :closable="false"
      title="默认显示3行，超出隐藏。"
      type="info"
      style="margin-bottom: 20px;margin-top: 20px;"
    />
    <div>
      <More :line-clamp="3" content="2020版是根据（前端）全栈工程师岗位要求，结合时下技术热点及未来前端术发展趋势全新制作的课程，让你实现从零基础到具备全栈能力的就业水平。相比之前的版本，我们有几大重要内容：1. 两大核心企业项目贯穿整个体系，实现项目闭环开发，亲历从0到1的企业级项目。项目之间强关联，还原企业开发模式，渐进式实现，过程更顺滑。第一个旅游网项目，还原企业迭代开发，同一个项目从PC端演变到移动webapp，掌握跨端开发能力。 第二个电商全栈项目，用Vue.js 实现前端，node.js+koa2+MongoDB实现后端，打造6大核心业务，15+精美网页，12+真实数据接口，并打通前后端数据联调。2. 项目驱动式教学，案例融入课程讲解中，让学习不枯燥。多领域案例帮你开拓眼界和经验。3. 不用担心版本问题，课程截止上线使用最新版本。比如Vue3.0等，让大家学到新技术。4. 技术覆盖更实用更全面，从0基础到全栈能力循序渐进的培养，慕课网宗旨只学有用的。帮你打通跨端和全栈技能。5. 慕课网网红讲师亲授，讲解更细致，阶梯式习题，整门课程代码量将达到6万行，相当于1~2年工作经验所敲代码。" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import More from '_c/More/index.vue'
export default defineComponent({
  // name: 'MoreDemo',
  components: {
    More
  }
})
</script>

<style>
</style>
