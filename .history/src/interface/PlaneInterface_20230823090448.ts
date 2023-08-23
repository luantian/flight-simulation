export interface IPlane {
    name: string;
    power: number;
    sideForce: number; // 侧力
    elevatingForce: number; // 升力
    
    fly(): void;
}