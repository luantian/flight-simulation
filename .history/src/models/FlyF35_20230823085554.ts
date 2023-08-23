import type IPlane from "@/interface/FlyInterface";

export class PlaneF35 implements IPlane {
    name = "F35";
    fly(): void {
        console.log(`${this.name} is flying`);
    }
}
