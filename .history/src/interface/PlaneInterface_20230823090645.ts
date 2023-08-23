export interface IPlane {
    name: string;
    power: number;
    elevatingForce: number; // 升力
    sideForce: number; // 侧力
    resistance: number; // 阻力
    run(): void;
    fly(): void;
}