import type { IPlane } from "@/interface/PlaneInterface";

export class PlaneF35 implements IPlane {
    name = "F35";
    persons = 2;
    weight = 31.8;
    length = 15.67;
    span = 10.7;
    height = 4.33;
    sixForce = {
        elevating: 0, // 升力
        side: 0, // 侧力
        resistance: 0, // 阻力
        rollingMoment: 0, // 滚转力矩
        yawMoment: 0, // 偏航力矩
        pitchingMoment: 0, // 俯仰力矩
    };
    run(): void {
        console.log(`${this.name} is running`)
    }
    fly(): void {
        console.log(`${this.name} is flying`);
    }
}
