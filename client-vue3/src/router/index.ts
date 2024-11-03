import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RoomView from "../views/room/RoomView.vue";
import RoomJoinView from "../views/room/RoomJoinView.vue";
import RoomCreateView from "../views/room/RoomCreateView.vue";
import PageNotFoundView from "../views/PageNotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "synTH | Extend Your Sound",
      },
    },
    {
      path: "/room",
      name: "room",
      component: RoomView,
      meta: {
        title: "synTH | Room",
      },
    },
    {
      path: "/room/join/:id",
      name: "room-join",
      component: RoomJoinView,
      meta: {
        title: "synTH | Joining Room",
      },
    },
    {
      path: "/room/create/:id",
      name: "room-create",
      component: RoomCreateView,
      meta: {
        title: "synTH | Creating Room",
      },
    },
    // TODO: fix this
    // {
    //   path: "*",
    //   name: "404",
    //   component: PageNotFoundView,
    //   meta: {
    //     title: "synTH | Page Not Found",
    //   },
    // },
  ],
});

export default router;
