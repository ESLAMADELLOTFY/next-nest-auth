"use client";

import { useState } from "react";

export function usePasswordVisibility(initial = false) {
  const [visible, setVisible] = useState(initial);

  function toggle() {
    setVisible((prev) => !prev);
  }

  return { visible, toggle, type: visible ? "text" : "password" } as const;
}
