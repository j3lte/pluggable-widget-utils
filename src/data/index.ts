import Big from "big.js";
import { EditableValue, DynamicValue, ValueStatus } from "mendix";

/**
 * Abstract function for getting a DynamicValue
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
 *
 * @bane getDynamicValueString
 * @category Data
 * @param value DynamicValue of a string type
 * @returns The string value or null if not available
 */
export const getDynamicValueString = (value?: EditableValue<string>): string | null => {
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
        return parseInt(value.value.toFixed(0), 10);
    }
    return null;
};
