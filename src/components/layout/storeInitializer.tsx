"use client";
import { storeInit } from "@/libs/apis/axiosClinet";
import { useAppStore } from "@/libs/store/useAppStore";
import React from "react";

function StoreInitializer() {
  const store = useAppStore((state) => state);
  storeInit(store);
  return null;
}

export default StoreInitializer;
