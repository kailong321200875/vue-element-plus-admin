<script setup lang="ts">
  import { ref } from 'vue'
  import { LoginForm, RegisterForm } from './components'
  import { ThemeSwitch } from '@vea/components'
  import { LocaleDropdown } from '@/components/LocaleDropdown'
  import { useI18n } from 'vue-i18n'
  import { useAppStore } from '@/store/modules/app'
  import { appConfig } from '@/config/app'

  const appStore = useAppStore()
  const { t } = useI18n()
  const isLogin = ref(true)
</script>

<template>
  <main class="login-page" :class="{ 'is-dark': appStore.isDark }">
    <div class="ambient ambient--cyan" aria-hidden="true"></div>
    <div class="ambient ambient--pink" aria-hidden="true"></div>

    <header class="login-header">
      <div class="brand">
        <span class="brand-mark">
          <img src="@/assets/imgs/logo.png" alt="" />
        </span>
        <span class="brand-name">{{ appConfig.title }}</span>
      </div>

      <div class="login-tools">
        <ThemeSwitch v-model="appStore.isDark" />
        <span class="tool-divider"></span>
        <LocaleDropdown color="var(--login-tool-color)" />
      </div>
    </header>

    <section class="login-visual">
      <div class="visual-copy">
        <div class="visual-kicker"><span></span>WORKSPACE / V3</div>
        <h1>{{ t('login.welcome') }}</h1>
        <p>{{ t('login.message') }}</p>
      </div>

      <div class="workspace-scene" aria-hidden="true">
        <div class="scene-orbit"></div>
        <div class="scene-beam scene-beam--cyan"></div>
        <div class="scene-beam scene-beam--pink"></div>

        <div class="scene-window scene-window--main">
          <div class="window-bar"><i></i><i></i><i></i><span></span></div>
          <div class="window-body">
            <div class="window-nav"><i></i><i></i><i></i><i></i></div>
            <div class="window-content">
              <span class="content-line content-line--wide"></span>
              <span class="content-line"></span>
              <div class="mini-chart"> <i></i><i></i><i></i><i></i><i></i> </div>
            </div>
          </div>
        </div>

        <div class="scene-window scene-window--signal">
          <span>FLOW</span>
          <strong>24/7</strong>
          <div class="signal-line"><i></i></div>
        </div>

        <div class="scene-window scene-window--route">
          <i></i><span></span><i></i><span></span><i></i>
        </div>

        <span class="scene-node scene-node--one"></span>
        <span class="scene-node scene-node--two"></span>
      </div>
    </section>

    <section class="form-stage">
      <div class="form-card">
        <Transition name="form-swap" mode="out-in">
          <LoginForm v-if="isLogin" key="login" @to-register="isLogin = false" />
          <RegisterForm v-else key="register" @to-login="isLogin = true" />
        </Transition>
      </div>
    </section>
  </main>
</template>

