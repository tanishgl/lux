import { useEffect } from "react";

function useKey(type, { onUp, onDown, onLeft, onRight }) {
  useEffect(
    function () {
      function controller(e) {
        switch (e.code) {
          case "ArrowDown":
            return onDown();
          case "ArrowRight":
            return onRight();
          case "ArrowLeft":
            return onLeft();
          case "ArrowUp":
            return onUp();
          default:
            return;
        }
      }
      document.addEventListener("keydown", controller);
      return function () {
        document.removeEventListener("keydown", controller);
      };
    },
    [type, onDown, onLeft, onRight, onUp]
  );
}

export { useKey };
