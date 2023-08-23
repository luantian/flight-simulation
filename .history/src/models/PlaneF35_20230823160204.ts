import type { IPlane } from "@/interface/PlaneInterface";
import type { ISixForceInterface } from "@/interface/SixForceInterface";

export class PlaneF35 implements IPlane {
    name = "F35"; // 名称
    persons = 2; // 人数
    weight = 31.8 * 1000; // 重量 kg
    length = 15.67; // 长度
    span = 10.7; // 翼展
    height = 4.33; // 高度
    sixForce = {
        elevating: 0, // 升力
        side: 0, // 侧力
        resistance: 0, // 阻力
        rollingMoment: 0, // 滚转力矩
        yawMoment: 0, // 偏航力矩
        pitchingMoment: 0, // 俯仰力矩
    };
    run(sixForce: ISixForceInterface): void {
        console.log(`${this.name} is running`);
    }
}
