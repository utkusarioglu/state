import { State } from "./state";

test("get_set_State", () => {

    const channel = "randomchannel";
    const variable = "random.variable";
    const value = "random value";

    const state = new State(channel);
    state.set_Var(variable, value);
    const response = state.get_Var(variable);
    expect(response).toBe(value);

});


test("get_set_States", () => {

    const channel = "randomchannel";
    const variables = {
        var1: "val1",
        var2: "val2",
    };

    const state = new State(channel);
    state.set_Vars(variables);
    const response = state.get_Vars();
    expect(response).toStrictEqual(variables);

});


test("has_Var", () => {

    const channel = "randomchannel";
    const variable = "random.variable";
    const value = "random value";

    const state = new State(channel);
    state.set_Var(variable, value);

    const response = state.has_Var(variable);
    expect(response).toStrictEqual(true);

    const response2 = state.has_Var("fsds");
    expect(response2).toStrictEqual(false)

});


test("get_AllStates", () => {

    State.remove_AllStates();

    const channel1 = "channel=1";
    const channel2 = "channel=2";

    const variable = "random.variable";
    const value = "random value";

    const state_1 = new State(channel1);
    const state_2 = new State(channel2);
    const state_3 = new State(channel1); // shares the same channel with 1

    state_1.set_Var(variable, value);
    state_2.set_Var(variable, value);
    state_3.set_Var(variable, value);

    const response = State.get_AllStates();

    expect(response).toStrictEqual({
        [state_1.get_Channel()]: {
            [state_1.get_Id()]: {
                random: {
                    variable: value
                }
            },
            [state_3.get_Id()]: {
                random: {
                    variable: value
                }
            }
        },
        [state_2.get_Channel()]: {
            random: {
                variable: value
            }
        }
    });

});

