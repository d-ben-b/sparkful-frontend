<template>
  <transition name="menu">
    <HamburgerComp v-if="states.isMenuOpen" @close="() => toggle('isMenuOpen')" class="hamburger-menu" />
  </transition>
  <transition name="VIPmenu">
    <VIPmenu v-if="states.VIPmenuOpen" @close="() => toggle('VIPmenuOpen')" class="" />
  </transition>
  <transition name="menu">
    <UploadModal v-if="states.isUploadOpen" @close="() => toggle('isUploadOpen')" class="upload-menu"
      @toggle-close="() => toggle('isUploadOpen')" @toggle-upgrade="() => showUpgrade = true" />
  </transition>
  <UpgradeModal v-if="showUpgrade" @click="showUpgrade = !showUpgrade" />
  <nav class="bar">
    <img src="@/assets/img/icons/EatSmart.png" alt="title Image" class="icon" @click="goto('home')" />
    <img src="@/assets/img/profile/1.png" alt="profile Image" class="icon" @click="goto('personal-page')" />
    <div class="upload">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
        @click="() => toggle('isUploadOpen')" class="upload-icon">
        <path d="M24 2V24V46M2 24H46" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <div v-if="isVIP" @click="() => toggle('VIPmenuOpen')">
      <img src="@/assets/img/VIP/VIPbutton.png" alt="" class="premium" />
    </div>
    <div @click="() => toggle('isMenuOpen')">
      <img src="@/assets/img/navibar_icon/hamburger.png" alt="" class="hamburger" />
    </div>
  </nav>
  <div class="background" v-if="open_modal_background"></div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGoto } from '@/util/utility'
import HamburgerComp from '@/components/drop_down/HamburgerComp.vue'
import VIPmenu from '@/components/drop_down/VIPmenu.vue'
import UploadModal from '@/components/modal/UploadModal.vue'
import UpgradeModal from '@/components/modal/UpgradeModal.vue'

const states = ref({
  isMenuOpen: false,
  isUploadOpen: false,
  VIPmenuOpen: false,
})

const open_modal_background = ref(false)
const isVIP = ref(true)
const showUpgrade = ref(true)

const goto = useGoto()
const router = useRouter()

const toggle = (key) => {
  Object.keys(states.value).forEach((stateKey) => {
    states.value[stateKey] = stateKey === key ? !states.value[stateKey] : false
  })
}

watch(
  () => router.currentRoute.value.name,
  () => {
    closeMenu()
  },
)
watch(
  () => Object.values(states.value).some((state) => state),
  (isAnyMenuOpen) => {
    open_modal_background.value = isAnyMenuOpen
  },
)
const closeMenu = () => {
  states.value.isMenuOpen = false
  states.value.VIPmenuOpen = false
  states.value.isUploadOpen = false
}
</script>

<style scoped>
.background {
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
}

.bar {
  padding: 0px;
  background: #e0f1cc;
  position: relative;
  z-index: 101;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 129px;
  gap: 40px;
  padding: 0;
}

.icon {
  width: 73px;
  height: 73px;
  cursor: pointer;
}

ul {
  display: flex;
  list-style: none;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

li {
  cursor: pointer;
}

.search-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
}

.search-block img {
  width: 60px;
  height: 60px;
  border-radius: 100px;
}

.search-block p {
  font-weight: 800;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0%;
  margin-top: 5px;
  margin-bottom: 0;
}

.hamburger {
  z-index: 101;
  width: 109px;
  height: 109px;
  cursor: pointer;
  right: 34px;
  top: 11px;
}

.hamburger-menu {
  z-index: 100;
}

/* 定義進入/離開動畫 */
.VIPmenu-enter-active {
  animation: menuAdded 0.5s;
}

.VIPmenu-leave-active {
  animation: menuAdded 0.5s reverse;
}

.premium {
  cursor: pointer;
  width: 109px;
  height: 109px;
  position: relative;
}

.upload {
  flex-grow: 1;
}

.upload-icon {
  cursor: pointer;
}

@keyframes menuAdded {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}
</style>