<style lang="less" scoped>
  .login-page,
  .login-page *,
  .login-page *::before,
  .login-page *::after {
    box-sizing: border-box;
  }

  .login-page {
    --login-ink: #11182a;
    --login-muted: #68728a;
    --login-panel: #f4f7fc;
    --login-card: #fff;
    --login-line: #e7ebf3;
    --login-cyan: #19c6df;
    --login-blue: #347edf;
    --login-pink: #df2aa7;
    --login-tool-color: #34405a;

    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 56%) minmax(420px, 44%);
    height: 100vh;
    height: 100dvh;
    min-height: 100vh;
    min-height: 100dvh;
    overflow: clip;
    color: var(--login-ink);
    background: var(--login-panel);
    isolation: isolate;

    &::before {
      position: absolute;
      inset: 0 auto 0 0;
      z-index: -3;
      width: 61%;
      background:
        radial-gradient(circle at 21% 18%, rgb(25 198 223 / 20%), transparent 28%),
        radial-gradient(circle at 72% 78%, rgb(223 42 167 / 17%), transparent 30%),
        linear-gradient(142deg, #0c1224 0%, #111a32 52%, #17213c 100%);
      clip-path: polygon(0 0, 92% 0, 100% 100%, 0 100%);
      content: '';
    }

    &::after {
      position: absolute;
      z-index: -2;
      width: 58%;
      background-image:
        linear-gradient(rgb(255 255 255 / 8%) 1px, transparent 1px),
        linear-gradient(90deg, rgb(255 255 255 / 8%) 1px, transparent 1px);
      background-size: 48px 48px;
      content: '';
      opacity: 0.26;
      inset: 0 auto 0 0;
      mask-image: linear-gradient(to right, #000 30%, transparent 94%);
    }
  }

  .login-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 28px clamp(28px, 3.5vw, 58px);
  }

  .brand {
    display: flex;
    gap: 12px;
    align-items: center;
    color: #fff;
  }

  .brand-mark {
    display: grid;
    width: 42px;
    height: 42px;
    background: rgb(255 255 255 / 8%);
    border: 1px solid rgb(255 255 255 / 16%);
    border-radius: 13px;
    box-shadow: inset 0 1px rgb(255 255 255 / 12%);
    place-items: center;
    backdrop-filter: blur(10px);

    img {
      width: 31px;
      height: 31px;
      object-fit: contain;
    }
  }

  .brand-name {
    max-width: 38vw;
    overflow: hidden;
    font-family: 'Avenir Next', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    font-size: 17px;
    font-weight: 650;
    letter-spacing: 0.01em;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .login-tools {
    display: flex;
    padding: 8px 11px;
    background: rgb(255 255 255 / 72%);
    border: 1px solid rgb(17 24 39 / 7%);
    border-radius: 999px;
    box-shadow: 0 8px 28px rgb(39 51 89 / 8%);
    gap: 12px;
    align-items: center;
    backdrop-filter: blur(14px);
  }

  .tool-divider {
    width: 1px;
    height: 17px;
    background: rgb(17 24 39 / 12%);
  }

  .login-visual {
    display: flex;
    flex-direction: column;
    grid-column: 1;
    justify-content: center;
    min-height: 100dvh;
    padding: 116px clamp(48px, 7vw, 112px) 54px clamp(42px, 6vw, 96px);
    color: #fff;
  }

  .visual-copy {
    position: relative;
    z-index: 2;
    max-width: 620px;

    h1 {
      max-width: 590px;
      margin: 20px 0 16px;
      font-family: 'Avenir Next', 'PingFang SC', 'Microsoft YaHei', sans-serif;
      font-size: clamp(38px, 4.2vw, 66px);
      font-weight: 720;
      line-height: 1.08;
      letter-spacing: -0.035em;
    }

    p {
      max-width: 520px;
      margin: 0;
      font-size: clamp(15px, 1.35vw, 18px);
      line-height: 1.75;
      color: rgb(226 234 255 / 70%);
    }
  }

  .visual-kicker {
    display: flex;
    font-family: SFMono-Regular, Consolas, monospace;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    color: rgb(218 230 255 / 72%);
    gap: 10px;
    align-items: center;

    span {
      width: 24px;
      height: 2px;
      background: linear-gradient(90deg, var(--login-cyan), var(--login-pink));
    }
  }

  .workspace-scene {
    position: relative;
    width: min(560px, 46vw);
    height: clamp(260px, 34vh, 350px);
    margin-top: clamp(34px, 5vh, 64px);
    perspective: 900px;
  }

  .scene-orbit {
    position: absolute;
    top: 11%;
    left: 2%;
    width: 92%;
    height: 72%;
    border: 1px solid rgb(113 211 241 / 20%);
    border-radius: 50%;
    transform: rotate(-9deg);
    box-shadow: 0 0 80px rgb(42 153 218 / 8%);
  }

  .scene-beam {
    position: absolute;
    filter: drop-shadow(0 0 22px currentcolor);

    &--cyan {
      top: 2%;
      right: 18%;
      width: 125px;
      height: 255px;
      color: rgb(25 198 223 / 24%);
      background: linear-gradient(180deg, rgb(25 198 223 / 38%), rgb(52 126 223 / 4%));
      clip-path: polygon(0 0, 100% 0, 48% 100%);
      transform: rotate(13deg);
    }

    &--pink {
      top: 14%;
      right: 40%;
      width: 88px;
      height: 185px;
      color: rgb(223 42 167 / 22%);
      background: linear-gradient(180deg, rgb(223 42 167 / 35%), rgb(223 42 167 / 3%));
      clip-path: polygon(0 0, 100% 0, 52% 100%);
      transform: rotate(-18deg);
    }
  }

  .scene-window {
    position: absolute;
    background: linear-gradient(145deg, rgb(30 43 75 / 91%), rgb(17 27 51 / 88%));
    border: 1px solid rgb(255 255 255 / 15%);
    box-shadow: 0 26px 70px rgb(0 5 22 / 34%);
    backdrop-filter: blur(14px);
  }

  .scene-window--main {
    top: 7%;
    left: 7%;
    width: 72%;
    height: 76%;
    overflow: hidden;
    border-radius: 20px;
    transform: rotateY(6deg) rotateX(2deg);
    animation: scene-float 7s ease-in-out infinite;
  }

  .window-bar {
    display: flex;
    gap: 6px;
    align-items: center;
    height: 39px;
    padding: 0 14px;
    border-bottom: 1px solid rgb(255 255 255 / 8%);

    i {
      width: 6px;
      height: 6px;
      background: rgb(255 255 255 / 20%);
      border-radius: 50%;
    }

    i:first-child {
      background: var(--login-pink);
    }

    span {
      width: 32%;
      height: 5px;
      margin-left: auto;
      background: rgb(255 255 255 / 8%);
      border-radius: 99px;
    }
  }

  .window-body {
    display: grid;
    grid-template-columns: 22% 1fr;
    height: calc(100% - 39px);
  }

  .window-nav {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px 13px;
    border-right: 1px solid rgb(255 255 255 / 7%);

    i {
      width: 75%;
      height: 5px;
      background: rgb(255 255 255 / 10%);
      border-radius: 99px;
    }

    i:first-child {
      width: 100%;
      background: linear-gradient(90deg, var(--login-cyan), rgb(25 198 223 / 20%));
    }
  }

  .window-content {
    padding: 22px 20px;
  }

  .content-line {
    display: block;
    width: 36%;
    height: 7px;
    margin-bottom: 9px;
    background: rgb(255 255 255 / 12%);
    border-radius: 99px;

    &--wide {
      width: 62%;
      background: rgb(255 255 255 / 22%);
    }
  }

  .mini-chart {
    display: flex;
    height: 47%;
    padding: 0 3px 8px;
    margin-top: 20px;
    border-bottom: 1px solid rgb(255 255 255 / 11%);
    gap: 8px;
    align-items: end;

    i {
      height: 35%;
      background: linear-gradient(180deg, var(--login-cyan), rgb(52 126 223 / 28%));
      border-radius: 5px 5px 1px 1px;
      flex: 1;
    }

    i:nth-child(2) {
      height: 66%;
    }

    i:nth-child(3) {
      height: 48%;
      background: linear-gradient(180deg, var(--login-pink), rgb(223 42 167 / 24%));
    }

    i:nth-child(4) {
      height: 84%;
    }

    i:nth-child(5) {
      height: 61%;
    }
  }

  .scene-window--signal {
    right: 0;
    bottom: 4%;
    width: 31%;
    padding: 17px 18px;
    border-radius: 16px;
    animation: scene-float 6s 0.8s ease-in-out infinite reverse;

    span {
      font-family: SFMono-Regular, Consolas, monospace;
      font-size: 9px;
      letter-spacing: 0.18em;
      color: rgb(218 230 255 / 56%);
    }

    strong {
      display: block;
      margin-top: 4px;
      font-size: 22px;
      letter-spacing: -0.04em;
    }
  }

  .signal-line {
    position: relative;
    height: 3px;
    margin-top: 13px;
    overflow: hidden;
    background: rgb(255 255 255 / 9%);
    border-radius: 99px;

    i {
      position: absolute;
      width: 63%;
      background: linear-gradient(90deg, var(--login-pink), var(--login-cyan));
      border-radius: inherit;
      animation: signal-pulse 2.8s ease-in-out infinite;
      inset: 0 auto 0 0;
    }
  }

  .scene-window--route {
    top: 0;
    right: 2%;
    display: flex;
    gap: 6px;
    align-items: center;
    padding: 12px 14px;
    border-radius: 14px;
    animation: scene-float 8s 1.2s ease-in-out infinite;

    i {
      width: 7px;
      height: 7px;
      border: 2px solid var(--login-cyan);
      border-radius: 50%;
    }

    i:last-child {
      border-color: var(--login-pink);
    }

    span {
      width: 24px;
      height: 1px;
      background: rgb(255 255 255 / 24%);
    }
  }

  .scene-node {
    position: absolute;
    width: 8px;
    height: 8px;
    border: 2px solid rgb(255 255 255 / 70%);
    border-radius: 50%;
    box-shadow: 0 0 18px var(--login-cyan);

    &--one {
      bottom: 18%;
      left: 1%;
    }

    &--two {
      top: 20%;
      right: 7%;
      width: 5px;
      height: 5px;
      border-color: var(--login-pink);
      box-shadow: 0 0 16px var(--login-pink);
    }
  }

  .form-stage {
    position: relative;
    display: grid;
    grid-column: 2;
    min-height: 100dvh;
    padding: 104px clamp(32px, 5vw, 78px) 44px;
    place-items: center;

    &::before {
      position: absolute;
      top: 14%;
      right: -15%;
      width: 380px;
      height: 380px;
      background: radial-gradient(circle, rgb(52 126 223 / 9%), transparent 67%);
      border-radius: 50%;
      content: '';
    }
  }

  .form-card {
    position: relative;
    display: flex;
    width: min(100%, 440px);
    min-height: 610px;
    padding: clamp(32px, 4vw, 48px);
    background: var(--login-card);
    border: 1px solid rgb(255 255 255 / 86%);
    border-radius: 28px;
    box-shadow:
      0 30px 80px rgb(42 57 91 / 13%),
      0 2px 10px rgb(42 57 91 / 5%);
    align-items: center;

    &::before {
      position: absolute;
      top: 0;
      left: 30px;
      width: 82px;
      height: 3px;
      background: linear-gradient(90deg, var(--login-pink), var(--login-cyan));
      border-radius: 0 0 99px 99px;
      content: '';
    }
  }

  .ambient {
    position: absolute;
    z-index: -1;
    pointer-events: none;
    border-radius: 50%;
    filter: blur(1px);

    &--cyan {
      top: -110px;
      left: 42%;
      width: 280px;
      height: 280px;
      background: rgb(25 198 223 / 8%);
    }

    &--pink {
      right: -100px;
      bottom: -120px;
      width: 300px;
      height: 300px;
      background: rgb(223 42 167 / 7%);
    }
  }

  .form-swap-enter-active,
  .form-swap-leave-active {
    transition:
      opacity 180ms ease,
      transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .form-swap-enter-from {
    opacity: 0;
    transform: translateX(14px);
  }

  .form-swap-leave-to {
    opacity: 0;
    transform: translateX(-10px);
  }

  @keyframes scene-float {
    0%,
    100% {
      transform: translate3d(0, 0, 0) rotateY(6deg) rotateX(2deg);
    }

    50% {
      transform: translate3d(0, -9px, 0) rotateY(4deg) rotateX(1deg);
    }
  }

  @keyframes signal-pulse {
    0%,
    100% {
      width: 48%;
    }

    50% {
      width: 86%;
    }
  }

  .login-page.is-dark {
    --login-ink: #eef3ff;
    --login-muted: #9da9c1;
    --login-panel: #0d1425;
    --login-card: #151e31;
    --login-line: #27324a;
    --login-tool-color: #dce6fb;

    .login-tools {
      background: rgb(21 30 49 / 76%);
      border-color: rgb(255 255 255 / 9%);
    }

    .tool-divider {
      background: rgb(255 255 255 / 13%);
    }

    .form-card {
      border-color: rgb(255 255 255 / 7%);
      box-shadow: 0 30px 80px rgb(0 0 0 / 24%);
    }
  }

  @media (width <= 1080px) {
    .login-page {
      grid-template-columns: minmax(0, 51%) minmax(420px, 49%);

      &::before {
        width: 57%;
      }
    }

    .workspace-scene {
      width: 44vw;
    }

    .login-visual {
      padding-right: 54px;
      padding-left: 46px;
    }
  }

  @media (width <= 860px) {
    .login-page {
      display: block;
      height: 100dvh;
      overflow: hidden auto;
      background:
        radial-gradient(circle at 12% 8%, rgb(25 198 223 / 18%), transparent 28%),
        radial-gradient(circle at 90% 88%, rgb(223 42 167 / 14%), transparent 30%), #0e1629;

      &::before {
        display: none;
      }

      &::after {
        width: 100%;
        opacity: 0.14;
        mask-image: linear-gradient(to bottom, #000, transparent 72%);
      }
    }

    .login-header {
      padding: 22px 24px;
    }

    .login-tools {
      background: rgb(10 18 35 / 54%);
      border-color: rgb(255 255 255 / 12%);
    }

    .tool-divider {
      background: rgb(255 255 255 / 14%);
    }

    .login-page {
      --login-tool-color: #e8efff;
    }

    .login-visual {
      display: none;
    }

    .ambient,
    .form-stage::before {
      display: none;
    }

    .form-stage {
      min-height: 100dvh;
      padding: 96px 22px 28px;
    }

    .form-card {
      width: min(100%, 480px);
      animation: mobile-card-in 480ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }
  }

  @media (width <= 520px) {
    .login-header {
      padding: max(16px, env(safe-area-inset-top)) 16px 12px;
    }

    .brand {
      gap: 9px;
    }

    .brand-mark {
      width: 36px;
      height: 36px;
      border-radius: 11px;

      img {
        width: 27px;
        height: 27px;
      }
    }

    .brand-name {
      max-width: 43vw;
      font-size: 14px;
    }

    .login-tools {
      gap: 8px;
      padding: 6px 8px;
    }

    .form-stage {
      align-items: start;
      padding: 82px 14px max(18px, env(safe-area-inset-bottom));
    }

    .form-card {
      min-height: 0;
      padding: 30px 22px 26px;
      border-radius: 24px;
    }
  }

  @keyframes mobile-card-in {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.985);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scene-window,
    .signal-line i,
    .form-card {
      animation: none !important;
    }

    .form-swap-enter-active,
    .form-swap-leave-active {
      transition: none;
    }
  }
</style>
