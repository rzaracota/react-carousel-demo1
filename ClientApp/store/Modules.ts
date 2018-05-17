import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface ModuleState {
    isLoading: boolean;
    id: number;
    modules: Module[];
}

export interface Module {
    id: number;
    title: string;
    content: string;
}

interface RequestModulesAction {
    type: 'REQUEST_MODULES';
    id: number;
}

interface ReceiveModulesAction {
    type: 'RECEIVE_MODULES';
    id: number;
    modules: Module[];
}

type KnownAction = RequestModulesAction | ReceiveModulesAction;

export const actionCreators = {
    requestModules: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('localhost:5984/test1/5426455b4bf6255203462919040008d7')
            .then(data => {
                dispatch({ type: 'RECEIVE_MODULES', id: id, modules: data });
            });

            addTask(fetchTask);
            dispatch({ type: 'REQUEST_MODULES', id: id});
    }
};

const unloadedState: ModuleState = { modules: [], isLoading: false, id: -1 };

export const reducer: Reducer<ModuleState> = (state: ModuleState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'REQUEST_MODULES':
            return {
                id: action.id,
                isLoading: true
            };
        case 'RECEIVE_MODULES':
            return {
                id: action.id,
                isLoading: false,
                modules: action.modules
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
