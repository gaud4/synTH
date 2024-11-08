<template>
  <ThemeProvider id="App" :namespace="DEFAULT_NAMESPACE" use-root>
    <OverlayScrollbarsComponent
      id="App__overlay-container"
      :options="{
        paddingAbsolute: true,
        scrollbars: {
          autoHide: 'leave',
        },
      }"
    >
      <div id="App__container">
        <NotificationRegister />

        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>

        <!-- Sticky components -->
        <RoomStatus />
        <AudioPlayer />
      </div>
    </OverlayScrollbarsComponent>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import {
  DEFAULT_NAMESPACE,
  DEFAULT_THEME,
  DEFAULT_DOCUMENT_TITLE,
} from "@/constants";
import themes from "@/theme/themes";
import { useThemeStore } from "@/stores/theme";
import { useRoomStore } from "@/stores/room";
import { onBeforeMount, watch } from "vue";
import type { Nullish } from "@/utilities/types";
import NotificationRegister from "@/registers/NotificationRegister.vue";
import ThemeProvider from "@/components/wrappers/ThemeProvider.vue";
import RoomStatus from "@/components/sticky/RoomStatus.vue";
import AudioPlayer from "@/components/sticky/AudioPlayer.vue";

// TODO: put in?
// // No type declarations for these
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { CSSPlugin, AttrPlugin } = require("gsap/all");

const themeStore = useThemeStore();
const roomStore = useRoomStore();

const instantiateThemes = () => {
  // Add all the themes
  Object.values(themes).forEach((themeData) => {
    themeStore.addTheme(themeData.name, themeData.theme, true);
  });
};

const instantiateNamespaces = () => {
  // Add default namespace
  themeStore.addNamespace(DEFAULT_NAMESPACE, DEFAULT_THEME, true);
};

onBeforeMount(() => {
  instantiateThemes();
  instantiateNamespaces();
});

const route = useRoute();

const updateTitle = (title: string | Nullish) => {
  const isConnected = roomStore.isConnected;
  const roomName = roomStore.roomName;

  // Ignore given title if connected to a room
  if (isConnected) {
    document.title = `synTH | Room ${roomName}`;
  } else {
    document.title = title || DEFAULT_DOCUMENT_TITLE;
  }
};

// TODO: check if this actually works
watch(
  () => route.meta.title,
  (nextRouteName) => {
    updateTitle(nextRouteName as string);
  }
);
</script>

<style lang="scss">
#App {
  height: 100%;
  width: 100%;

  & #App__overlay-container {
    height: 100%;

    position: relative;

    display: flex;
    flex-direction: column;

    $cutoff-point: 60%;
    background: color-link("App", "background_gradient", "start");
    background: linear-gradient(
      color-link("App", "background_gradient", "start") 0%,
      color-link("App", "background_gradient", "start") $cutoff-point,
      color-link("App", "background_gradient", "end")
    );

    & #App__container {
      position: relative;

      height: 100vh;

      display: flex;
      flex-direction: column;
    }
  }
}

// Transition effects
@include transition-effect(fade, 0.3s);
</style>
