import Big from "big.js";
import { DynamicValue, ValueStatus } from "mendix";

/**
 * Abstract function for getting a DynamicValue
 *
 * Note: This function does not work for boolean values!
 *
 * @name getDynamicValue
 * @category Data
 * @param notAvailableValue The value that will be returned if the DynamicValue is not available
 * @param value The value of the DynamicValue to be returned if available
 * @returns **notAvailableValue** or **value**
 */
export const getDynamicValue = <T, V>(notAvailableValue: T, value?: DynamicValue<V>): T | V => {
    if (value && value.status === ValueStatus.Available && value.value) {
        return value.value;
    }
    return notAvailableValue;
};

/**
 * Because getDynamicValue does not work for boolean values, this function is created
 *
 * @name getDynamicValueBoolean
 * @category Data
 * @param value DynamicValue of a boolean type
 * @returns The boolean value or null if not available
 */
export const getDynamicValueBoolean = (value?: DynamicValue<boolean>): boolean | null => {
    if (value && value.status === ValueStatus.Available && typeof value.value === "boolean") {
        return value.value;
    }
    return null;
};

/**
 *
 * @name getDynamicValueString
 * @category Data
 * @param value DynamicValue of a string type
 * @returns The string value or null if not available
 */
export const getDynamicValueString = (value?: DynamicValue<string>): string | null => {
    if (value && value.status === ValueStatus.Available && typeof value.value === "string") {
        return value.value;
    }
    return null;
};

/**
 *
 * @name getDynamicValueBig
 * @category Data
 * @param value DynamicValue of a Big type
 * @returns The number value or null if not available
 */
export const getDynamicValueBig = (value?: DynamicValue<Big>): number | null => {
    if (value && value.status === ValueStatus.Available && value.value) {
        return value.value.toNumber();
    }
    return null;
};

export type DynamicValueWithLoading<T, V> = [boolean, T | V];

/**
 * Abstract function for getting a DynamicValue with loading state
 *
 * Note: This function does not work for boolean values!
 *
 * @name getDynamicValue
 * @category Data
 * @param notAvailableValue The value that will be returned if the DynamicValue is not available
 * @param value The value of the DynamicValue to be returned if available
 * @returns **notAvailableValue** or **value**
 */
export const getDynamicValueWithLoading = <T, V>(
    notAvailableValue: T,
    value?: DynamicValue<V>
): DynamicValueWithLoading<T, V> => {
    if (value && value.status === ValueStatus.Loading) {
        return [true, notAvailableValue];
    }
    if (value && value.status === ValueStatus.Available && value.value) {
        return [false, value.value];
    }
    return [false, notAvailableValue];
};

/**
 * Because getDynamicValueWithLoading does not work for boolean values, this function is created
 *
 * Note: This function does not work for boolean values!
 *
 * @name getDynamicValueBooleanWithLoading
 * @category Data
 * @param value DynamicValue of a boolean type
 * @returns The boolean value or null if not available
 * @returns **null** or **value**
 */
export const getDynamicValueBooleanWithLoading = (
    value?: DynamicValue<boolean>
): DynamicValueWithLoading<boolean, null> => {
    if (value && value.status === ValueStatus.Loading) {
        return [true, null];
    }
    if (value && value.status === ValueStatus.Available && typeof value.value === "boolean") {
        return [false, value.value];
    }
    return [false, null];
};
