export interface IPlane {
    name: string;
    weight: string; // 重量
    elevatingForce: number; // 升力
    sideForce: number; // 侧力
    resistance: number; // 阻力
    rollingMoment: number; // 滚转力矩
    yawMoment: number; // 偏航力矩
    pitchingMoment: number; // 俯仰力矩
    run(): void;
    fly(): void;
}