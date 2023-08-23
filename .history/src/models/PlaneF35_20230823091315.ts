import type { IPlane } from "@/interface/PlaneInterface";

export class PlaneF35 implements IPlane {
    name = "F35";
    persons = 2;
    weight = 31.8;
    
    fly(): void {
        console.log(`${this.name} is flying`);
    }
}
