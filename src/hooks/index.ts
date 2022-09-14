import { DynamicValue, ValueStatus } from "mendix";
import { useMemo } from "react";
import { getDynamicValue } from "../data";

/**
 * Use dynamic value hook
 *
 * @name useDynamicValue
 * @category Hooks
 * @param value DynamicValue
 * @returns [isAvaliable, DynamicValue.value]
 */
export const useDynamicValue = <T>(value?: DynamicValue<T>): [boolean, T | null] => {
    const isAvailable = useMemo(() => (value ? value.status === ValueStatus.Available : true), [value]);
    const dynamicValue = useMemo(() => getDynamicValue(null, value), []);

    return [isAvailable, dynamicValue];
};
