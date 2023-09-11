import { DynamicValue } from "mendix";
import Big from "big.js";
import { useMemo } from "react";
import {
    getDynamicValue,
    getDynamicValueBig,
    getDynamicValueBoolean,
    getDynamicValueBooleanWithLoading,
    getDynamicValueString,
    getDynamicValueWithLoading
} from "../data";

export const useDynamicValue = <T>(value?: DynamicValue<T>): T | null => {
    return useMemo(() => getDynamicValue(null, value), [value]);
};

export const useDynamicValueWithLoading = <T>(value?: DynamicValue<T>): [boolean, T | null] => {
    return useMemo(() => getDynamicValueWithLoading(null, value), []);
};

export const useDynamicValueBoolean = (value?: DynamicValue<boolean>): boolean | null => {
    return useMemo(() => getDynamicValueBoolean(value), [value]);
};

export const useDynamicValueBooleanWithLoading = (value?: DynamicValue<boolean>): [boolean, boolean | null] => {
    return useMemo(() => getDynamicValueBooleanWithLoading(value), []);
};

export const useDynamicValueString = (value?: DynamicValue<string>): string | null => {
    return useMemo(() => getDynamicValueString(value), [value]);
};

export const useDynamicValueBig = (value?: DynamicValue<Big>): number | null => {
    return useMemo(() => getDynamicValueBig(value), [value]);
};
