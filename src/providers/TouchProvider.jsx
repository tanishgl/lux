import { createContext, useContext, useEffect, useState } from "react";
import useMatrixProvider from "./MatrixProvider";

const TouchContext = createContext();

export function TouchProvider({ children }) {
  const [touchBegin, setTouchBegin] = useState({});
  const [touchEnd, setTouchEnd] = useState({});
  const { handlePressDown, handlePressLeft, handlePressRight, handlePressUp } =
    useMatrixProvider();

  useEffect(
    function () {
      const dX = Math.abs(touchEnd.x - touchBegin.x);
      const dY = Math.abs(touchEnd.y - touchBegin.y);
      if (dX > dY) {
        touchBegin.x > touchEnd.x ? handlePressLeft() : handlePressRight();
      } else {
        touchBegin.y > touchEnd.y ? handlePressUp() : handlePressDown();
      }
    },
    [touchEnd]
  );

  function handleTouchStart(e) {
    console.log("touch start");
    setTouchBegin({
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    });
  }

  function handleTouchEnd(e) {
    console.log("touch end");
    setTouchEnd({
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    });
  }

  return (
    <TouchContext.Provider value={{ handleTouchStart, handleTouchEnd }}>
      {children}
    </TouchContext.Provider>
  );
}

export default function useTouchProvider() {
  const touch = useContext(TouchContext);
  if (touch == undefined) return;
  return touch;
}
