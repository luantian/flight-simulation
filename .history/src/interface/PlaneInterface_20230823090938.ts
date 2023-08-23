export interface IPlane {
    name: string;
    weight: number; // 重量
    length: number; // 长度
    elevatingForce: number; // 升力
    sideForce: number; // 侧力
    resistance: number; // 阻力
    rollingMoment: number; // 滚转力矩
    yawMoment: number; // 偏航力矩
    pitchingMoment: number; // 俯仰力矩
    run(): void;
    fly(): void;
}