import { renderHook } from "@testing-library/react";
import { useCart } from "@/app/hooks/useCart";

export const renderUseCart = () => renderHook(() => useCart());
