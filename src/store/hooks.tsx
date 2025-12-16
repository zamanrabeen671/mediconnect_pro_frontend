import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { RootState, AppDispatch } from "./index.tsx";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
