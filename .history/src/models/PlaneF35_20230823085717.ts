import type { IPlane } from "@/interface/PlaneInterface";

export class PlaneF35 implements IPlane {
    name = "F35";
    fly(): void {
        console.log(`${this.name} is flying`);
    }
}
