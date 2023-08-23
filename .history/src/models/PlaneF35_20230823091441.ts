import type { IPlane } from "@/interface/PlaneInterface";

export class PlaneF35 implements IPlane {
    name = "F35";
    persons = 2;
    weight = 31.8;
    length = 15.67;
    span = 10.7;
    height = 4.33;
    fly(): void {
        console.log(`${this.name} is flying`);
    }
}
