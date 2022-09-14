import { ActionValue } from "mendix";

export type ExecuteActionOptions = {
    force?: boolean;
    debug?: boolean;
};

/**
 * @name executeAction
 * @category Actions
 * @param action action to execute
 * @param param1 Options for executing an action
 * @returns boolean true if the action was executed, false otherwise
 *
 * This function can always be executed, even when the action is not defined
 *
 * The options have two properties:
 * - force: (default true) true if the action should be executed regardless
 * - debug: (default false) true if the action should show up in the log
 *
 */
export const executeAction = (
    action?: ActionValue,
    { force, debug }: ExecuteActionOptions = { force: true, debug: false }
): boolean => {
    if (debug) {
        console.log("executeAction", action);
    }
    if (action && (force || action.canExecute) && !action.isExecuting) {
        action.execute();
        return true;
    }
    return false;
};
