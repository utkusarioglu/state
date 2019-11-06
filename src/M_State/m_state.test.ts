
import { M_State } from "./m_state";

test("get_set_State", () => {

    const class_expression = class extends M_State {
        constructor() {
            super();
            this.initialize_State({
                prop: "value"
            });
        }
        get_Prop(): any {
            return "value"
            //return this.get_State().get_Var("prop");
        }
        random_Method(): string {
            return "works";
        }
    }

    const class_instance = new class_expression();

    const method_return = class_instance.random_Method();

    expect(method_return).toBe("works");

    //const state_return = class_instance.get_Prop();

    //expect(state_return).toBe("value")

});