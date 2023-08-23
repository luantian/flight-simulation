import type IFly from "@/interface/FlyInterface";

export class FlyF35 implements IFly {
    name = "F35";
    fly(): void {
        console.log(`${this.name} is flying`);
    }
}
