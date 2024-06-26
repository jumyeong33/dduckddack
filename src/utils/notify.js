import { Notify } from "quasar";

const alretMapping = {
  install: {
    message: "Please Install Metamask extention for continue..",
    position: "top",
    actions: [
      {
        label: "Install",
        color: "white",
        handler: () => {
          window.location.href = "https://metamask.io/download/";
        },
      },
    ],
  },

  error: { message: "Something went wrong.. Try again!", position: "center" },

  success: {
    message: "CREATEAD!",
    position: "center",
    icon: "img:dddd.png",
  },

  loading: { message: "LOADING..", position: "center" },

  rejectSign: {
    message: "Please connect again",
    caption: "Rejected Sign to DDUCKDDACK..",
    position: "top-right",
    color: "yellow",
  },

  rejectSwitchChain: {
    message: "Please switch network",
    caption: "We Only support Polygon Chain Currently..",
    position: "top-right",
    color: "primary",
    icon: "announcement",
    actions: [{ icon: "close", round: true, color: "black" }],
  },

  connectionError: {
    message: "Please connect wallet first",
    caption: "Rejected request..",
    position: "center",
    color: "red",
    icon: "announcement",
  },

  wallpaperNotFound: {
    message: "Please click random button before creating",
    caption: "Wallpaper does not ready to create",
    position: "center",
    color: "yellow",
    icon: "announcement",
  },
  duplicateUniqueKey: {
    message: "Please select other wallpaper..",
    caption: "The wallpaper is already taken",
    position: "center",
    color: "yellow",
    icon: "announcement",
  },
  wallpaperNotSet: {
    message: "Please check wallpaper appearance before creating",
    caption: "Wallpaper does not ready to create",
    position: "center",
    color: "yellow",
    icon: "announcement",
  },
};
export default function showNotify(state) {
  const options = alretMapping[state];
  if (!options)
    return Notify.create({
      color: "primary",
      textColor: "black",
      ...alretMapping["error"],
    });
  Notify.create({
    color: "primary",
    textColor: "black",
    ...options,
    classes: state === "success" ? ["success-font"] : [],
  });
}
